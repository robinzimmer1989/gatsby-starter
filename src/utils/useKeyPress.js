import { useEffect, useState } from "react"

const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = useState(false)

  // If pressed key is our target key then set to true
  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }


  useEffect(() => {
    const addRemoveEventListener = () => {
      if (typeof window !== "undefined") {
        window.addEventListener("keydown", downHandler)
        window.addEventListener("keyup", upHandler)
        return () => {
          window.removeEventListener("keydown", downHandler)
          window.removeEventListener("keyup", upHandler)
        }
      }
    }
    addRemoveEventListener()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return keyPressed
}

export default useKeyPress
