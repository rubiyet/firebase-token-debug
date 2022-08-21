import { useState, useEffect } from "react";

export default function SignInWithPhone() {

    const countyCode = "+88";
    const [phoneNumber, setPhoneNumber] = useState(countyCode);
    const [expandOtp, setExpandOtp] = useState(false);

    const requestOtp = (e) => {
        e.preventDefault()
        if (phoneNumber.length >= 12) {
            setExpandOtp(true);
        }
    }

    return (
        <>
            <div className="pb-1"><span>username: </span>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    className="rounded border border-1"
                />
            </div>
            {expandOtp ? <div className="pb-1"><span>username: </span>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="rounded border border-1"
                />
            </div> :
                <button
                    type="submit"
                    // onClick={handleSignUp}
                    className="rounded border border-1 bg-primary text-white"
                >
                    Sign In
                </button>}
        </>
    )
}