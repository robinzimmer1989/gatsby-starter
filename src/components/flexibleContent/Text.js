import React from "react"

// import app components
import { Edges, Textarea } from "components"

const Text = props => {
  const { text } = props

  return (
    <Edges size="sm">
      <Textarea content={text} />
    </Edges>
  )
}

export default Text
