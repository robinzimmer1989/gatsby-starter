import React from "react"
import styled from "styled-components"

const Edges = props => {
  return <Container {...props}>{props.children}</Container>
}

const Container = styled.div`
    width: 90%;
    margin: 0 auto;
    ${props => props.size === "sm" && "max-width: 600px;"}
    ${props => props.size === "md" && "max-width: 1024px;"}
    ${props => props.size === "lg" && "max-width: 1280px;"}
`

export default Edges
