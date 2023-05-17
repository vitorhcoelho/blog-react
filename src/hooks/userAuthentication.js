import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState, useEffect } from 'react'

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  //cleanup
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  const createUser = async (data) => {
    checkIfIsCancelled()

    setLoading(true)

    try {
      const { user } = createUserWithEmailAndPassword(auth, data.email, data.password)

      await updateProfile(user, { displayName: data.displayName });

      return user;
    } catch (error) {

      console.log(error.message)

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "Password needs minimum 6 characters";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail already used";
      } else {
        systemErrorMessage = "An error has occurred, please try again";
      }

      setError(systemErrorMessage);
    }

    setLoading(false)
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {
    auth,
    createUser,
    error,
    loading
  };

};  
