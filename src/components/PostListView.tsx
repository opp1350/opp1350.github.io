import * as React from 'react'
import PostListItem from './PostListItem'
import { Post } from '../types/post'

const PostListView = ({ posts }: { posts?: Post[] }) => {
    if (!posts?.length) {
        return <p>작성된 포스트가 없습니다.</p>
    }

    return (
        <ol style={{ listStyle: `none` }}>
            {posts.map((post, index) => (
                <PostListItem
                    key={post.node.id || post.node.slug || String(index)}
                    post={post}
                    titleFallback="Title"
                />
            ))}
        </ol>
    )
}

export default PostListView
