export default error => {
  switch (error) {
    case "invalid_username":
      return "Invalid username and password."

    case "incorrect_password":
      return "Invalid username and password."

    default:
      return error
  }
}
