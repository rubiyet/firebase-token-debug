import styles from "../styles/Header.module.css";
import Image from "next/image";

export default function header() {
    return (
        <>
            <div  className={`${styles.navBar} container d-flex align-items-center justify-content-between p-4`}>
                <div className="d-flex align-items-center"><Image src="/firebaseLogo.png" alt="" width={40} height={35} /><span className="text-white">Firebase Token Debug</span></div>
            </div>
        </>
    )
}
