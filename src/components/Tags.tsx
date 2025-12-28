import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

const Tags = ({ showAllPostLink = false }) => {
    const tagGroupResult = useStaticQuery(graphql`
        {
            allContentfulVtMorgonBlog {
                group(field: { tags: SELECT }) {
                    fieldValue
                    totalCount
                }
            }
        }
    `)

    const tags = tagGroupResult.allContentfulVtMorgonBlog.group

    const tagToPathSegment = (tag: string) =>
        String(tag).trim().normalize('NFC').replace(/\//g, '-')

    if (tags.length === 0) {
        return null
    }

    return (
        <ul className="tags">
            {showAllPostLink && (
                <li>
                    <Link to="/">ALL</Link>
                </li>
            )}
            {tags.map((tag) => (
                <li key={tag.fieldValue}>
                    <Link to={`/tags/${tagToPathSegment(tag.fieldValue)}/`}>
                        {tag.fieldValue} ({tag.totalCount})
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Tags
