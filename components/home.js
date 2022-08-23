import Header from "/components/Header";
import SignIn from "/components/SignIn";
import SignInWithPhone from "/components/SignInWithPhone";
import TextArea from "/components/TextArea";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const [token, setToken] = useState();
  const [hide, setHide] = useState(false);
  const [popOver, setPopOver] = useState(false);

  const showOption = () => {
    if (hide) {
      setHide(false);
      setToken("")
    } else {
      setHide(true);
      setToken("")
    }
  };

  const tokenCopy = (e) => {
    setPopOver(false);
    navigator.clipboard.writeText(token);
    setPopOver(true);
  };

  useEffect(() => {
    setInterval(() => {
      if (popOver == false) {
        setPopOver(true);
      }
      setPopOver(false);
    }, 5000);
  });

  return (
    <div>
      <Header />
      <div className={`container border border-1 rounded-bottom pt-5`}>
        <div className="row">
          <div className="col-6">
            <div className="d-flex justify-content-center">
              <span className="fw-semibold">(User) Email/Password</span> &emsp;
              <label className={`${styles.switch}`}>
                <input type="checkbox" onChange={showOption} />
                <span className={`${styles.sliderRound}`}></span>
              </label>{" "}
              &emsp;
              <span className="fw-semibold">Phone (Customer)</span>
            </div>
            <div className="p-4 d-flex justify-content-center">
              {hide ? (
                <SignInWithPhone token={(token) => setToken(token)} />
              ) : (
                <SignIn token={(token) => setToken(token)} />
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex">
              <span className="fw-semibold">Token</span>
              <div>
                <button
                  type="submit"
                  onClick={tokenCopy}
                  className="border border-0 bg-white"
                >
                  <Image
                    src="/copy.svg"
                    alt="logo"
                    width={15}
                    height={15}
                    className="rounded-md"
                  />
                </button>
              </div>
              {popOver ? "Token Copyed" : ""}
            </div>
            <TextArea token={token} />
          </div>
        </div>
      </div>
    </div>
  );
}
