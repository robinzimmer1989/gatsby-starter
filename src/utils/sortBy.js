const sortBy = (array, param, direction = "desc") => {
  let x, y
  if (direction === "desc") {
    x = 1
    y = -1
  } else {
    x = -1
    y = 1
  }

  array.sort((a, b) => (a[param] < b[param] ? x : b[param] < a[param] ? y : 0))
}

export default sortBy
