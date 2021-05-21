import firebase from "firebase/app";
import {useCallback, useRef, useState} from "react";

function useCommentList(postId) {
  const [error, setError] = useState(false)
  const [commentIds, setCommentIds] = useState([])
  const commentCallback = useRef()

  const start = useCallback(() => {
    if (!postId) {
      return
    }

    const unsubscribe = firebase.firestore()
      .collection("comments")
      .where("post", "==", postId)
      .orderBy("creationDate", "asc")
      .onSnapshot(querySnapshot => {
        console.debug("Updating comments.")
        setCommentIds(querySnapshot.docs.map(doc => {
          return doc.id
        }))
      }, error => {
        setError(true)
        console.error(error)
      })

    commentCallback.current = () => {
      console.debug("Unsubscribing from comments.")
      unsubscribe()
    }
  }, [postId])

  const stop = useCallback(() => {
    if (commentCallback.current) {
      commentCallback.current()
      commentCallback.current = null
    }
  }, [])

  return [
    commentIds,
    start,
    stop,
    error,
  ]
}

export default useCommentList