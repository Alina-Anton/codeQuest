import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVC6121zKccA9mTw_O816vZRX_TTPqmFs",
  authDomain: "codequestsimulation.firebaseapp.com",
  projectId: "codequestsimulation",
  storageBucket: "codequestsimulation.firebasestorage.app",
  messagingSenderId: "569311879192",
  appId: "1:569311879192:web:5c93e33fc373141e05a36d",
  measurementId: "G-299TJ01MTS",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
