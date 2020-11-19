import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Typography } from "@material-ui/core"

import * as theme from "theme"

const FourOhFor = () => {
  return (
    <Container>
      <ErrorMessage>
        <Typography variant="h1" gutterBottom color="inherit">
          404
        </Typography>
      </ErrorMessage>
      <Typography variant="body1" gutterBottom>
        Oops, we can't find the page you're looking for.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Return <Link to="/">home</Link>.
      </Typography>
    </Container>
  )
}

export default FourOhFor

const Container = styled.div`
  a {
    color: inherit;
    &:hover {
      color: ${theme.colors.primary};
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5vw;
`
const ErrorMessage = styled.div`
  color: ${theme.colors.primary};
  opacity: 0.8;
`
