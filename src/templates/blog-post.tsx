import * as React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Comment from '../components/comments'

const BlogPostTemplate = ({ data, location, pageContext }) => {
    const post = data.contentfulVtMorgonBlog
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const { prev, next } = pageContext
    return (
        <Layout location={location} title={siteTitle}>
            <Seo
                title={post.title}
                description={post.description || post.excerpt}
            />
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    {post.tags && post.tags !== null ? (
                        <ol className="categories">
                            {post.tags.map((tag, index) => {
                                return (
                                    <li className="categories-item" key={index}>
                                        {tag}
                                    </li>
                                )
                            })}
                        </ol>
                    ) : null}
                    <h1 itemProp="headline">{post.title}</h1>
                    <p>{post.date}</p>
                </header>
                <section
                    dangerouslySetInnerHTML={{
                        __html: post.blogContent.childMarkdownRemark.html,
                    }}
                    itemProp="articleBody"
                />
                <hr />
                <Comment
                    repo="opp1350/vt-morgon-blog-comments"
                    theme="github-light"
                />
                <footer>
                    <Bio />
                </footer>
            </article>
            <nav className="blog-post-nav">
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
                        {prev && (
                            <Link to={prev.slug} rel="prev">
                                ← {prev.title}
                            </Link>
                        )}
                    </li>
                    <li>
                        {next && (
                            <Link to={next.slug} rel="next">
                                {next.title} →
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($id: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulVtMorgonBlog(id: { eq: $id }) {
            id
            title
            slug
            description
            date(formatString: "YYYY, MMMM DD")
            tags
            blogContent {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`
