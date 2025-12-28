export type Post = {
    node: {
        id?: string | null
        title?: string | null
        slug: string
        description?: string | null
        date?: string | null
        tags?: (string | null)[] | null
        blogContent?: {
            childMarkdownRemark?: {
                excerpt?: string | null
            } | null
        } | null
    }
}