import React from "react"
import styled from "styled-components"

// import app components
import { Header, Footer } from "components"

export default props => {
  return (
    <Container>
      <Header />
      <main>{props?.children}</main>
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  background: #f3faf9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`
