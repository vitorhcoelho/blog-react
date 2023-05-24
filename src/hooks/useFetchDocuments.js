import { db } from '../firebase/config'
import { collection, query, orderBy, onSnapshot, where, doc } from "firebase/firestore";

import React, { useEffect, useState } from 'react'

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState()

  const [cancelled, setCancelled] = useState()

  useEffect(() => {
    async function loadData() {
      if (cancelled) return

      setLoading(true)

      const collectionRef = await collection(db, docCollection)

      try {
        let q

        q = await query(collectionRef, orderBy("createdAt", "desc"))

        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            }))
          );
        });

        setLoading(false)


      } catch (error) {
        console.log(error)
        setError(error.message)
        setLoading(false)
      }
    }

    loadData()
  }, [docCollection, search, uid, cancelled])


  useEffect(() => {
    return () => { setCancelled(true) }
  }, [])


  return { documents, loading, error }
}
