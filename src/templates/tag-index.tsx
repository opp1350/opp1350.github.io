import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import Tags from '../components/Tags'
import { Link } from 'gatsby'

const TagIndexTemplate = ({ location }) => {
    return (
        <Layout location={location} title="Tags">
            <Seo title="Tags" />

            <header>
                <h1>태그 목록</h1>
            </header>
            <Tags showAllPostLink={true} />
        </Layout>
    )
}

export default TagIndexTemplate
