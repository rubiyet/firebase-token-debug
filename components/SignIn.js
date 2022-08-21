import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../config/firebase";
import Image from "next/image";

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      sessionStorage.setItem("Token", response.user.accessToken);
      //setToken(response.user.accessToken);
      props.token(response.user.accessToken);
    } catch (error) {
      alert("email does not match");
    }
  };

  const handleClear = () => {
    sessionStorage.removeItem("Token");
    //setToken("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="row pt-4">
        <div className="col-5 d-flex justify-content-end pb-3">
          <span>Email:</span>
        </div>
        <div className="col-7">            
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border-0 border-bottom"
          />
        </div>
        <div className="col-5 d-flex justify-content-end pb-3">
          <span>Password:</span>
        </div>
        <div className="col-7">            
          <input
            type="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border-0 border-bottom"
          />
        </div>
        <div className="col-3"></div>
        <div className="col-9 d-flex justify-content-evenly">
            <button
              type="submit"
              onClick={handleSignUp}
              className="rounded border border-1 btn btn-success text-white"
            >
              Sign In
            </button>
            <button
              type="submit"
              onClick={handleClear}
              className="rounded border border-1 btn btn-success text-white"
            >
              Clear
            </button>
          </div>
  </div>
    </>
  );
}
