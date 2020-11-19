import React from "react"
import styled from "styled-components"
import { AppBar, Toolbar, Grid } from "@material-ui/core"

// import app components
import { Edges, FooterMenu } from "components"

export default () => {
  return (
    <Footer position="static" color="secondary">
      <Toolbar>
        <Edges size="lg">
          <Grid container justify="space-between" alignItems="center">
            <FooterMenu />
          </Grid>
        </Edges>
      </Toolbar>
    </Footer>
  )
}

const Footer = styled(AppBar)`
  padding: 20px 0;
`
