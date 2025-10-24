// js/login.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("⚠️ Please fill in both fields.");
      return;
    }

    try {
      // Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      alert(`✅ Login successful! Welcome back, ${user.email}`);
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } catch (error) {
      console.error("Login error:", error);

      // Error handling for wrong credentials
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        alert("❌ Incorrect email or password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        alert("❌ No account found for this email. Please register first.");
      } else if (error.code === "auth/invalid-email") {
        alert("⚠️ Invalid email format.");
      } else {
        alert("⚠️ Login failed: " + error.message);
      }
    }
  });
});
