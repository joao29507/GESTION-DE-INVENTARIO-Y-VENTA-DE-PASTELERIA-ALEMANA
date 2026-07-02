import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { 
    apiKey: "AIzaSyDcidI3Fn-9rn0hMHV-OGIZ5QhrMx3FehM", 
    authDomain: "gestion-de-pasteleria-alemana.firebaseapp.com", projectId: "gestion-de-pasteleria-alemana", 
    storageBucket: "gestion-de-pasteleria-alemana.firebasestorage.app", 
    messagingSenderId: "284431671778", 
    appId: "1:284431671778:web:a6d680329278a9685399bb" };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);