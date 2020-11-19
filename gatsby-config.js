require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

const path = require("path")

const gatsbyConfig = {
  siteMetadata: {
    title: `Gatsby Starter`,
    siteUrl: `http://localhost:8000`
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`)
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/`
      }
    },
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url: `${process.env.GATSBY_WP}/graphql`,
        verbose: true,
        schema: {
          queryDepth: 6,
          typePrefix: `Wp`
        },
        develop: {
          nodeUpdateInterval: 5000,
          hardCacheMediaFiles: true
        },
        debug: {
          graphql: {
            showQueryOnError: true,
            showQueryVarsOnError: true,
            copyQueryOnError: true,
            panicOnError: false
          }
        }
      }
    },
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        components: path.join(__dirname, `src/components`),
        icons: path.join(__dirname, `src/icons`),
        images: path.join(__dirname, `src/images`),
        pages: path.join(__dirname, `src/pages`),
        src: path.join(__dirname, `src`),
        services: path.join(__dirname, `src/services`),
        store: path.join(__dirname, `src/store`),
        theme: path.join(__dirname, `src/theme`),
        utils: path.join(__dirname, `src/utils`)
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage(filter: {context: {id: {ne: null}}}) {
            edges {
              node {
                path
                context {
                  id
                }
              }
            }
          }
      }`
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    {
      resolve: `gatsby-source-gravityforms`,
      options: {
        baseUrl: process.env.GATSBY_WP,
        api: {
          key: process.env.GATSBY_GF_KEY,
          secret: process.env.GATSBY_GF_SECRET
        }
      }
    }
  ]
}

if (process.env.GATSBY_FACEBOOK_PIXEL) {
  gatsbyConfig.plugins.push({
    resolve: `gatsby-plugin-facebook-pixel`,
    options: {
      pixelId: process.env.GATSBY_FACEBOOK_PIXEL
    }
  })
}

if (process.env.GATSBY_GOOGLE_TAG_MANAGER) {
  gatsbyConfig.plugins.push({
    resolve: `gatsby-plugin-google-tagmanager`,
    options: {
      id: process.env.GATSBY_GOOGLE_TAG_MANAGER,
      includeInDevelopment: false
    }
  })
}

if (process.env.GATSBY_GOOGLE_ANALYTICS) {
  gatsbyConfig.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GATSBY_GOOGLE_ANALYTICS,
      head: true,
      anonymize: true
    }
  })
}

if (process.env.GATSBY_RECAPTCHA) {
  gatsbyConfig.plugins.push({
    resolve: `gatsby-plugin-recaptcha`,
    options: {
      async: true,
      defer: true
    }
  })
}

if (process.env.NODE_ENV === `production`) {
  gatsbyConfig.plugins.push(`gatsby-plugin-remove-serviceworker`)
  gatsbyConfig.plugins.push(`gatsby-plugin-favicon`)
}

module.exports = gatsbyConfig
