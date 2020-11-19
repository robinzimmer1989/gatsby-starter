const submitForm = async (data, apiURL) => {
  if (!data) return

  // console.log(data.formData)

  const endpoint = apiURL + "/submissions"

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data.formData)
  })

  const json = await result.json()

  return json
}

export default submitForm
