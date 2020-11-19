import { useStaticQuery, graphql } from "gatsby"

export const useMenuItems = (slug) => {
  const {
    allWpMenu: { menus }
  } = useStaticQuery(graphql`
    {
      allWpMenu {
        menus: nodes {
          id
          slug
          menuItems {
            nodes {
              parentDatabaseId
              id
              label
              url
              cssClasses
              connectedNode {
                node {
                  __typename
                  ... on WpContentNode {
                    uri
                  }
                }
              }
              childItems {
                nodes {
                  id
                  label
                  url
                  cssClasses
                  connectedNode {
                    node {
                      __typename
                      ... on WpContentNode {
                        uri
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const menu = !!menus && menus.find((menu) => menu.slug === slug)

  const menuItems =
    menu?.menuItems?.nodes &&
    menu.menuItems.nodes.filter((item) => item.parentDatabaseId === 0)

  return menuItems
}

export default useMenuItems
