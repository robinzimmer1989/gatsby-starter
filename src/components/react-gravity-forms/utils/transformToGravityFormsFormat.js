import { createPropertyName } from "."

const transformToGravityFormsFormat = (form, data) => {
  // We have to transform list formFields to make them work with the GF Rest API
  // On default the return value is an array of objects, but GF only accepts ONE array with values
  // eslint-disable-next-line
  form.formFields.map(o => {
    const formField = createPropertyName(o.id)

    if (data.formData[formField]) {
      if (o.type === "text") {
        // Strip out HTML tags
        data.formData[formField] = data.formData[formField].replace(/(<([^>]+)>)/gi, "")
      }

      if (o.type === "consent") {
        data.formData[`${formField}_1`] = data.formData[formField] ? "yes" : "no"
        delete data.formData[formField]
      }

      if (o.type === "checkbox") {
        if (data.formData[formField] && data.formData[formField].length > 0) {
          JSON.parse(o.choices).map((p, i) => {
            if (data.formData[formField].includes(p.value)) {
              data.formData[`${formField}_${i + 1}`] = p.value
            }

            return data
          })

          delete data.formData[formField]
        }
      }

      if (o.type === "list") {
        if (data.formData[formField].length > 0) {
          let array = []
          // Loop trough entries of list field
          // eslint-disable-next-line
          data.formData[formField].map(p => {
            // loop trough columns of list field
            return o.choices.map(q => array.push(p[q.value]))
          })
          data.formData[formField] = array
        }
      }
    }
  })

  return data
}

export default transformToGravityFormsFormat
