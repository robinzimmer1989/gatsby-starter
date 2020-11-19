import React from "react"
import Helmet from "react-helmet"
import { MuiThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import "core-js/es6/number"
import "core-js/es6/array"

// import app components
import Layout from "./Layout"
import { SEO } from "components"
import { mui, GlobalStyles } from "theme"
import { StoreProvider } from "store"

export default props => {
  const { pageContext } = props

  return (
    <StoreProvider>
      <MuiThemeProvider theme={mui}>
        <Helmet>
          <html lang="en" />
          <meta name="description" />
        </Helmet>

        <SEO {...pageContext} />

        <CssBaseline />
        <GlobalStyles />

        <Layout {...props}>{props?.children}</Layout>
      </MuiThemeProvider>
    </StoreProvider>
  )
}
