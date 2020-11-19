import React from "react"

// import app components
import FormContainer from "components/form"
import Edges from "components/edges"

const Form = (props) => {
  return (
    <Edges size="sm">
      <FormContainer {...props} />
    </Edges>
  )
}

export default Form
