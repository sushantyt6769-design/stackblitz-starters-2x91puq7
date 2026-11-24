
const messages = document.getElementById("messages");
const messageInput = document.getElementById("message");
const welcome = document.getElementById("welcome");
const historyBox = document.getElementById("history");

let chatHistory = [];

function addMessage(text, sender) {
  const bubble = document.createElement("div");

  bubble.style.padding = "13px";
  bubble.style.margin = "12px 0";
  bubble.style.borderRadius = "12px";
  bubble.style.maxWidth = "85%";
  bubble.style.whiteSpace = "pre-wrap";
  bubble.style.overflowWrap = "anywhere";

  if (sender === "user") {
    bubble.style.background = "#382253";
    bubble.style.marginLeft = "auto";
  } else {
    bubble.style.background = "#191523";
    bubble.style.border = "1px solid #493064";
  }

  bubble.textContent = text;
  messages.appendChild(bubble);
}

async function sendMessage() {
  const text = messageInput.value.trim();

  if (!text) return;

  welcome.style.display = "none";
  addMessage(text, "user");

  chatHistory.push({ role: "user", content: text });
  messageInput.value = "";

  const loading = document.createElement("div");
  loading.textContent = "NexoraAI is thinking...";
  loading.style.padding = "12px";
  loading.style.color = "#b98cff";
  messages.appendChild(loading);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: chatHistory
      })
    });

    const data = await response.json();

    loading.remove();

    if (!response.ok) {
      throw new Error(data.error || "Chat request failed");
    }

    const reply = data.reply || "I couldn't generate a reply.";

    addMessage(reply, "ai");
    chatHistory.push({ role: "assistant", content: reply });

  } catch (error) {
    loading.remove();
    addMessage(
      "Connection error: " + error.message +
      "\nPlease check that the NexoraAI server is running.",
      "ai"
    );
  }
}

function newChat() {
  messages.innerHTML = "";
  messageInput.value = "";
  chatHistory = [];
  welcome.style.display = "block";
}

function voiceChat() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice typing is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    messageInput.value = event.results[0][0].transcript;
  };

  recognition.onerror = () => {
    alert("Voice recognition failed. Please try again.");
  };
}

// Make functions available to the HTML buttons
window.sendMessage = sendMessage;
window.newChat = newChat;
window.voiceChat = voiceChat;

// Press Enter to send; Shift + Enter for a new line
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});
