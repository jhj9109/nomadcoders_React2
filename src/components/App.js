import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const onLogout = async () => {
    await signOut(auth);
    setUserObj(null);
  };
  const detectUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // setUserObj({ uid: uid });
        setUserObj(user);
        console.log(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  };
  useEffect(detectUser, []);
  console.log(userObj);
  return (
    <div id="app">
      {init ? (
        <AppRouter
          isLoggedIn={userObj !== null}
          userObj={userObj}
          onLogout={onLogout}
        />
      ) : (
        <h1> Initializing... </h1>
      )}
      <footer>&copy; {new Date().getFullYear()} Jwitter</footer>
    </div>
  );
}

export default App;
