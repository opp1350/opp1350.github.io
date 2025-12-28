import { Link } from 'gatsby'
import * as React from 'react'
import { Post } from '../types/post'

type PostListItemProps = {
    post: Post
    titleFallback?: string
}

const PostListItem = ({ post, titleFallback = 'Title' }: PostListItemProps) => {
    const title = post.node.title || titleFallback
    const tags = post.node.tags?.filter(Boolean) || []
    const description = post.node.description || ''

    return (
        <li>
            <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    {tags.length > 0 ? (
                        <ol className="categories">
                            {tags.map((tag) => (
                                <li
                                    className="categories-item"
                                    key={`${post.node.slug}-${tag}`}
                                >
                                    {tag}
                                </li>
                            ))}
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
                    <p itemProp="description">{description}</p>
                </section>
            </article>
        </li>
    )
}

export default PostListItem
