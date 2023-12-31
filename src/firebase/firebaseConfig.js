import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "admin-coreui-signin.firebaseapp.com",
    projectId: "admin-coreui-signin",
    storageBucket: "admin-coreui-signin.appspot.com",
    messagingSenderId: "710268703287",
    appId: "1:710268703287:web:694b265e4a93d1fb81e5b2",
    measurementId: "G-48C9M3EWFT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);