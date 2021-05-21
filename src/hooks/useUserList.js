import {useCallback, useRef, useState} from "react";
import firebase from "firebase/app";

function useUserList() {
  const [error, setError] = useState(false)
  const [userIds, setUserIds] = useState([])
  const userCallback = useRef()

  const start = useCallback(() => {
    const unsubscribe = firebase.firestore()
      .collection("users")
      .orderBy("postCount", "desc")
      .limit(10)
      .onSnapshot(querySnapshot => {
        console.debug("Updating user list.")
        setUserIds(querySnapshot.docs.map(doc => doc.id))
      }, error => {
        setError(true)
        console.error(error)
      })

    userCallback.current = () => {
      console.debug("Unsubscribing from user list.")
      unsubscribe()
    }
  }, [])

  const stop = useCallback(() => {
    if (userCallback.current) {
      userCallback.current()
    }
  }, [])

  return [
    userIds,
    start,
    stop,
    error,
  ]
}

export default useUserList