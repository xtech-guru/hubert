import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import { Layout, Posts } from "../components"

import icon_arrow_blue from "../images/icon_arrow_blue.svg"
import icon_arrow_brown from "../images/icon_arrow_brown.svg"

const IndexPage = ({ data }) => {
  const articles = [...data.allContentfulArticle.nodes]
  const featuredArticle = articles[0]
  return (
    <Layout seo="Home">
      <PostsWrapper
        mainArticleUrl={
          featuredArticle.featuredImage?.gatsbyImageData.images.fallback.src
        }
      >
        <article>
          <div>
            <div>
              <Link
                to={`/categories/${featuredArticle.category.slug}`}
                aria-label="Category"
              >
                {featuredArticle.category.title}
              </Link>
            </div>
            <div>
              <Link to={`/articles/${featuredArticle.slug}`} aria-label="Link">
                {featuredArticle.title}
              </Link>
            </div>
            <p>{featuredArticle.introduction}</p>
            <Link to={`/articles/${featuredArticle.slug}`} aria-label="Home">
              <img src={icon_arrow_blue} alt="article-details" />
              <img src={icon_arrow_brown} alt="article-details" />
            </Link>
          </div>
        </article>
        <Posts data={articles} />
      </PostsWrapper>
    </Layout>
  )
}

const PostsWrapper = styled.div`
  @media (min-width: 992px) {
    margin-top: 1.3125rem;
    padding: 0 14px;
  }

  > article:first-child {
    background-image: url("${props => props.mainArticleUrl}");
    padding-top: 30px;
    display: block;
    background-color: #f4efea;
    margin-bottom: 3.75rem;
    background-repeat: repeat-x;
    background-position: top;
    text-align: center;

    @media (min-width: 768px) {
      background-size: cover;
    }

    > div {
      padding: 0 15px;

      > div:first-child {
        @media (min-width: 768px) {
          margin-bottom: 1.875rem;
        }

        position: relative;
        display: inline-block;
        bottom: auto;
        background-color: #f86968;
        padding: 5px 17px;
        color: #fff;

        a {
          font-weight: 700;
          font-size: 0.875rem;
          color: #fff;
          touch-action: manipulation;
          background-color: transparent;
        }
      }

      > div:nth-child(2) {
        margin: 0 auto;
        max-width: 700px;
        text-transform: uppercase;
        font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
          Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
        font-weight: 700;
        line-height: 1.1;
        color: inherit;

        @media (min-width: 992px) {
          font-size: 3rem;
        }

        a {
          font-size: 3rem;
          color: #fff;
          touch-action: manipulation;
          background-color: transparent;
        }
      }

      > p {
        max-width: 700px;
        margin: 20px auto;
        line-height: 1.44;

        @media (min-width: 768px) {
          margin-bottom: 90px;
          font-size: 1.125rem;
          color: #fff;
        }
      }

      > a {
        color: #71b3e7;
        background-color: transparent;
        touch-action: manipulation;
        text-decoration: none;

        img {
          width: 36px;
          padding-bottom: 30px;

          &:first-child {
            border-style: none;
            vertical-align: middle;

            @media (min-width: 768px) {
              display: none !important;
            }
          }

          &:last-child {
            @media (max-width: 767px) {
              display: none !important;
            }
          }
        }
      }
    }
  }
`

export const query = graphql`
  query {
    allContentfulArticle(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        title
        introduction
        slug
        featuredImage {
          gatsbyImageData
          title
        }
        category {
          title
          slug
        }
      }
    }
  }
`

export default IndexPage
