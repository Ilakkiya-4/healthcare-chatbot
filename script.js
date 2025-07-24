let chatBox = document.getElementById("chat-box");
let input = document.getElementById("user-input");
let typingIndicator = null;
let faqData = [];

// Load questions and answers
fetch("faq.json")
  .then(res => res.json())
  .then(data => {
    faqData = data;
  });

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    let userText = input.value.trim();
    addMessage(userText, "user");
    input.value = "";

    showTyping();

    setTimeout(() => {
      hideTyping();
      let botReply = getBotReply(userText);
      addMessage(botReply, "bot");
    }, 1200);
  }
});

function addMessage(message, sender) {
  let msgDiv = document.createElement("div");
  msgDiv.className = sender === "user" ? "user-message" : "bot-message";
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  typingIndicator = document.createElement("div");
  typingIndicator.className = "bot-message typing";
  typingIndicator.textContent = "Typing...";
  chatBox.appendChild(typingIndicator);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
  if (typingIndicator) {
    typingIndicator.remove();
    typingIndicator = null;
  }
}

function getBotReply(userInput) {
  let inputLower = userInput.toLowerCase();
  for (let item of faqData) {
    for (let q of item.questions) {
      if (inputLower.includes(q.toLowerCase())) {
        return item.answer + " 😊";
      }
    }
  }
  return "Sorry, I couldn't find an answer to that. Please ask about inhalation issues like asthma or wheezing.";
}
