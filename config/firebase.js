import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBh1WzGe3_mytkvP1GiYSEKhsAtvIIiHRE",
  authDomain: "hellotask-v3.firebaseapp.com",
  projectId: "hellotask-v3",
  storageBucket: "hellotask-v3.appspot.com",
  messagingSenderId: "1014811874297",
  appId: "1:1014811874297:web:029d185cb37c1dd3efa328",
  measurementId: "G-KECDEWSXB6"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);