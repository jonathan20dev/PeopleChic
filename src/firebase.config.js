import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAsWIKJiJr3pUJ-hW0neI_Pji4sgI13SOY",
  authDomain: "peoplechic-50811.firebaseapp.com",
  projectId: "peoplechic-50811",
  storageBucket: "peoplechic-50811.appspot.com",
  messagingSenderId: "855436550207",
  appId: "1:855436550207:web:232e0e42c15e8994d7188a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
export default app