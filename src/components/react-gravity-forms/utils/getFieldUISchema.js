import React from "react"
import Parser from "html-react-parser"

const getFieldUISchema = field => {
  switch (field.type) {
    case "hidden":
      return {
        "ui:widget": "hidden"
      }

    case "email":
      return {
        "ui:widget": "email",
        "ui:description": field.description,
        "ui:placeholder": field.placeholder
      }

    case "number":
      return {
        "ui:widget": "updown",
        "ui:placeholder": field.placeholder
      }

    case "date":
      return {
        "ui:widget": "date",
        "ui:placeholder": field.placeholder
      }

    case "textarea":
      return {
        "ui:widget": "textarea",
        "ui:description": field.description,
        "ui:placeholder": field.placeholder,
        "ui:options": {
          rows: 3
        }
      }

    case "checkbox":
      return {
        "ui:widget": "checkboxes"
      }

    case "consent":
      return {
        "ui:widget": "checkboxes"
      }

    case "select":
      return {
        "ui:description": field.description
      }

    case "multiselect":
      return {
        "ui:description": field.description,
        "ui:widget": "checkboxes",
        "ui:options": {
          inline: true
        }
      }

    case "radio":
      return {
        "ui:widget": "radio",
        "ui:options": {
          inline: true
        }
      }

    case "html":
      return {
        "ui:widget": () => field.content && Parser(field.content)
      }

    case "section":
      return {
        "ui:widget": () => <p>{field.description}</p>
      }

    case "product":
      return {
        "ui:widget": () => <p />
      }

    case "quantity":
      return {
        "ui:widget": "updown",
        "ui:placeholder": field.placeholder
      }

    case "list":
      return {
        items: {
          "ui:emptyValue": ""
        }
      }

    case "fileupload":
      return {
        "ui:widget": "file",
        "ui:description": field.description,
        "ui:options": { accept: field.allowedExtensions }
      }

    default:
  }
}

export default getFieldUISchema
