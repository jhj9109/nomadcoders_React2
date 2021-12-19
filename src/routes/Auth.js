import React, { useState } from "react";
import { auth, googleAuthProvider, githubAuthProvider } from "fbase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      console.log(name);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
        // 생성 완료 확인
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
      setError(err.message);
    }
  };
  const onSocialClick = (e) => {
    const providers = {
      google: googleAuthProvider,
      github: githubAuthProvider,
    };
    const provider = providers[e.target.name];

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // accessToken, auth, email, displayName, uid, ...
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "회원가입" : "로그인"} />
      </form>
      {error !== "" && <h1>{error}</h1>}
      <div>
        <button
          onClick={() => {
            setNewAccount((prev) => !prev);
          }}
        >
          Change Mode
        </button>
        <button name="google" onClick={onSocialClick}>
          Cotinue with Google
        </button>
        <button name="github" onClick={onSocialClick}>Cotinue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
