import React, { useEffect } from "react"
import styled from "styled-components"
import { Dialog } from "@material-ui/core"
import { ChevronRight, ChevronLeft } from "mdi-material-ui"

import Slide from "./Slide"
import Thumbs from "./Thumbs"
import { useStore } from "store"
import useKeyPress from "utils/useKeyPress"

const LightBox = () => {
  const [
    {
      appState: {
        lightBox: {
          open,
          slide,
          slides,
          options: { thumbs }
        }
      }
    },
    dispatch
  ] = useStore()

  const escapeKey = useKeyPress("Escape")
  const arrowRightKey = useKeyPress("ArrowRight")
  const arrowLeftKey = useKeyPress("ArrowLeft")

  const closeLightBox = () => {
    dispatch({
      type: "CLOSE_LIGHTBOX"
    })
  }

  const goToNextSlide = () => {
    if (open && slides.length > 1 && slides.length > slide - 2) {
      if (slide < slides.length - 1) {
        dispatch({ type: "SET_LIGHTBOX", payload: { slide: slide + 1 } })
      } else if (slides.length) {
        dispatch({ type: "SET_LIGHTBOX", payload: { slide: 0 } })
      }
    }
  }

  const goToPrevSlide = () => {
    if (open && slides.length > 1 && slide > 0) {
      dispatch({ type: "SET_LIGHTBOX", payload: { slide: slide - 1 } })
    } else if (slide === 0) {
      dispatch({ type: "SET_LIGHTBOX", payload: { slide: slides.length - 1 } })
    }
  }

  useEffect(() => {
    closeLightBox()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escapeKey])

  useEffect(() => {
    arrowRightKey && goToNextSlide()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowRightKey])

  useEffect(() => {
    arrowLeftKey && goToPrevSlide()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowLeftKey])

  return (
    <Container open={open} onClose={() => closeLightBox()} maxWidth="md">
      <SlideWrapper>
        {slides.length > 1 && (
          <Controls className="controls">
            <ArrowRight
              className="arrow-button"
              onClick={() => goToNextSlide()}
            >
              <ChevronRight />
            </ArrowRight>
            <ArrowLeft className="arrow-button" onClick={() => goToPrevSlide()}>
              <ChevronLeft />
            </ArrowLeft>
          </Controls>
        )}
        <Slide
          slide={slides.length && slides[slide]}
          slideCount={slides ? slides.length : 0}
        />
      </SlideWrapper>
      {!!thumbs && slides.length > 1 && <Thumbs hidden={!thumbs} />}
    </Container>
  )
}

export default LightBox

const Container = styled(Dialog)`
  .MuiPaper-root {
    background: transparent;
  }
  .MuiDialog-paper {
    overflow-y: unset;
  }
  .MuiBackdrop-root {
    background: black;
  }

  .MuiDialog-paperScrollPaper {
    display: flex;
    width: 100%;
    max-width: 100%;
    height: 100vh;
    max-height: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin: 0;
  }
`

const SlideWrapper = styled.div`
  position: relative;
  &:hover {
    .controls {
      opacity: 1;
    }
  }
`

const Controls = styled.div`
  @media (min-width: 800px) {
    opacity: 0;
  }
  transition: opacity 0.2s ease-in-out;
  svg {
    fill: white;
    width: 30px;
    height: 30px;
  }
  .arrow-button {
    cursor: pointer;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);

    transition: border 0.2s ease-in-out;
    border: 1px solid transparent;
    &:hover {
      border: 1px solid white;
    }
  }
`

const ArrowRight = styled.div`
  position: absolute;
  top: 50%;
  top: calc(50% - 28px);
  right: 0;
  z-index: 1;
`

const ArrowLeft = styled.div`
  position: absolute;
  top: 50%;
  top: calc(50% - 28px);
  left: 0;
  z-index: 1;
`
