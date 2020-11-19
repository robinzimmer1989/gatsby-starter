import React from "react"
import styled from "styled-components"

import { OpenInNew, Close } from "mdi-material-ui"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"

import YouTube from "./YouTube"
import { BackgroundImage } from "components"
import { useStore } from "store"

export default function Slide(props) {
  const dispatch = useStore()[1]

  const {
    slide: { image, link },
    slide,
    slideCount
  } = props

  const isYoutube = link?.url && link?.url.includes("youtu")

  return (
    <Container {...slide} slideCount={slideCount}>
      {!!isYoutube && (
        <LinkToPost href={link.url} target="_blank" rel="noopener referrer">
          <Tooltip title="Watch on YouTube" placement="right">
            <IconButton aria-label="Watch on YouTube">
              <OpenInNew />
            </IconButton>
          </Tooltip>
        </LinkToPost>
      )}
      <ExitButton
        aria-label="Close"
        onClick={() =>
          dispatch({
            type: "CLOSE_LIGHTBOX"
          })
        }
      >
        <IconButton aria-label="Close">
          <Close />
        </IconButton>
      </ExitButton>

      {!!isYoutube && <YouTube video={link.url} />}

      {!isYoutube && (
        <ImageContainer slideCount={slideCount}>
          {!!image && !!image.localFile ? (
            <BackgroundImage backgroundSize="contain" {...{ image }} />
          ) : (
            <img src={image} alt="" />
          )}
        </ImageContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  height: ${({ slideCount }) =>
    slideCount > 1 ? "calc(100vh - 100px)" : "100vh"};
`
const ImageContainer = styled.div`
  height: ${({ slideCount }) =>
    slideCount > 1 ? "calc(100vh - 100px)" : "100vh"};
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

const ExitButton = styled.div`
  position: absolute;
  z-index: 10;
  top: 10px;
  right: 10px;

  svg {
    fill: white;
  }
`
const LinkToPost = styled.a`
  z-index: 1;
  text-decoration: none;
  color: inherit;
  position: absolute;
  top: -50px;
  left: 0;
  cursor: pointer;
  svg {
    fill: white;
  }
`
