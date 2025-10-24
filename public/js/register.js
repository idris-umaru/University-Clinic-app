// js/register.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (!firstName || !lastName || !dob || !email || !password || !confirmPassword) {
      alert("Please fill out all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        email,
        createdAt: new Date().toISOString(),
      });

      alert("Registration successful!");
      form.reset();

      // Redirect to login page (optional)
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
    }
  });
});
