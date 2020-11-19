import { createPropertyName } from "."

const populateHiddenFields = (data, hiddenFields) => {
  if (hiddenFields && hiddenFields.length > 0) {
    hiddenFields.map(o => {
      const formField = createPropertyName(o.id)
      return (data.formData[formField] = o.content)
    })
  }

  return data
}

export default populateHiddenFields
