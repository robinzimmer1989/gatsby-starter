import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Typography, Grid } from "@material-ui/core"
import Parser from "html-react-parser"

// import app components
import { Edges, Spacer, Textarea, BackgroundImage, Post } from "components"
import * as theme from "theme"

const PostSingle = props => {
  const {
    data: {
      post: {
        id,
        title,
        acf: { image, text }
      },
      posts
    }
  } = props

  const renderPost = index => {
    const o = posts?.nodes && posts.nodes[index]

    return (
      <RelatedPost
        image={o?.acf?.image}
        headline={o?.title}
        url={o?.uri}
        backgroundColor={"#fff"}
      />
    )
  }

  let prevPost, nextPost

  const index = posts?.nodes && posts.nodes.map(o => o.id).indexOf(id)

  if (index === 0) {
    prevPost = posts.nodes.length - 1
    nextPost = index + 1
  } else if (index === posts?.nodes?.length - 1) {
    prevPost = index - 1
    nextPost = 0
  } else {
    prevPost = index - 1
    nextPost = index + 1
  }

  return (
    <>
      <Edges size="sm">
        <Spacer pt={{ xs: 40, sm: 60 }} pb={{ xs: 40, md: 100 }}>
          {image && (
            <Spacer mb={50}>
              <ImageContainer>
                <BackgroundImage image={image} />
              </ImageContainer>
            </Spacer>
          )}

          {title && (
            <Spacer mb={50}>
              <Typography
                variant="h3"
                component="h1"
                children={Parser(title)}
              />
            </Spacer>
          )}

          <StyledTextarea content={text} />
        </Spacer>
      </Edges>

      {posts?.nodes.length > 1 && (
        <RelatedPostsContainer>
          <Edges size="md">
            <Spacer pt={60} pb={{ xs: 20, sm: 60 }}>
              <Spacer mb={40}>
                <Grid container alignItems="center" justify="space-between">
                  <Spacer mb={{ xs: 30, sm: 0 }} mr={30}>
                    <Typography variant="h4" children="Other News" />
                  </Spacer>
                </Grid>
              </Spacer>

              <Grid container justify="space-between">
                {renderPost(prevPost)}
                {posts?.nodes.length > 2 && renderPost(nextPost)}
              </Grid>
            </Spacer>
          </Edges>
        </RelatedPostsContainer>
      )}
    </>
  )
}

const StyledTextarea = styled(Textarea)`
  && {
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: calc(100% - 15px);
  height: 240px;

  @media screen and (min-width: ${theme.mui.breakpoints.values.sm}px) {
    height: 380px;
  }
`

const RelatedPostsContainer = styled.div`
  background: ${theme.colors.background.dark};
`

const RelatedPost = styled(Post)`
  width: 100%;
  margin-bottom: 40px;

  @media screen and (min-width: ${theme.mui.breakpoints.values.sm}px) {
    width: calc(50% - 20px);
    margin-bottom: 0;
  }
`

export const CollectionQuery = graphql`
  query DefaultSinglePost($id: String!) {
    post: wpPost(id: { eq: $id }) {
      id
      title
      uri
      date
      acf {
        text
        image {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    posts: allWpPost {
      nodes {
        id
        title
        uri
        date
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

export default PostSingle
