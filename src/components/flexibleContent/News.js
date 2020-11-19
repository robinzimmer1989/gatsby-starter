import React, { useState } from "react"
import styled from "styled-components"
import { Grid } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"

// import app components
import { Edges, Spacer, Button } from "components"
import Post from "components/post"

import * as theme from "theme"

const News = () => {
  const { nodes: posts } = usePostQuery()

  const [category, setCategory] = useState(`all`)

  const availableCategories = []

  posts.map(o => {
    return (
      o?.categories?.nodes &&
      o.categories.nodes.map(p => {
        if (!availableCategories.includes(p.name)) {
          return availableCategories.push(p.name)
        } else {
          return null
        }
      })
    )
  })

  const visiblePosts =
    category === `all`
      ? posts
      : posts.filter(
          o =>
            o?.categories?.nodes &&
            o.categories.nodes.find(p => p.name === category)
        )

  const handleChangeCategory = s => setCategory(s)

  return (
    <Spacer pt={{ xs: 40 }} pb={{ xs: 40 }}>
      <Edges size="md">
        <Filter>
          <StyledButton
            onClick={() => handleChangeCategory(`all`)}
            children={`all`}
            variant={category === `all` ? `contained` : `outlined`}
            color="primary"
            small
          />

          {availableCategories.map(s => (
            <StyledButton
              key={s}
              onClick={() => handleChangeCategory(s)}
              children={s}
              variant={category === s ? `contained` : `outlined`}
              color="primary"
              small
            />
          ))}
        </Filter>

        <Grid container justify="space-between">
          {visiblePosts &&
            visiblePosts.map(o => {
              return (
                <StyledPost
                  key={o.id}
                  image={o.acf.image}
                  headline={o.title}
                  url={o.uri}
                />
              )
            })}

          <StyledPost style={{ height: 0, overflow: "hidden" }} />
          <StyledPost style={{ height: 0, overflow: "hidden" }} />
        </Grid>
      </Edges>
    </Spacer>
  )
}

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media screen and (min-width: ${theme.mui.breakpoints.values.md}px) {
    justify-content: flex-start;
    margin-bottom: 40px;
  }
`

const StyledButton = styled(Button)`
  && {
    margin-right: 5px;
  }
`

const StyledPost = styled(Post)`
  width: 100%;
  margin-bottom: 40px;

  @media screen and (min-width: ${theme.mui.breakpoints.values.sm}px) {
    width: calc(50% - 20px);
  }

  @media screen and (min-width: ${theme.mui.breakpoints.values.md}px) {
    width: calc(33.3333% - 20px);
    margin-bottom: 80px;
  }
`

const usePostQuery = () => {
  const { allWpPost } = useStaticQuery(
    graphql`
      query {
        allWpPost {
          nodes {
            id
            title
            uri
            date
            categories {
              nodes {
                name
                databaseId
              }
            }
            acf {
              text
              image {
                altText
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  return allWpPost
}

export default News
