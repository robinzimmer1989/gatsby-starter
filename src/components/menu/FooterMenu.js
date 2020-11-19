import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Parser from "html-react-parser"

import { Typography } from "@material-ui/core"

// import app components
import useMenuItems from "./useMenuItems"
import { getUrlPath } from "utils"

const FooterMenu = props => {
  const items = useMenuItems("footer-menu")

  return (
    <Menu {...props}>
      {items &&
        items.map(({ id, url, label }) => (
          <MenuItem key={id}>
            <MenuLink to={getUrlPath(url)}>
              <Typography
                color="inherit"
                component="div"
                variant="body2"
                children={Parser(label)}
              />
            </MenuLink>
          </MenuItem>
        ))}
    </Menu>
  )
}

export default FooterMenu

const Menu = styled.div`
  display: flex;

  a {
    text-decoration: none;
  }
`
const MenuItem = styled.div`
  display: flex;
  position: relative;
`

const MenuLink = styled(Link)`
  padding: 20px 10px;
  margin-left: 20px;
  color: #fff;
`
