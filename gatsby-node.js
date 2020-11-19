const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const { resolve } = require(`path`)
const path = require(`path`)
const glob = require(`glob`)

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [new CaseSensitivePathsPlugin()]
  })
}

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-mapbox-gl/,
            use: ["null-loader"]
          }
        ]
      }
    })
  }
}

const getTemplates = () => {
  const sitePath = path.resolve(`./`)
  return glob.sync(`./src/templates/**/*.js`, { cwd: sitePath })
}

const seoString = `
  seo {
    title
    metaDesc
    opengraphTitle
    opengraphDescription
    opengraphImage {
      id
      mediaItemUrl
      link
      sourceUrl
    }
  }
`

exports.createPages = async ({ actions, graphql }) => {
  const {
    data: {
      wp: { generalSettings }
    }
  } = await graphql(`
    query ROOT_FIELDS {
      wp {
        generalSettings {
          title
        }
      }
    }
  `)

  const {
    data: { allWpContentType }
  } = await graphql(`
    query ALL_CONTENT_TYPES {
      allWpContentType {
        nodes {
          graphqlSingleName
        }
      }
    }
  `)

  const templates = getTemplates()
  const contentTypeTemplates = templates.filter((path) =>
    path.includes(`./src/templates/single/`)
  )

  for (const contentType of allWpContentType.nodes) {
    const { graphqlSingleName } = contentType

    const nodesTypeName =
      graphqlSingleName.charAt(0).toUpperCase() + graphqlSingleName.slice(1)

    const contentTypeTemplate = contentTypeTemplates.find(
      (path) => path === `./src/templates/single/${graphqlSingleName}.js`
    )

    if (!contentTypeTemplate) {
      continue
    }
    const gatsbyNodeListFieldName = `allWp${nodesTypeName}`

    const { data } = await graphql(`
        query ALL_CONTENT_NODES {
            ${gatsbyNodeListFieldName}{
            nodes {
              uri
              id
              ${seoString}
            }
          }
        }
      `)
    const { nodes } = data[gatsbyNodeListFieldName]

    await Promise.all(
      nodes.map(async (node, i) => {
        const { id, seo, uri } = node

        await actions.createPage({
          component: resolve(contentTypeTemplate),
          path: uri,
          context: {
            siteTitle: generalSettings.title,
            seo,
            id,
            nextPage: (nodes[i + 1] || {}).id,
            previousPage: (nodes[i - 1] || {}).id
          }
        })
      })
    )
  }
}
