import React, { createContext, useContext, useReducer } from "react"

import { appState, appReducer } from "./appState"

export const StateContext = createContext({})

export const StoreProvider = props => {
  const initialState = {
    appState
  }

  const reducer = ({ appState }, action) => ({
    appState: appReducer(appState, action)
  })

  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {props.children}
    </StateContext.Provider>
  )
}

export const useStore = () => useContext(StateContext)
