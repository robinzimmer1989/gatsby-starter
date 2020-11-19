import React from "react"
import Helmet from "react-helmet"
import Parser from "html-react-parser"

export default props => {
  const { siteTitle, href, seo } = props
  const { title, metaDesc, opengraphTitle, opengraphDescription, opengraphImage } = seo || {}

  return (
    <Helmet>
      {title && <title>{Parser(title)}</title>}

      {metaDesc && <meta name="description" content={Parser(metaDesc)} />}

      <meta property="og:type" content="website" />

      {(!!opengraphDescription || !!metaDesc) && (
        <meta property="og:description" content={Parser(opengraphDescription || metaDesc)} />
      )}

      {opengraphImage && <meta property="og:image" content={opengraphImage.sourceUrl} />}

      {siteTitle && <meta property="og:site_name" content={Parser(siteTitle)} />}

      {href && <meta property="og:url" content={href} />}

      {(opengraphTitle || title) && <meta property="og:title" content={Parser(opengraphTitle || title)} />}

      <meta name="twitter:card" content="summary" />

      {opengraphImage && <meta property="twitter:image" content={opengraphImage.sourceUrl} />}

      {(opengraphTitle || title) && <meta property="twitter:title" content={Parser(opengraphTitle || title)} />}
    </Helmet>
  )
}
