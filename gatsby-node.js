const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    // Define a template for blog post
    const blogPost = path.resolve(`./src/templates/blog-post.js`)

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

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//   console.log(node.internal.type)

//     const value = createFilePath({ node, getNode })

//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

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
