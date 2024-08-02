import { getAuthToken, getAuthUserId } from "@/services/api"
import { useEffect, useState } from "react"

const useSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUserId, setCurrentUserId] = useState({})

  useEffect(() => {
    getAuthToken().then(token => {
      setIsLoggedIn(!!token)
    })

    getAuthUserId().then(user_id => {
      setCurrentUserId(user_id)
    })
  }, [])

  return {
    isLoggedIn,
    currentUserId,
  }
}

export default useSession