const removeInvisibleFields = form => {
  const visibleFields = form.formFields.filter(o => o.visibility === "visible")

  const transformedForm = {
    ...form,
    formFields: visibleFields
  }

  return transformedForm
}

export default removeInvisibleFields
