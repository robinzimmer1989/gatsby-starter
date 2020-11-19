import React from "react"
import styled from "styled-components"
import Img from "gatsby-image/withIEPolyfill"

export default function BackgroundImage(props) {
  const { image, backgroundSize, verticalAlignment, animated, ...rest } = props

  return (
    <Container {...rest} animated={animated}>
      {image?.localFile?.childImageSharp?.fluid && (
        <Img
          style={{
            objectFit: backgroundSize || `cover`,
            objectPosition: `50% ${verticalAlignment || "50%"}`
            // fontFamily: `object-fit: ${backgroundSize || `cover`}; object-position: 50% 50%;`
          }}
          objectFit={backgroundSize || `cover`}
          objectPosition={`50% ${verticalAlignment || "50%"}`}
          fluid={image?.localFile?.childImageSharp?.fluid}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(
      0,
      0,
      0,
      ${props => (!!props.darkness ? props.darkness : 0.15)}
    );
    opacity: ${props => (!props.overlay ? 0 : 1)};
  }

  .gatsby-image-wrapper {
    height: 100% !important;
    width: 100% !important;
  }

  ${props =>
    props.animated &&
    `
    .gatsby-image-wrapper {
      transition: ease all 0.8s;
      transform: scale(1);
    }

    &:hover {
      .gatsby-image-wrapper {
        transform: scale(1.02);
      }
    }
  `}
`
