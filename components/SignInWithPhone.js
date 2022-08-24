import { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../config/firebase";
import styles from "../styles/Home.module.css";
import TextArea from "./TextArea";

export default function SignInWithPhone(props) {
  const [countyCode, setCountyCode] = useState("+88");
  const [phoneNumber, setPhoneNumber] = useState();
  const [countyCodeIWithPhoneNumber, setCountyCodeIWithPhoneNumber] =
    useState();
  const [expandOtp, setExpandOtp] = useState(false);
  const [OTP, setOTP] = useState();
  const [token, setToken] = useState();

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  const requestOtp = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      setExpandOtp(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(
        authentication,
        countyCode,
        appVerifier
      )
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          // Error; SMS not sent
          console.log(error);
        });
    }
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
  };

  const SignIn = () => {
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(OTP).then((result) => {
          const accessToken = result.user.accessToken;
          sessionStorage.setItem("Token", accessToken);
          setToken(accessToken);
          props.token(accessToken);
        });
  }

  // useEffect(() => {
  //   setCountyCodeIWithPhoneNumber(countyCode + phoneNumber);
  // },[countyCode,phoneNumber]);

  return (
    <>
      <div className="row pt-4">
        <div className="col-4 d-flex justify-content-end pb-3">
          <span>Phone:</span>
        </div>
        {/* <div className="col-2 d-flex justify-content-end pb-3">
          <input
            type="tel"
            onChange={(e) => setCountyCode(e.target.value)}
            value={countyCode}
            className={`${styles.countryCodeBox} border-0 border-bottom`}
          />
        </div> */}
        <div className="col-6">
          <input
            type="tel"
            placeholder="Phone"
            onChange={(e) => setCountyCode(e.target.value)}
            value={countyCode}
            className="border-0 border-bottom"
          />
        </div>
        <div className="col-4 d-flex justify-content-end pb-3">{expandOtp ? "OTP:": ""}</div>
        <div className="col-2 d-flex justify-content-end pb-3">
            {expandOtp ? (
              <input
                type="text"
                placeholder="OTP"
                onChange={verifyOTP}
                value={OTP}
                className={`${styles.otpBox} border-0 border-bottom`}
              />
          ) : ""}
        </div>
        <div className="col-6">
        </div>
        <div className="col-6">
        </div>
        <div className="col-6">
          {expandOtp ? (
            <button
              type="submit"
              onClick={SignIn}
              className="rounded border border-1 btn btn-success text-white"
            >
              Sign In
            </button>
          ) : (
            <button
              type="submit"
              onClick={requestOtp}
              className="rounded border border-1 btn btn-success text-white"
            >
              OTP Request
            </button>
          )}
        </div>
      </div>
      <div className="" id="recaptcha-container"></div>
    </>
  );
}
