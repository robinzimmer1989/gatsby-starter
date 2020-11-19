import React, { useRef, useEffect, useState } from "react"
import styled, { css } from "styled-components"
import {
  isIE,
  isEdge,
  isSafari,
  isMobile,
  isChromium
} from "react-device-detect"
import { ChevronRight, ChevronLeft } from "mdi-material-ui"

import { BackgroundImage } from "components"
import { useStore } from "store"
import useWindowSize from "utils/useWindowSize"

export default function Thumbs(props) {
  const [
    {
      appState: {
        lightBox: { slide, slides }
      }
    },
    dispatch
  ] = useStore()

  const windowSize = useWindowSize()

  const [, setLoaded] = useState(false)

  const [currentThumbRect, setCurrentThumbRect] = useState(false)

  const [shouldShowControls, setShouldShowControls] = useState(false)

  const goToSlide = index => {
    dispatch({ type: "SET_LIGHTBOX", payload: { slide: index } })
  }

  const containerRef = useRef(null)

  const thumbsArray =
    !!containerRef && !!containerRef.current && containerRef.current.children

  const oldBrowser = isIE || isEdge || isSafari || (isMobile && !isChromium)

  const scrollOptions = !oldBrowser && {
    behavior: "smooth"
  }

  useEffect(() => {
    setLoaded(true)
  }, [containerRef])

  useEffect(() => {
    !!thumbsArray &&
      !!thumbsArray[slide] &&
      setCurrentThumbRect(thumbsArray[slide].getBoundingClientRect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide])

  useEffect(() => {
    scrollToCurrentThumb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentThumbRect])

  const scrollToCurrentThumb = () => {
    if (thumbsArray && currentThumbRect && windowSize) {
      // if right is out of view
      currentThumbRect.right > windowSize.width &&
        thumbsArray[slide].scrollIntoView(scrollOptions)
      // if left is out of view
      currentThumbRect.left < 0 &&
        thumbsArray[slide].scrollIntoView(scrollOptions)
    }
  }

  const lastChild = containerRef?.current?.lastChild

  const applyRef = ref => {}

  useEffect(() => {
    checkControls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef])

  useEffect(() => {
    checkControls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastChild])

  useEffect(() => {
    checkControls()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize])

  const checkControls = () => {
    if (!!lastChild) {
      // if last child is off screen then show arrow controls
      lastChild.getBoundingClientRect().right > windowSize.width
        ? setShouldShowControls(true)
        : setShouldShowControls(false)
    }
  }

  const scrollToRight = () => {
    !!containerRef?.current &&
      containerRef.current.scrollBy({
        left: windowSize.width,
        behavior: "smooth"
      })
  }

  const scrollToLeft = () => {
    !!containerRef?.current &&
      containerRef.current.scrollBy({
        left: -windowSize.width,
        behavior: "smooth"
      })
  }

  return (
    <Container ref={containerRef}>
      {!!shouldShowControls && (
        <>
          <ArrowRight className="arrow-button" onClick={() => scrollToRight()}>
            <ChevronRight />
          </ArrowRight>

          <ArrowLeft className="arrow-button" onClick={() => scrollToLeft()}>
            <ChevronLeft />
          </ArrowLeft>
        </>
      )}

      {!!slides &&
        slides.map((item, index) => {
          return (
            <Thumb
              key={index}
              onClick={() => goToSlide(index)}
              selected={index === slide}
            >
              {!!item && item.image && (
                <BackgroundImage image={item.image} maxWidth={200} />
              )}
            </Thumb>
          )
        })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;

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

  &:hover {
    .arrow-button {
      opacity: 1;
    }
  }
`
const Thumb = styled.div`
  &:after {
    transition: all 0.2s ease-in-out;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
    ${props =>
      props.selected &&
      css`
        background: rgba(0, 0, 0, 0);
        border: 2px solid white;
      `}
  }
  &:hover {
    &:after {
      background: rgba(0, 0, 0, 0);
    }
  }
  position: relative;
  height: 100px;
  width: 200px;
  background: lightgrey;
  cursor: pointer;
  flex-shrink: 0;
`

const ArrowRight = styled.div`
  position: fixed;
  bottom: 50px;
  transform: translateY(50%);
  right: 0;
  z-index: 8;
`

const ArrowLeft = styled.div`
  position: fixed;
  bottom: 50px;
  transform: translateY(50%);
  left: 0;
  z-index: 8;
`
