const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    // Define a template for blog post
    const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
    const tagPostList = path.resolve(`./src/templates/tag-post-list.tsx`)
    const tagIndex = path.resolve(`./src/templates/tag-index.tsx`)
    const tagToPathSegment = (tag) =>
        String(tag).trim().normalize('NFC').replace(/\//g, '-')

    // Get all markdown blog posts sorted by date
    const result = await graphql(`
        {
            allContentfulVtMorgonBlog(sort: { date: DESC }) {
                edges {
                    node {
                        id
                        title
                        slug
                        description
                        date
                        tags
                        blogContent {
                            childMarkdownRemark {
                                html
                            }
                        }
                    }
                }
            }
        }
    `)

    if (result.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            result.errors,
        )
        return
    }

    const posts = result.data.allContentfulVtMorgonBlog.edges

    // Create tag pages: /tags/<tag>/ and tag index: /tags/
    // Prefer GraphQL aggregation (group) if available; otherwise fall back to scanning posts.
    let sortedTags = []

    const tagGroupResult = await graphql(`
        {
            allContentfulVtMorgonBlog {
                group(field: { tags: SELECT }) {
                    fieldValue
                    totalCount
                }
            }
        }
    `)

    if (
        !tagGroupResult.errors &&
        tagGroupResult.data?.allContentfulVtMorgonBlog?.group
    ) {
        sortedTags = tagGroupResult.data.allContentfulVtMorgonBlog.group
            .filter(
                (g) =>
                    typeof g.fieldValue === 'string' &&
                    g.fieldValue.trim().length > 0,
            )
            .map((g) => ({
                tag: g.fieldValue.trim(),
                count: g.totalCount || 0,
            }))
            .sort((a, b) => a.tag.localeCompare(b.tag))
    } else {
        // Fallback: scan all posts
        const tagCounts = new Map()
        posts.forEach((edge) => {
            const tags = edge?.node?.tags || []
            tags.forEach((t) => {
                if (typeof t === 'string' && t.trim().length > 0)
                    tagCounts.set(t.trim(), (tagCounts.get(t.trim()) || 0) + 1)
            })
        })

        sortedTags = Array.from(tagCounts.entries())
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([tag, count]) => ({ tag, count }))
    }

    const sortedTagsWithPath = sortedTags.map(({ tag, count }) => ({
        tag,
        count,
        tagPath: tagToPathSegment(tag),
    }))

    // Tag index page: /tags/
    createPage({
        path: `/tags/`,
        component: tagIndex,
    })

    // Tag pages: /tags/<tag>/
    sortedTagsWithPath.forEach(({ tag, tagPath }) => {
        createPage({
            path: `/tags/${tagPath}/`,
            component: tagPostList,
            context: {
                tag,
            },
        })
    })

    // Create blog posts pages
    // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
    // `context` is available in the template as a prop and as a variable in GraphQL

    if (posts.length > 0) {
        posts.forEach((post, index) => {
            createPage({
                path: post.node.slug,
                component: blogPost,
                context: {
                    id: post.node.id,
                    prev:
                        index === posts.length - 1
                            ? null
                            : posts[index + 1].node,
                    next: index === 0 ? null : posts[index - 1].node,
                },
            })
        })
    }
}

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      tags: [String]
    }

    type Fields {
      slug: String
    }
  `)
}
