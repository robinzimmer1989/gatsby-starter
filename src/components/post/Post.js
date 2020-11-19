import React from "react"
import styled from "styled-components"
import { Typography } from "@material-ui/core"
import { Link } from "gatsby"

// import app components
import { BackgroundImage, Spacer } from "components"

const NewsPost = props => {
  const { image, headline, url, ...rest } = props

  return (
    <Container {...rest}>
      <Link to={url}>
        <Spacer mb={20}>
          <ImageContainer>{image && <BackgroundImage image={image} />}</ImageContainer>
        </Spacer>
      </Link>

      {headline && (
        <Spacer mb={20}>
          <Link to={url}>
            <Typography variant="h5" children={headline} />
          </Link>
        </Spacer>
      )}
      <Link to={url}>
        <ReadMore children={`Read more`} color="primary" />
      </Link>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const ImageContainer = styled.div`
  position: relative;
  z-index: 1;
  height: 220px;
  width: 100%;
`

const ReadMore = styled(Typography)`
  && {
    font-weight: bold;
  }
`

export default NewsPost
