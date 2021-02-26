import React from "react"
import styled from "styled-components"

const ArticleHeader = ({ title, description }) => {
  return (
    <div>
      {title && <h1>{title}</h1>}
      {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  )
}

export const Article = ({ header, content }) => {
  return (
    <Wrapper>
      <ArticleHeader {...header} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Wrapper>
  )
}

const Wrapper = styled.article`
  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 768px) {
    width: 720px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 992px) {
    width: 960px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  box-sizing: inherit;

  & div {
    display: block;
    margin: 0 0 20px;
    color: #756b62;

    @media (min-width: 992px) {
      padding-left: 77px;
      padding-right: 233px;
    }

    @media (min-width: 768px) {
      margin-bottom: 30px;
    }

    & img {
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
      height: auto;
      vertical-align: middle;
      border-style: none;

      @media (min-width: 768px) {
        margin-bottom: 20px;
        margin-right: 30px;
        margin-left: -63px;
        float: left !important;
      }

      @media (min-width: 992px) {
        margin-left: -77px;
      }
    }
  }
`
