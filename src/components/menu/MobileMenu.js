import React, { useState } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Typography } from "@material-ui/core"
import Parser from "html-react-parser"
import ChevronDown from "icons/chevron-down.svg"

// import app components
import { useStore } from "store"
import useMenuItems from "./useMenuItems"
import { getUrlPath } from "utils"
import * as theme from "theme"

const MobileMenu = props => {
  const [
    {
      appState: { menu }
    },
    dispatch
  ] = useStore()

  const items = useMenuItems("desktop-main-menu")

  const [activeItems, setActiveItems] = useState([])

  const handleArrowClick = id => {
    let newItems = [...activeItems]

    if (activeItems.includes(id)) {
      newItems = newItems.filter(i => i !== id)
    } else {
      newItems.push(id)
    }

    setActiveItems(newItems)
  }

  const handleCloseMenu = () => dispatch({ type: "SET_MENU", payload: false })

  return (
    <>
      <Menu {...props} menuState={menu}>
        {items &&
          items.map(({ id, url, label, childItems, cssClasses }) => {
            return (
              <MenuItem key={id}>
                {childItems && childItems.nodes.length ? (
                  <>
                    {url === "#" ? (
                      <MenuLinkContainer onClick={() => handleArrowClick(id)}>
                        <Typography
                          color="inherit"
                          component="div"
                          variant="subtitle1"
                          children={Parser(label)}
                        />
                        <ChevronContainer>
                          <ChevronDown />
                        </ChevronContainer>
                      </MenuLinkContainer>
                    ) : (
                      <MenuLinkContainer>
                        <MenuLink
                          to={getUrlPath(url)}
                          activeStyle={{ color: theme.colors.primary }}
                          onClick={handleCloseMenu}
                        >
                          <Typography
                            color="inherit"
                            component="div"
                            variant="subtitle1"
                            children={Parser(label)}
                          />
                        </MenuLink>
                        <ChevronContainer onClick={() => handleArrowClick(id)}>
                          <ChevronDown />
                        </ChevronContainer>
                      </MenuLinkContainer>
                    )}

                    <SubMenu
                      className={`sub-menu ${cssClasses.join(" ")}`}
                      active={activeItems.includes(id)}
                    >
                      {childItems.nodes.map((o, i) => {
                        return (
                          <SubMenuLink
                            key={i}
                            to={getUrlPath(o.url)}
                            activeClassName="active"
                            onClick={handleCloseMenu}
                          >
                            <Typography
                              color="inherit"
                              component="div"
                              variant="subtitle1"
                              children={Parser(o.label)}
                            />
                          </SubMenuLink>
                        )
                      })}
                    </SubMenu>
                  </>
                ) : (
                  <MenuLink
                    to={getUrlPath(url)}
                    onClick={handleCloseMenu}
                    activeStyle={{ color: theme.colors.primary }}
                    className={cssClasses.join(" ")}
                  >
                    <Typography
                      color="inherit"
                      component="div"
                      variant="subtitle1"
                      children={Parser(label)}
                    />
                  </MenuLink>
                )}
              </MenuItem>
            )
          })}
      </Menu>

      <Gradient
        onClick={() => dispatch({ type: "SET_MENU", payload: false })}
        menuState={menu}
      />
    </>
  )
}

export default MobileMenu

const menuClose = css`
  transform: translateX(120%);
  opacity: 0;
`
const menuOpen = css`
  transform: translateX(0);
  opacity: 1;
`

const Menu = styled.div`
  ${props => (!!props.menuState ? menuOpen : menuClose)}
  position: fixed;
  top: 64px;
  height: calc(100% - 64px);
  width: 100%;
  right: 0;
  max-width: 250px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  background: #fff;
  padding-top: 40px;
  padding-bottom: 40px;
  overflow-y: auto;
`

const ChevronContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
`

const ItemCSS = `
  position: relative;
  color: ${theme.colors.primary};
  text-decoration: none;
  width: 100%;
`

const MenuLinkContainer = styled.div`
  ${ItemCSS}
  display: flex;
  justify-content: space-between;
`

const MenuItem = styled.div`
  padding: 10px 10px 10px 20px;
  ${ItemCSS}
`

const MenuLink = styled(Link)`
  ${ItemCSS}
`

const SubMenu = styled.div`
  display: ${props => (props.active ? "block" : "none")};
`

const SubMenuLink = styled(Link)`
  display: block;
  padding: 4px 0;
  color: ${theme.colors.secondary};
`

const Gradient = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => (!!props.menuState ? 1 : 0)};
  pointer-events: ${props => (!!props.menuState ? "all" : "none")};
  transition: ease all 0.2s;
`
