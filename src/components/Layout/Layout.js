/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { Header } from "../Header"
import { Footer } from "../Footer"
import { GlobalStyle } from "../GlobalStyle"
import { SEO } from "../SEO"
import { NewsletterPopup } from "../NewsletterPopup"

export const Layout = ({ seo, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Seo title={seo} />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main>{children}</main>
      <Footer />
      <NewsletterPopup />
    </>
  )
}

Layout.propTypes = {
  seo: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
