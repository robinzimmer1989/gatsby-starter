import { useState, useEffect } from "react"
import isBrowser from "./isBrowser"

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(
    isBrowser ? { width: window?.innerWidth, height: window?.innerHeight } : {}
  )

  useEffect(() => {
    if (!isBrowser) {
      return false
    }

    function handleResize() {
      setWindowSize({ width: window?.innerWidth, height: window?.innerHeight })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Effect is only run on mount and unmount

  return windowSize
}
export default useWindowSize
