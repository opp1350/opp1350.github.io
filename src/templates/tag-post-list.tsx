import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'
import PostListView from '../components/PostListView'
import { Post } from '../types/post'

const TagPostListTemplate = ({ data, location, pageContext }) => {
    const siteTitle = data.site.siteMetadata?.title || `Title`
    const posts = data.allContentfulVtMorgonBlog.edges as Post[]
    const tag = pageContext.tag as string

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title={`#${tag}`} />
            <Bio />
            <hr />

            <header>
                <h1>#{tag}</h1>
                <Link to="/">전체 글 보기</Link>
            </header>

            <PostListView posts={posts} />
        </Layout>
    )
}

export default TagPostListTemplate

export const pageQuery = graphql`
    query TagPostListByTag($tag: String!) {
        site {
            siteMetadata {
                title
            }
        }
        allContentfulVtMorgonBlog(
            sort: { date: DESC }
            filter: { tags: { in: [$tag] } }
        ) {
            edges {
                node {
                    id
                    title
                    slug
                    description
                    date(formatString: "YYYY, MMMM DD")
                    tags
                    blogContent {
                        childMarkdownRemark {
                            excerpt(pruneLength: 160)
                        }
                    }
                }
            }
        }
    }
`
