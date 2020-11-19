import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Parser from "html-react-parser"
// import MenuItems from "./MenuItems"

import { Typography } from "@material-ui/core"

import useMenuItems from "./useMenuItems"

// import app components
import * as theme from "theme"
import { getUrlPath } from "utils"
import ChevronDown from "icons/chevron-down.svg"

const DesktopMenu = props => {
  const items = useMenuItems("desktop-main-menu")

  return (
    <Menu {...props}>
      {items &&
        items.map(({ id, url, label, childItems }) => (
          <MenuItem key={id}>
            {childItems && childItems.nodes.length ? (
              <>
                {url === "#" ? (
                  <MenuLinkContainer>
                    <Typography
                      color="inherit"
                      component="div"
                      variant="subtitle1"
                      children={Parser(label)}
                    />

                    <ChevronDown />
                  </MenuLinkContainer>
                ) : (
                  <MenuLink
                    to={getUrlPath(url)}
                    activeStyle={{ color: theme.colors.primary }}
                  >
                    <Typography
                      color="inherit"
                      component="div"
                      variant="subtitle1"
                      children={Parser(label)}
                    />

                    <ChevronDown />
                  </MenuLink>
                )}

                <SubMenu className="sub-menu">
                  {childItems.nodes.map((o, i) => (
                    <SubMenuItem
                      key={i}
                      to={getUrlPath(o.url)}
                      activeClassName="active"
                    >
                      <Typography
                        color="inherit"
                        component="div"
                        variant="subtitle1"
                        children={Parser(o.label)}
                      />
                    </SubMenuItem>
                  ))}
                </SubMenu>
              </>
            ) : (
              <MenuLink
                to={getUrlPath(url)}
                activeStyle={{ color: theme.colors.primary }}
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
        ))}
    </Menu>
  )
}

export default DesktopMenu

const Menu = styled.div`
  display: flex;
  a {
    text-decoration: none;
  }
`
const MenuItem = styled.div`
  display: flex;
  position: relative;

  &:hover {
    .sub-menu {
      opacity: 1;
      pointer-events: all;
    }
  }
  .sub-menu {
    opacity: 0;
    pointer-events: none;
  }
`

const MenuLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  margin-left: 20px;
  color: ${theme.colors.text.dark};

  &:hover {
    color: ${theme.colors.primary};
  }
`

const SubMenu = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 100%;
  left: calc(50% + 15px);
  transform: translateX(-50%);
  background: ${theme.colors.background.light};
  border: 1px solid ${theme.colors.background.dark};

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${theme.colors.background.dark};
  }
`

const SubMenuItem = styled(Link)`
  padding: 15px 30px;
  flex-shrink: 0;
  white-space: nowrap;
  color: ${theme.colors.text.dark};

  &:hover,
  &.active {
    background: ${theme.colors.primary};
    color: #fff;
  }
`

const MenuLinkContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  margin-left: 20px;
  color: #fff;
  cursor: pointer;

  svg {
    margin-left: 5px;
  }
`
