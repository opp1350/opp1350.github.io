/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const Bio = () => {
    const data = useStaticQuery(graphql`
        query BioQuery {
            site {
                siteMetadata {
                    author {
                        name
                        summary
                    }
                    social {
                        twitter
                        resume
                    }
                }
            }
        }
    `)

    // Set these values by editing "siteMetadata" in gatsby-config.js
    const author = data.site.siteMetadata?.author
    const social = data.site.siteMetadata?.social

    return (
        <div className="bio">
            {/* <StaticImage
                className="bio-avatar"
                layout="fixed"
                formats={['auto', 'webp', 'avif']}
                src="../images/profile-pic.jpg"
                width={50}
                height={50}
                quality={95}
                alt="Profile picture"
            /> */}
            {author?.name && (
                <p>
                    <strong>{author.name}</strong>
                    <br />{author?.summary || null}
                    {/* <a
                        href={social.resume}
                        target="_blank"
                        title="이력서 새창열림"
                        rel="noreferrer"
                    >
                        &#x1F449; Resume
                    </a> */}
                </p>
            )}
        </div>
    )
}

export default Bio
