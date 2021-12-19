import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "fbase"
import { signOut } from "firebase/auth"

function App() {

  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const onLogout = async() => {
    await signOut(auth)
    setUserObj(null);
  }
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserObj({uid: uid})
        console.log(`유저 탐지(O)`)
        console.log(user)
        console.log("---------------------------------")
      } else {
        setUserObj(null)
      }
      setInit(true)
    });
  }, [])
  return (
    <div id="app">
      {init ? <AppRouter isLoggedIn={userObj !== null} onLogout={onLogout}/> : <h1> Initializing... </h1>}
      <footer>&copy; {new Date().getFullYear()} Jwitter</footer>
    </div>
  );
}

export default App;
