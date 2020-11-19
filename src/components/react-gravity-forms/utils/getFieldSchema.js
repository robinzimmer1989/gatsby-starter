import Parser from "html-react-parser"

const getFieldSchema = field => {
  switch (field.type) {
    case "number":
      return {
        type: "integer",
        minimum: +field.rangeMin,
        maximum: +field.rangeMax
      }

    case "phone":
      return {
        type: "string",
        format: "###-###-####"
      }

    case "email":
      return {
        type: "string",
        format: "email"
      }

    case "website":
      return {
        type: "string",
        format: "uri"
      }

    case "date":
      return {
        type: "string",
        format: "date"
      }

    case "checkbox":
      return {
        type: "array",
        minItems: field.isRequired ? 1 : 0,
        items: {
          type: "string",
          enum: JSON.parse(field.choices).map(o => Parser(o.value)),
          enumNames: JSON.parse(field.choices).map(o => Parser(o.text))
        },

        uniqueItems: true,
        default: []
      }

    case "consent":
      return {
        type: "array",
        minItems: field.isRequired ? 1 : 0,
        items: {
          type: "string",
          enum: ["1"],
          enumNames: [field.checkboxLabel]
        },
        uniqueItems: true,
        default: []
      }

    case "radio":
      return {
        type: "string",
        enum: JSON.parse(field.choices).map(o => Parser(o.value)),
        enumNames: JSON.parse(field.choices).map(o => Parser(o.text))
      }

    case "select":
      return {
        type: "string",
        enum: JSON.parse(field.choices).map(o => o.value),
        enumNames: JSON.parse(field.choices).map(o => Parser(o.text))
      }

    case "multiselect":
      return {
        type: "array",
        items: {
          type: "string",
          enum: JSON.parse(field.choices).map(o => o.value),
          enumNames: JSON.parse(field.choices).map(o => Parser(o.text))
        },
        minItems: 0,
        uniqueItems: true,
        default: []
      }

    case "html":
      return {
        type: "string"
      }

    case "section":
      return {
        type: "string"
      }

    case "product":
      return {
        type: "string"
      }

    case "quantity":
      return {
        type: "integer",
        minimum: +field.rangeMin,
        maximum: +field.rangeMax
      }

    case "list":
      let listFields = {}
      field.choices.map(o => {
        return (listFields[o.text] = {
          type: "string"
        })
      })

      return {
        type: "array",
        items: {
          type: "object",
          properties: {
            ...listFields
          }
        }
      }

    case "fileupload":
      return {
        type: "string",
        format: "data-url"
      }

    default:
      return {
        type: "string"
      }
  }
}

export default getFieldSchema
