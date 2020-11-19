import React, { useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import HamburgerMenu from "react-hamburger-menu"
import { AppBar } from "@material-ui/core"

// import app components
import { DesktopMenu, MobileMenu, Edges } from "components"
import { useStore } from "store"
import * as theme from "theme"

export default props => {
  const { path } = props

  const [
    {
      appState: { menu }
    },
    dispatch
  ] = useStore()

  useEffect(() => {
    dispatch({ type: "SET_MENU", payload: false })
  }, [path, dispatch])

  return (
    <>
      <StyledAppBar position="static">
        <Edges size="lg">
          <Grid>
            <LogoContainer>
              <Link
                to="/"
                onClick={() => dispatch({ type: "SET_MENU", payload: false })}
              >
                App
              </Link>
            </LogoContainer>

            <Navigation>
              <DesktopMenu
                className="desktop-menu"
                style={{ marginRight: "10px" }}
              />

              <HamburgerMenuContainer
                onClick={() => dispatch({ type: "TOGGLE_MENU" })}
              >
                <HamburgerMenu
                  color={theme.colors.primary}
                  isOpen={menu}
                  width={18}
                  height={15}
                  strokeWidth={1}
                  menuClicked={() => ""}
                />
              </HamburgerMenuContainer>
            </Navigation>
          </Grid>
        </Edges>
      </StyledAppBar>

      <MobileMenu />
    </>
  )
}

const StyledAppBar = styled(AppBar)`
  && {
    background: #fff;
    padding: 10px 0;
    display: flex;
    align-items: center;
    z-index: 999;
    position: relative;
  }
`

const Navigation = styled.div`
  display: flex;
  align-items: center;
`

const Grid = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .desktop-menu {
    @media (max-width: ${theme.breakpoints.down.md}) {
      display: none;
    }
  }
`

const LogoContainer = styled.div`
  a {
    text-decoration: none;
  }
`

const HamburgerMenuContainer = styled.div`
  padding: 15px;
  transform: translateX(15px);
  cursor: pointer;

  @media (min-width: ${theme.breakpoints.up.md}) {
    display: none;
  }
`
