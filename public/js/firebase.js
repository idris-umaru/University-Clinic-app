// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: ",
  authDomain: "campus-app-with-intelligentbot.firebaseapp.com",
  projectId: "campus-app-with-intelligentbot",
  storageBucket: "campus-app-with-intelligentbot.firebasestorage.app",
  messagingSenderId: "128353567361",
  appId: "1:128353567361:web:6e2f2b04d5f0f62749c380",
  measurementId: "G-07XT7V3BF2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export these so other files can use Firebase
export { app, auth, db, storage };
