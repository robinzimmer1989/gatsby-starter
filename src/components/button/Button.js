import React from "react"
import { Link } from "gatsby"
import styled, { css } from "styled-components"
import Parser from "html-react-parser"
import { Button as MuiButton, CircularProgress } from "@material-ui/core"

export default ({ children, to, loading, disabled, ...rest }) => {
  // Fixes bug where front page url ('/') is returning WP url
  const fixedUrl = to && to.replace(process.env.GATSBY_WP, "")

  const element = (
    <Button {...rest} disabled={disabled} loading={loading ? 1 : 0}>
      <CircularProgress className="btn-loader" size={25} />
      <span className="btn-children">{Parser(children)}</span>
    </Button>
  )

  if (to) {
    if (disabled) {
      return element
    } else if (fixedUrl.includes("http")) {
      return (
        <a href={fixedUrl} target="_blank" rel="noreferrer">
          {element}
        </a>
      )
    } else if (fixedUrl.includes("tel:") || fixedUrl.includes("mailto:")) {
      return <a href={fixedUrl}>{element}</a>
    } else {
      return <Link to={fixedUrl}>{element}</Link>
    }
  } else {
    return element
  }
}

const Button = styled(MuiButton)`
  && {
    position: relative;

    .btn-loader {
      position: absolute;
      opacity: 0;
      z-index: 1;
      pointer-events: none;
      left: calc(50% - 12.5px);
    }

    ${({ loading }) =>
      loading &&
      css`
        .btn-children {
          opacity: 0;
        }
        .btn-loader {
          opacity: 1;
        }
      `}
  }
`
