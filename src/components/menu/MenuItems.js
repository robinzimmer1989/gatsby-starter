import { useStaticQuery, graphql } from "gatsby"

export default props => {
  const { name, children } = props

  const { allWpMenu } = useStaticQuery(graphql`
    {
      allWpMenu {
        nodes {
          slug
          menuItems {
            nodes {
              id
              parentDatabaseId
              label
              url
              cssClasses
              childItems {
                nodes {
                  id
                  parentDatabaseId
                  label
                  url
                  cssClasses
                  childItems {
                    nodes {
                      id
                      parentDatabaseId
                      label
                      url
                      cssClasses
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

  let menu,
    items = []

  if (!name) return items

  if (typeof name === "string" || name instanceof String) {
    menu = allWpMenu.nodes.find(menu => menu.slug === name)
    items = menu && menu.menuItems.nodes.length > 0 ? menu.menuItems.nodes : []
  }

  return items ? children(items) : null
}
