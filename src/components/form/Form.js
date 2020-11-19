import React, { useState } from "react"
import styled from "styled-components"
import Parser from "html-react-parser"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { Typography } from "@material-ui/core"

// import app components
import { Button } from "components"
import { GravityForm } from "components/react-gravity-forms"
import * as theme from "theme"

const Form = props => {
  const { formId, buttonText, hideTitle, hiddenFields, hidden, ...rest } = props

  // let { allGfForm } = useGravityData()
  // const form = allGfForm.nodes.find(o => +o.formId === +formId)

  const [success, setSuccess] = useState(null)

  const handleSuccess = message => {
    setSuccess(message)
  }

  return (
    <Container>
      <FormContainer component="div" {...rest}>
        {/* {!success && (
          <GravityForm
            hiddenFields={hiddenFields}
            hideTitle={hideTitle}
            form={form}
            onSuccess={handleSuccess}
            onRedirect={url => navigate(url)}
            reCaptcha={process.env.GATSBY_RECAPTCHA}
            button={
              <Button
                children={buttonText || form?.button?.text || "Submit"}
                aria-label="Submit Form"
                type="submit"
              />
            }
          />
        )} */}

        {success && (
          <Message success>
            <Typography
              children={Parser(success)}
              color="inherit"
              component="div"
            />
          </Message>
        )}
      </FormContainer>
    </Container>
  )
}

export default Form

const Container = styled.div``

const p = { ...theme.mui.typography.body1 }

const FormContainer = styled(Typography)`
  position: relative;

  .radio-buttons {
    .field-radio-group {
      display: flex;
      .radio-inline {
        > span {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          > span {
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            padding: 10px 25px;
            min-width: 125px;
            &:hover {
              background: #2c312c;
              color: white;
            }
          }
        }
      }
    }

    input[type="radio"] {
      display: none;
    }

    input[type="radio"] ~ span {
      background: #f2f2f2;
    }

    input[type="radio"]:checked ~ span {
      background: #00b040 !important;
      color: white !important;
    }

    .field-radio-group {
      display: flex;
      max-width: 500px;
      .radio-inline {
        margin-right: 20px;
      }
    }
  }

  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  legend {
    ${{ ...theme.mui.typography.h2 }};
    margin-bottom: 20px;
  }

  .required {
    display: none;
  }

  .form-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .field {
    width: 100%;
    margin-bottom: 25px;

    &--small {
    }

    &--medium {
      @media (min-width: 640px) {
        width: calc(50% - 10px);
      }
    }

    &--large {
      width: 100%;
    }

    &.fullwidth {
      width: 100%;
    }
  }

  .field.form_left {
    width: calc(50% - 10px);
  }

  .field-radio-group {
    display: flex;
    flex-wrap: wrap;
  }

  label {
    display: block;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .html {
    padding: 30px 0;

    label {
      display: none;
    }
  }

  .form-control {
    margin-bottom: 10px;
  }

  select,
  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="number"],
  textarea {
    position: relative;
    height: 62px;
    width: 100%;
    margin: 0;
    background: transparent;
    border: 1px solid #e5efef;
    appearance: none;
    border-radius: 0;
    box-shadow: none;
    outline: none;
    padding: 16px 20px;
    ${p}

    &:focus {
      border: 1px solid ${theme.colors.primary};
    }
  }

  select[multiple] {
    min-height: 200px;
  }

  .field--select {
    position: relative;

    &:before {
      content: "";
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid #ccd7de;
    }
  }

  .checkbox-inline,
  .radio-inline {
    > span {
      display: inline-block;
      margin-right: 15px;
    }

    > span > span {
      margin-left: 8px;
    }
  }

  .checkbox {
    > label {
      cursor: pointer;

      > span {
        display: inline-block;
        margin-right: 15px;
      }

      > span > span {
        margin-left: 8px;
      }
    }
  }

  textarea {
    height: auto;
    min-height: 150px;
    max-width: 100%;
    width: 100% !important;
  }

  .hide-asterix {
    .control-label {
      display: none;
    }
  }

  .grid {
    .checkboxes {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .checkbox {
      width: 33.3333%;
    }

    img {
      display: block;
      margin: 0 auto 20px;
      height: 200px;
      border: 1px solid #ccc;
    }
  }

  .btn-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
  }

  .btn-danger {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
    flex: none !important;
  }

  .btn {
    display: inline-block;
    padding: 6px 12px !important;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .glyphicon {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: "Glyphicons Halflings";
    font-style: normal;
    font-weight: 400;
    line-height: 1;
  }

  .glyphicon-plus:before {
    content: "+";
  }

  .glyphicon-remove:before {
    content: "x";
    color: #fff;
  }

  .panel.errors {
    display: none;
  }

  .error-detail {
    width: 100%;
    background: #e24141;
    color: #fff;
    padding: 5px 10px;
    margin-top: 10px;

    .text-danger {
      font-size: 14px;
      text-transform: uppercase;
    }
  }

  .field-object {
    margin-bottom: 0;
  }
`

const Message = styled.div`
  width: 100%;
  background: ${props =>
    props.success ? theme.colors.success : theme.colors.error};
  color: #fff;
  padding: 20px;
`

// const useGravityData = () => {
//   const { allGfForm } = useStaticQuery(
//     graphql`
//       query {
//         allGfForm {
//           nodes {
//             formId
//             title
//             slug
//             apiURL
//             labelPlacement
//             descriptionPlacement
//             formFields {
//               id
//               label
//               labelPlacement
//               isRequired
//               conditionalLogic
//               description
//               descriptionPlacement
//               type
//               choices
//               content
//               errorMessage
//               inputMaskValue
//               visibility
//               cssClass
//               placeholder
//               size
//               defaultValue
//               maxLength
//             }
//             button {
//               text
//             }
//             confirmations {
//               id
//               name
//               type
//               message
//             }
//           }
//         }
//       }
//     `
//   )
//   return { allGfForm }
// }
