import produce from "immer"

export const appState = {
  menu: false
}

export const appReducer = (state, action) => {
  const { payload } = action

  return produce(state, draft => {
    switch (action.type) {
      case "SET_MENU":
        draft.menu = payload
        break

      case "TOGGLE_MENU":
        draft.menu = !draft.menu
        break

      default:
    }
  })
}
