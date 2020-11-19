import React from "react"
import Parser from "html-react-parser"
import styled from "styled-components"

import * as theme from "theme"

function updateLinksInHTML(html) {
  let newHTML = html,
    url = ``

  const key = `P&gmIv9]]zNSihq`

  // Perform ring swap
  url = new RegExp(`${process.env.GATSBY_WP}/wp-content/`, "gi")
  newHTML = newHTML.replace(url, key)

  // Links
  url = new RegExp(`${process.env.GATSBY_WP}`, "gi")
  newHTML = newHTML.replace(url, "")

  url = new RegExp(`${key}`, "gi")
  newHTML = newHTML.replace(url, `${process.env.GATSBY_WP}/wp-content/`)

  return newHTML
}

const Textarea = props => {
  const { content, ...rest } = props

  if (typeof content === "string" || content instanceof String) {
    let contentString = content
      .toString()
      .trim()
      // remove default html tags
      .replace("<html>", "")
      .replace("</html>", "")
      .replace("<head>", "")
      .replace("</head>", "")
      .replace("<body>", "")
      .replace("</body>", "")
      // remove line breaks to fix table errors
      .replace(/(\r\n|\n|\r)/gm, "")
      // wrap table into div to make it responsive
      .replace(/<table/g, "<div class='table-wrapper'><table")
      .replace(/\/table>/g, "/table></div>")
      // wrap iframe into div to make it responsive
      .replace(/<iframe/g, "<div class='iframe-wrapper'><iframe")
      .replace(/\/iframe>/g, "/iframe></div>")

    contentString = updateLinksInHTML(contentString)

    return <Container {...rest}>{Parser(contentString)}</Container>
  } else {
    return null
  }
}

const h1 = { ...theme.mui.typography.h1 }
const h2 = { ...theme.mui.typography.h2 }
const h3 = { ...theme.mui.typography.h3 }
const h4 = { ...theme.mui.typography.h4 }
const h5 = { ...theme.mui.typography.h5 }
const h6 = { ...theme.mui.typography.h6 }
const p = { ...theme.mui.typography.body1 }
const gutterBottom = { ...theme.mui.overrides.MuiTypography.gutterBottom }

const Container = styled.div`
  && {
    clear: both;

    &:after {
      content: "";
      display: block;
      clear: both;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      ${gutterBottom}

      &:first-child {
        margin-top: 0;
      }

      &:not(:first-child) {
        margin-top: 3rem;
      }
    }

    h1 {
      ${h1}
    }
    h2 {
      ${h2}
    }
    h3 {
      ${h3}
    }
    h4 {
      ${h4}
    }
    h5 {
      ${h5}
    }
    h6 {
      ${h6}
    }

    p,
    ol,
    ul,
    li,
    figcaption,
    div {
      ${p}
      ${gutterBottom}
    }

    p {
      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    a {
      text-decoration: underline;
      font-style: italic;
      font-weight: 500;
      color: ${theme.colors.secondary};
    }

    figcaption {
      font-size: 12px;
      line-height: 16px;
      text-transform: uppercase;
    }

    ul,
    ol {
      margin-left: 20px;
      padding-left: 0;
    }

    ul li {
      list-style: disc;
    }

    img {
      margin-bottom: 20px;
      max-width: 100%;
      height: auto;

      &.alignright {
        float: right;
        margin-left: 20px !important;
      }

      &.alignleft {
        float: left;
        margin-right: 20px !important;
      }

      &.size-medium {
        width: 300px;
      }

      &.size-thumbnail {
        width: 150px;
      }

      &.size-full {
      }

      &.fullwidth {
        width: 100%;
      }

      @media (max-width: 420px) {
        width: 100% !important;
      }
    }

    .table-wrapper {
      max-width: 100%;
      flex: 1;
      overflow-x: auto;
    }

    table {
      ${p}
      border-collapse: separate;
      border-spacing: 2px;
      margin-left: 0;
      margin-right: 0;
      margin-top: 1.6rem;
      padding-bottom: 0;
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
      margin-bottom: 1.6rem;
      font-size: 1rem;
      line-height: 1.6rem;
      border-collapse: collapse;
      width: 100%;
      background: ${theme.colors.lightgrey};
    }

    td {
      display: table-cell;
      vertical-align: inherit;
    }

    tr {
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }

    td,
    th {
      text-align: left;
      border: 1px solid #e0e0e0;
      font-feature-settings: "tnum";
      -moz-font-feature-settings: "tnum";
      -ms-font-feature-settings: "tnum";
      -webkit-font-feature-settings: "tnum";
      padding-left: 1.06667rem;
      padding-right: 1.06667rem;
      padding-top: 0.8rem;
      padding-bottom: calc(0.8rem - 1px);
    }

    th:first-child,
    td:first-child {
      padding-left: 0.8rem;
    }

    .iframe-wrapper {
      overflow: hidden;
      padding-top: 56.25%;
      position: relative;
    }

    .iframe-wrapper iframe {
      border: 0;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }
`

export default Textarea
