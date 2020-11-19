import React from "react"
import { graphql } from "gatsby"

// import app components
import { FlexibleContent } from "components"

export default function DefaultPageTemplate(props) {
  const {
    data: {
      page: {
        title,
        uri,
        acf: { modules }
      }
    }
  } = props

  return (
    <>
      {!!modules && (
        <FlexibleContent
          rows={modules}
          data={{
            title,
            uri
          }}
        />
      )}
    </>
  )
}

export const CollectionQuery = graphql`
  query DefaultTemplate($id: String!) {
    page: wpPage(id: { eq: $id }) {
      title
      slug
      uri
      acf {
        modules {
          ... on WpPage_Acf_Modules_Text {
            text
          }
        }
      }
    }
  }
`
