import { useCallback, useEffect, useState } from "react"

const useDimensions = (customMobileValue = 769) => {
  const hasWindow = typeof window !== "undefined"
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    if(hasWindow) {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
      setIsMobile(window.innerWidth < customMobileValue)
    }
  }, [customMobileValue, hasWindow])

  useEffect(() => handleResize(), [hasWindow, handleResize])

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [hasWindow, handleResize])

  return {
    width,
    height,
    isMobile,
  }
}

export default useDimensions