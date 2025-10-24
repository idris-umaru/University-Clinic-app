const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm"); 
const userInput = document.getElementById("userInput");

const responses = {
  "headache": "Stay hydrated, get enough rest, and avoid screen time. If it persists, book an appointment.",
  "fever": "Monitor your temperature, rest well, and drink fluids. Consider visiting a doctor if it lasts more than 2 days.",
  "cold": "Rest, stay warm, and drink warm fluids. You can also book an appointment for further advice.",
  "appointment": "To book an appointment, click the 'Book Appointment' page from the menu.",
  "default": "I'm here to help with health tips. Try asking about headache, fever, cold, or booking an appointment."
  
};

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage("You", message, "user");

  let reply = "default";
  for (let key in responses) {
    if (message.toLowerCase().includes(key)) {
      reply = key;
      break;
    }
  }

  setTimeout(() => {
    addMessage("Bot", responses[reply], "bot");
  }, 500);

  userInput.value = "";
});

function addMessage(sender, text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", type);
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("logoutBtn").addEventListener("click", function (e) {
  e.preventDefault();
  alert("Logged out successfully!");
  window.location.href = "login.html";
});