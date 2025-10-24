document.getElementById("complaintForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const complaint = document.getElementById("complaintText").value.trim();
  const responseMsg = document.getElementById("responseMsg");

  if (name && email && complaint) {
    // Simulate saving to database
    console.log("Complaint Submitted:", { name, email, complaint });

    responseMsg.textContent = "Thank you for your complaint. We’ll get back to you shortly.";
    this.reset();
  } else {
    responseMsg.textContent = "Please fill out all fields.";
    responseMsg.style.color = "red";
  }
});

document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  alert("Logged out successfully!");
  window.location.href = "login.html";
});