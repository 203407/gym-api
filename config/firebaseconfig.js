import { getStorage } from "firebase/storage";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGEINGSENDERID,
    appId: process.env.APPID
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage()





