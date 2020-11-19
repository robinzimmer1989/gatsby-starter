import mui from "../theme/mui"

export const breakpoints = {
  values: mui.breakpoints.values,
  up: {},
  down: {}
}

Object.keys(mui.breakpoints.values).map(key => {
  breakpoints.up[key] = mui.breakpoints.values[key] + "px"
  return null
})
Object.keys(mui.breakpoints.values).map(key => {
  breakpoints.down[key] = mui.breakpoints.values[key] - 1 + "px"
  return null
})

export default breakpoints
