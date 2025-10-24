import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("appointmentForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const statusMessage = document.getElementById("statusMessage");
  const fullnameInput = document.getElementById("fullname");

  // Protect the page — redirect to login if not logged in
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    // Try to prefill full name
    if (user.displayName) {
      fullnameInput.value = user.displayName;
    } else {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          const fullName = [data.firstName, data.middleName, data.lastName]
            .filter(Boolean)
            .join(" ");
          fullnameInput.value = fullName || user.email;
        } else {
          fullnameInput.value = user.email;
        }
      } catch (err) {
        console.error("Name fetch failed:", err);
        fullnameInput.value = user.email;
      }
    }
  });

  // Handle appointment submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusMessage.textContent = "";
    statusMessage.style.color = "";

    const name = fullnameInput.value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const doctor = document.getElementById("doctor").value;

    if (!name || !date || !time || !doctor) {
      statusMessage.textContent = "⚠️ Please fill in all fields.";
      statusMessage.style.color = "red";
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      statusMessage.textContent = "⚠️ Session expired. Please login again.";
      statusMessage.style.color = "red";
      setTimeout(() => (window.location.href = "login.html"), 1500);
      return;
    }

    try {
      statusMessage.textContent = "⏳ Booking appointment...";
      statusMessage.style.color = "blue";

      await addDoc(collection(db, "appointments"), {
        name,
        date,
        time,
        doctor,
        userId: user.uid,
        email: user.email || null,
        createdAt: serverTimestamp()
      });

      statusMessage.textContent = `✅ Appointment booked with ${doctor} on ${date} at ${time}.`;
      statusMessage.style.color = "green";
      form.reset();
    } catch (err) {
      console.error("Error booking appointment:", err);
      statusMessage.textContent = "❌ Failed to book appointment. Please try again.";
      statusMessage.style.color = "red";
    }
  });

  // Handle logout
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      await signOut(auth);
      alert("You have been logged out successfully.");
      window.location.href = "login.html";
    } catch (err) {
      console.error("Logout error:", err);
      alert("Error logging out. Please try again.");
    }
  });
});
