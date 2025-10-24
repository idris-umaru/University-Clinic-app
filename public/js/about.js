document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  alert("You have been logged out!");
  window.location.href = "login.html";
});