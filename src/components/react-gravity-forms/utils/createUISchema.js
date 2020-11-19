import createPropertyName from "./createPropertyName"
import getFieldUISchema from "./getFieldUISchema"

const createUISchema = ({ formFields }) => {
  const schema = {}

  // If we use conditional logic new formFields are attached to the end of the form
  // unless we define the order manually
  const order = []

  formFields.forEach(field => {
    let { id } = field

    const fieldSchema = getFieldUISchema(field)
    const fieldName = createPropertyName(id)

    order.push(fieldName)

    schema[fieldName] = {
      classNames: `field--${field.size} field--${field.type} ${field.cssClass}`,
      ...fieldSchema
    }
  })

  return {
    ...schema,
    "ui:order": order
  }
}

export default createUISchema
