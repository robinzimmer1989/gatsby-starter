import React, { Fragment } from "react"
import styled, { css } from "styled-components"
import Typography from "@material-ui/core/Typography"
import { Link } from "gatsby"
import Parser from "html-react-parser"

import * as theme from "theme"

export default function Breadcrumbs(props) {
  const { url } = props

  const paths = url
    .replace(/\//g, " ")
    .trim()
    .split(" ")

  return (
    <Container>
      <Typography variant="body2" component="div">
        <Wrapper>
          <StyledLink to="/" children="Home" />

          {!!paths &&
            paths.map((item, index) => {
              return (
                <Fragment key={index}>
                  <Divider children={`/`} />
                  <StyledLink
                    to={"/" + paths.slice(0, index + 1).join("/")}
                    activeItem={index === paths.length - 1}
                    children={Parser(item)}
                  />
                </Fragment>
              )
            })}
        </Wrapper>
      </Typography>
    </Container>
  )
}

const Container = styled.div`
  display: none;

  @media (min-width: 640px) {
    display: inline-block;
    overflow: hidden;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  margin: 0 0 1rem;
`

const StyledLink = styled(({ activeItem, ...rest }) => <Link {...rest} />)`
  padding: 4px 8px 0;
  color: inherit;
  text-decoration: none;
  text-transform: capitalize;

  &:hover {
    color: ${theme.colors.primary};
  }

  ${props =>
    props.activeItem &&
    css`
      color: ${theme.colors.primary};
    `}
`

const Divider = styled(Typography)`
  && {
    font-weight: bold;
    color: #afafaf;
  }
`
