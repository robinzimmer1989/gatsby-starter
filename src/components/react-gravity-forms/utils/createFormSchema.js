import createPropertyName from "./createPropertyName"
import getFieldSchema from "./getFieldSchema"

const getCombinations = array => {
  const results = [[]]
  for (const value of array) {
    const copy = [...results]
    for (const prefix of copy) {
      results.push(prefix.concat(value))
    }
  }
  return results
}

const createFormSchema = ({ formFields, title }) => {
  const required = []
  const properties = {},
    dependencies = {}

  formFields.forEach(field => {
    let { label, id, conditionalLogic } = field

    const fieldName = createPropertyName(id)
    const fieldSchema = getFieldSchema(field)

    const parsedConditionalLogic = JSON.parse(conditionalLogic)

    // check for conditional logic, because those formFields needs to be put into dependencies and not properties
    if (parsedConditionalLogic) {
      // here we map through all the rules inside the field (probably just working with one rule yet)
      // eslint-disable-next-line
      return parsedConditionalLogic.rules.map(o => {
        const dependencyFieldId = parseInt(o.fieldId)
        const dependencyFieldValue = o.value

        const dependencyFieldName = createPropertyName(dependencyFieldId)
        const dependencyField = formFields.find(p => p.id === dependencyFieldId)

        if (dependencyField.type === "radio" || dependencyField.type === "select") {
          // Check if field name is already registered as a dependency
          // because multiple formFields can be dependent on one field
          if (dependencies.hasOwnProperty(dependencyFieldName)) {
            // find option where enum value equals value in conditional prop for current field
            const index = dependencies[dependencyFieldName].oneOf.findIndex(q =>
              q.properties[dependencyFieldName].enum.includes(dependencyFieldValue)
            )
            // Then attach this field to the right enum value
            dependencies[dependencyFieldName].oneOf[index].properties[fieldName] = {
              title: field.labelPlacement === "hidden_label" ? " " : label,
              description: field.description || "",
              // default: field.defaultValue,
              ...fieldSchema
            }
            // Add required status in case field should be required
            field.isRequired && dependencies[dependencyFieldName].oneOf[index].required.push(fieldName)
          } else {
            let dependencyFieldRadioOptions = []

            // Loop trough all options choices and push dependency field as an option with enum = value
            // Add the conditional field in case the options value equals the value in conditional prop for current field. Otherwise create an empty object

            JSON.parse(dependencyField.choices).map(p => {
              const dependencyObject =
                p.value === dependencyFieldValue
                  ? {
                      [fieldName]: {
                        title: field.labelPlacement === "hidden_label" ? " " : label,
                        description: field.description || "",
                        // default: field.defaultValue,
                        ...fieldSchema
                      }
                    }
                  : {}

              const dependencyRequired = field.isRequired ? [fieldName] : []

              return dependencyFieldRadioOptions.push({
                properties: {
                  [dependencyFieldName]: {
                    enum: [p.value]
                  },
                  ...dependencyObject
                },
                required: dependencyRequired
              })
            })

            dependencies[dependencyFieldName] = {
              oneOf: dependencyFieldRadioOptions
            }
          }
        } else if (dependencyField.type === "checkbox") {
          // Check if field name is already registered as a dependency
          // because multiple formFields can be dependent on one field
          if (dependencies.hasOwnProperty(dependencyFieldName)) {
            // find option where enum value equals value in conditional prop for current field
            // eslint-disable-next-line
            dependencies[dependencyFieldName].oneOf.map((q, index) => {
              if (q.properties[dependencyFieldName].items.enum.includes(dependencyFieldValue)) {
                // Then attach this field to the right enum value
                dependencies[dependencyFieldName].oneOf[index].properties[fieldName] = {
                  title: field.labelPlacement === "hidden_label" ? " " : label,
                  description: field.description || "",
                  // default: field.defaultValue,
                  ...fieldSchema
                }
                // Add required status in case field should be required
                field.isRequired && dependencies[dependencyFieldName].oneOf[index].required.push(fieldName)
              }
            })
          } else {
            let dependencyFieldCheckboxOptions = []

            // Loop trough all options choices and push dependency field as an option with enum = value
            // Add the conditional field in case the options value equals the value in conditional prop for current field. Otherwise create an empty object

            const parsedDepencencyFieldChoices = JSON.parse(dependencyField.choices)
            const combinations = getCombinations(parsedDepencencyFieldChoices.map(o => o.value)).filter(
              o => o.length === 1
            )

            combinations.map(array => {
              if (array.includes(dependencyFieldValue)) {
                return dependencyFieldCheckboxOptions.push({
                  properties: {
                    [dependencyFieldName]: {
                      items: {
                        enum: array
                      }
                    },
                    [fieldName]: {
                      title: field.labelPlacement === "hidden_label" ? " " : label,
                      description: field.description || "",
                      // default: field.defaultValue,
                      ...fieldSchema
                    }
                  },
                  required: [fieldName]
                })
              } else {
                return dependencyFieldCheckboxOptions.push({
                  properties: {
                    [dependencyFieldName]: {
                      items: {
                        enum: array
                      }
                    }
                  }
                })
              }
            })

            dependencies[dependencyFieldName] = {
              oneOf: dependencyFieldCheckboxOptions
            }
          }
        }
      })
    } else {
      if (field.isRequired) {
        required.push(fieldName)
      }

      properties[fieldName] = {
        title: field.labelPlacement === "hidden_label" || field.label === "" ? " " : label,
        description: field.description || "",
        // default: field.defaultValue,
        ...fieldSchema
      }

      // Fileupload and checkboxes doesn't allow a default value so we have to check for this
      if (field.defaultValue && field.type !== "fileupload" && field.type !== "checkbox" && field.type !== "consent") {
        properties[fieldName]["default"] = field.defaultValue
      }

      if (!field.defaultValue && field.type === "select") {
        properties[fieldName]["default"] = JSON.parse(field.choices)[0].value
      }

      return properties
    }
  })

  const schema = {
    title: title,
    type: "object",
    required,
    properties,
    dependencies
  }

  return schema
}

export default createFormSchema
