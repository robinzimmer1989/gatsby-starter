import React from "react"

// import flexible content modules
import Form from "./Form"
import Text from "./Text"
import News from "./News"

export default props => {
  const { rows, data } = props

  if (!!rows) {
    return rows
      .filter(o => o !== null)
      .map(({ __typename, ...rowData }, index) => {
        const type = __typename.split("_").slice(-1)[0]
        const components = {
          Form,
          Text,
          News
        }
        const Component = components[type]
        return (
          Component && (
            <Component
              key={index}
              firstItem={index === 0}
              {...rowData}
              {...data}
            />
          )
        )
      })
  }
}
