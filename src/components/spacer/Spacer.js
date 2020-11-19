import React from "react"
import styled from "styled-components"

import * as theme from "theme"

export default function Spacer(props) {
  return <StyledSpacer {...props}>{props.children}</StyledSpacer>
}

// translate shortcode to css value
const supportedProps = [
  { pt: "padding-top" },
  { pr: "padding-right" },
  { pb: "padding-bottom" },
  { pl: "padding-left" },
  { p: "padding" },
  { mt: "margin-top" },
  { mr: "margin-right" },
  { mb: "margin-bottom" },
  { ml: "margin-left" },
  { m: "margin" }
]

const StyledSpacer = styled.div`
  max-width: 100%;

  ${(props) => {
    const css = supportedProps
      .map((prop) => {
        const key = Object.keys(prop)

        let value = props[key]

        // render nothing if no value is supplied
        if (!value) {
          return null
        }

        // if single value is supplied then wrap into object with lowest breakpoint
        if (typeof value == "number") {
          value = { xs: value }
        }

        // get css attribute
        const cssAttr = prop[key[0]]

        return `${createBreakpointStyles(value, cssAttr)}`
      })
      .join("")
      .replace(/,/g, "")

    return css
  }}
`

export function createBreakpointStyles(value, cssAttr) {
  return Object.keys(value).map((key) => {
    return `@media screen and (min-width: ${theme.mui.breakpoints.values[key]}px){
      ${cssAttr}: ${value[key]}px;
    }`
  })
}
