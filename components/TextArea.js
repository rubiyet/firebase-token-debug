import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

export default function TextArea({token}) {
  return (
    <div>
      <textarea
        value={token}
        className={`${styles.tokenbox} rounded border border-1`}
        readOnly
      />
    </div>
  );
}
