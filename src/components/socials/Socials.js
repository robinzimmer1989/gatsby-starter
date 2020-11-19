import React from "react"
import styled from "styled-components"
import { IconButton } from "@material-ui/core"
import { graphql, useStaticQuery } from "gatsby"

// import app components
import FacebookIcon from "icons/facebook.svg"
import TwitterIcon from "icons/twitter.svg"
import InstagramIcon from "icons/instagram.svg"
import YoutubeIcon from "icons/youtube.svg"

const Socials = props => {
  const { ...rest } = props

  const {
    themeOptions: {
      siteOptions: {
        socialMedia: { facebook, instagram, twitter, youtube }
      }
    }
  } = useOptionsQuery()

  return (
    <Container {...rest}>
      {facebook && (
        <Link
          href={facebook}
          target="_blank"
          rel="noreferrer nofollow"
          aria-label="Facebook"
        >
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </Link>
      )}

      {instagram && (
        <Link
          href={instagram}
          target="_blank"
          rel="noreferrer nofollow"
          aria-label="Linkedin"
        >
          <IconButton>
            <InstagramIcon />
          </IconButton>
        </Link>
      )}

      {youtube && (
        <Link
          href={youtube}
          target="_blank"
          rel="noreferrer nofollow"
          aria-label="Linkedin"
        >
          <IconButton>
            <YoutubeIcon />
          </IconButton>
        </Link>
      )}

      {twitter && (
        <Link
          href={twitter}
          target="_blank"
          rel="noreferrer nofollow"
          aria-label="Twitter"
        >
          <IconButton>
            <TwitterIcon />
          </IconButton>
        </Link>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const Link = styled.a`
  text-decoration: none;
  display: inline-block;
  margin: 0 10px;
`

const useOptionsQuery = () => {
  const { wp } = useStaticQuery(
    graphql`
      query {
        wp {
          themeOptions {
            siteOptions {
              socialMedia {
                facebook
                instagram
                twitter
                youtube
              }
            }
          }
        }
      }
    `
  )
  return wp
}

export default Socials
