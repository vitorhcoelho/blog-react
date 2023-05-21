import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      debugger
      await updateProfile(user, { displayName: data.displayName });

      return user;
    } catch (error) {
      console.log(error.message)
      console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) systemErrorMessage = "Password needs minimum 6 characters";
      else if (error.message.includes("email-already")) systemErrorMessage = "E-mail already in used";
      else systemErrorMessage = "An error has occurred, please try again";

      setError(systemErrorMessage);
    }

    setLoading(false);
  }

  const logout = () => {
    checkIfIsCancelled()

    signOut(auth)
  }

  const login = async (data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError(false)

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {

      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found"
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong password"
      }

      setError(systemErrorMessage)
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  };

};  
