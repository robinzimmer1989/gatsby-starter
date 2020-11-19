import React from "react"
import styled, { css } from "styled-components"

const YouTube = props => {
  const { video, ...rest } = props

  let videoId = !!video ? video.includes("youtu") && video.substring(video.lastIndexOf("/") + 1) : ""

  if (videoId.includes(`watch?v=`)) {
    videoId = videoId.replace(`watch?v=`, ``)
  }

  return (
    <Container {...rest}>
      <Embed src={`https://www.youtube.com/embed/` + videoId + `?autoplay=1&rel=0`} frameBorder={0} />
    </Container>
  )
}

export default YouTube

const Container = styled.div`
  position: relative;
  padding-bottom: 56.25% /* 16:9 */;
  height: 0;
  ${props =>
    props.width
      ? css`
          width: ${props.width};
        `
      : css`
          width: 1920px;
        `}
  max-width: 100%;
  background: black;
`
const Embed = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
