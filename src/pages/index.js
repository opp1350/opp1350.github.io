import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const posts = data.allContentfulVtMorgonBlog.edges
  const siteTitle = data.site.siteMetadata?.title || `Title`

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>작성된 포스트가 없습니다.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <hr />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post, index) => {
          const title = post.node.title || `Title`

          return (
            <li key={index}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  {post.node.tags && post.node.tags !== null ? (
                    <ol className="categories">
                      {post.node.tags.map((tag, index) => {
                        return (
                          <li className="categories-item" key={index}>
                            {tag}
                          </li>
                        )
                      })}
                    </ol>
                  ) : null}
                  <h2>
                    <Link to={post.node.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.node.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.node.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulVtMorgonBlog {
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
`
