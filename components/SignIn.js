import { useState, useEffect } from "react";
import { app } from "../config/firebase";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import styles from "../styles/Home.module.css";

export default function SignIn() {

  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();

  const handleSignUp = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("Token", response.user.accessToken);
      setToken(sessionStorage.getItem("Token"))
    } catch (error) {
      alert("email does not match");
    }
  };

  const handleClear = () => {
    sessionStorage.removeItem("Token");
    setToken("");
  }

  return (
    <>
    <div className="container">
    <div className="row">
    <div className="col">
    </div>
    <div className="col">
      <div className="d-flex justify-content-center pt-3">
        <div>
          <div className="pb-1"><span>username: </span>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded border border-1"
            />
          </div>
          <div className="pb-1"><span>Password: </span>
            <input
              type="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded border border-1"
            />
          </div>
          <div className="d-flex justify-content-evenly pb-1">
            <button
              type="submit"
              onClick={handleSignUp}
              className="rounded border border-1"
            >
              Sign In
            </button>
            <button
              type="submit"
              onClick={handleClear}
              className="rounded border border-1"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-start pt-3">
        <span>Token: </span>
      </div>
      <div className="d-flex justify-content-center pt-1">
        <div>
          <textarea
            value={token}
            className={`${styles.tokenbox} rounded border border-1`}
            readOnly
          />
        </div>
      </div>
      </div>
      <div className="col">
    </div>
  </div>
      </div>
    </>
  )
}
