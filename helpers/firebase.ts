import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  //   apiKey: "AIzaSyClDXWMCEVWQuamBLVKnQdXG1n4PlpiJFs",
  //   authDomain: "service-link-d7b4e.firebaseapp.com",
  //   projectId: "service-link-d7b4e",
  //   storageBucket: "service-link-d7b4e.firebasestorage.app",
  //   messagingSenderId: "849305888050",
  //   appId: "1:849305888050:web:f9e38748c2c47e22aaa32b",
  //   databaseURL: "https://service-link-d7b4e-default-rtdb.firebaseio.com", // Add this if you have Realtime Database

  apiKey: "AIzaSyANDkgsi4Et3C0XnED9DUaNzEoMC2_ncgU",
  authDomain: "pawsbook-c2547.firebaseapp.com",
  projectId: "pawsbook-c2547",
  storageBucket: "pawsbook-c2547.firebasestorage.app",
  messagingSenderId: "603172832396",
  appId: "1:603172832396:web:e9307248112a3fcac827a9",
  databaseURL: "https://pawsbook-c2547-default-rtdb.firebaseio.com", // Add this if you have Realtime Database
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db: Firestore = getFirestore(app);

export { auth, db };
