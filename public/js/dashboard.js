import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const appointmentsList = document.getElementById("appointmentsList");
  const appointmentCount = document.getElementById("appointmentCount");

  // Listen for authentication state
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("You must be logged in to view the dashboard.");
      window.location.href = "login.html";
      return;
    }

    // Display basic user info
    welcomeMessage.textContent = `Welcome back, ${user.email} 👋`;
    userName.textContent = user.displayName || "User";
    userEmail.textContent = user.email;

    // Real-time listener for user appointments
    const q = query(
      collection(db, "appointments"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      appointmentsList.innerHTML = "";
      if (snapshot.empty) {
        appointmentsList.innerHTML = `<p>No appointments found.</p>`;
        appointmentCount.textContent = "0";
        return;
      }

      appointmentCount.textContent = snapshot.size;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement("div");
        card.classList.add("appointment-card");
        card.innerHTML = `
          <h3>Doctor: ${data.doctor}</h3>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Name:</strong> ${data.name}</p>
        `;
        appointmentsList.appendChild(card);
      });
    });
  });

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        alert("✅ You’ve been logged out successfully.");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Logout error:", error);
        alert("❌ Error logging out. Try again.");
      }
    });
  }
});
