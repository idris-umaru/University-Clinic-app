// dashboard.js

document.addEventListener("DOMContentLoaded", () => {
  // Book Appointment
  const bookBtn = document.getElementById("bookBtn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      window.location.href = "appointment.html";
    });
  }

  // Generate Report
  const reportBtn = document.getElementById("reportBtn");
  if (reportBtn) {
    reportBtn.addEventListener("click", () => {
      alert("Generating report... (you can replace this with PDF download logic)");
    });
  }

  // View Available Doctors
  const viewDoctorsBtn = document.getElementById("viewDoctorsBtn");
  if (viewDoctorsBtn) {
    viewDoctorsBtn.addEventListener("click", () => {
      window.location.href = "doctors.html"; // Replace with actual page
    });
  }

  // Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      alert("Logged out successfully");
      window.location.href = "login.html"; // Update this if your login page is different
    });
  }
});