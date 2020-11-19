import React, { useState } from "react"
import Form from "react-jsonschema-form"
import Recaptcha from "react-recaptcha"
import CircularProgress from "@material-ui/core/CircularProgress"
import styled from "styled-components"

import {
  createFormSchema,
  createUISchema,
  submitForm,
  populateHiddenFields,
  transformToGravityFormsFormat,
  removeInvisibleFields
} from "./utils"

import ObjectFieldTemplate from "./misc/objectFieldTemplate"

let recaptchaInstance

function GravityForm({ form, onSuccess, onRedirect, hiddenFields, reCaptcha, button, hideTitle }) {
  const [loading, setLoading] = useState(false)

  if (!form) return null

  const formId = form.formId

  // we don't want to render fields which are hidden
  form = removeInvisibleFields(form)

  // variable to temporarily save form data.
  // This is necessary so the onVerify callback has access to the form data
  let formData = null

  const processForm = response => {
    setLoading(true)

    // save data into state
    formData = response

    if (reCaptcha) {
      // execute reCaptcha field
      recaptchaInstance.execute()
    } else {
      // else go straight to verfication function
      onVerify(true)
    }
  }

  const onVerify = async response => {
    if (response) {
      // make data structure edits to integrate with GF Rest API
      let transformedData = transformToGravityFormsFormat(form, formData)

      // add hidden fields to form if provided
      if (hiddenFields) {
        transformedData = populateHiddenFields(transformedData, hiddenFields)
      }

      // save form to wordpress
      const result = await submitForm(transformedData, form.apiURL)

      setLoading(false)

      if (result && result.is_valid) {
        if (result.confirmation_message) {
          onSuccess && onSuccess(result.confirmation_message)
        } else if (result.confirmation_redirect) {
          onRedirect && onRedirect(result.confirmation_redirect)
        }

        // reset formData
        formData = null
      } else {
        console.error(result)
      }
    } else {
      console.error(response)
    }

    setLoading(false)
  }

  return (
    <Container>
      {form && (
        <Form
          className={`gravityForm gravityForm-${formId}`}
          schema={createFormSchema(form)}
          uiSchema={createUISchema(form)}
          onSubmit={data => processForm(data)}
          ObjectFieldTemplate={props => <ObjectFieldTemplate hideTitle={hideTitle} {...props} />}
          hideTitle={hideTitle}
          customFormats={{
            "###-###-####": /\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/
          }}
          transformErrors={errors =>
            errors.map(error => {
              if (error.name === "minItems") {
                error.message = "This is a required field."
              }
              return error
            })
          }
        >
          {button}
        </Form>
      )}

      <Loader loading={loading}>
        <CircularProgress />
      </Loader>

      {reCaptcha && typeof window !== `undefined` && (
        <Recaptcha ref={e => (recaptchaInstance = e)} sitekey={reCaptcha} size="invisible" verifyCallback={onVerify} />
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

const Loader = styled(({ loading, ...rest }) => <div {...rest} />)`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(253, 250, 250, 0.8);
  opacity: ${props => (props.loading ? 1 : 0)};
  pointer-events: ${props => (props.loading ? "all" : "none")};
  transition: ease all 0.2s;
`

export default GravityForm
