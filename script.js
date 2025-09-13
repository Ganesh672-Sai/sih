document.addEventListener("DOMContentLoaded", () => {

  // ------------------ Chatbot Elements ------------------
  const chatToggle = document.getElementById("chatToggle");
  const chatBot = document.getElementById("chatBot");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const voiceBtn = document.getElementById("voiceBtn");

  // ------------------ Chatbot Toggle ------------------
  chatToggle.addEventListener("click", () => {
    chatBot.style.display = "flex";
    chatToggle.style.display = "none";
  });

  closeChat.addEventListener("click", () => {
    chatBot.style.display = "none";
    chatToggle.style.display = "block";
  });

  // ------------------ Add Message Function ------------------
  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "user-msg" : "bot-msg";
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // ------------------ Speech Synthesis ------------------
  function speak(text){
    if('speechSynthesis' in window){
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(text);
      synth.speak(utter);
    }
  }

  // ------------------ Bot Reply Logic ------------------
  function botReply(message){
    const msg = message.toLowerCase();

    if(msg.includes("hello") || msg.includes("hi")) 
      return "Hello! How can I assist with your farm today?";
    else if(msg.includes("crop") || msg.includes("recommendation")) 
      return "Use the crop recommendation form on your dashboard to get the best crops for your farm.";
    else if(msg.includes("rice")) 
      return "Rice grows best in pH 6-7 and moisture >=50%.";
    else if(msg.includes("maize")) 
      return "Maize grows best in pH < 6 and moderate moisture.";
    else 
      return "I am here to help you with farming queries 🌾.";
  }

  // ------------------ Send Message ------------------
  sendBtn.addEventListener("click", () => {
    const userMsg = chatInput.value.trim();
    if(userMsg === "") return;

    addMessage(userMsg, "user");
    chatInput.value = "";

    const reply = botReply(userMsg);
    addMessage(reply, "bot");
    speak(reply);
  });

  // Enter key sends message
  chatInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendBtn.click();
  });

  // ------------------ Voice Input ------------------
  if('SpeechRecognition' in window || 'webkitSpeechRecognition' in window){
    voiceBtn.addEventListener("click", () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.start();
      recognition.onresult = function(event){
        chatInput.value = event.results[0][0].transcript;
        sendBtn.click();
      };
    });
  } else {
    voiceBtn.style.display = "none";
  }

});
document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chatToggle");
  const chatBot = document.getElementById("chatBot");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const voiceBtn = document.getElementById("voiceBtn");

  // Open chatbot
  chatToggle.addEventListener("click", () => {
    chatBot.style.display = "flex";
    chatToggle.style.display = "none";
  });

  // Close chatbot
  closeChat.addEventListener("click", () => {
    chatBot.style.display = "none";
    chatToggle.style.display = "flex";
  });

  // Add messages
  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "user-msg" : "bot-msg";
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function botReply(message){
    const msg = message.toLowerCase();
    if(msg.includes("hello") || msg.includes("hi")) return "Hello! How can I assist with your farm today?";
    if(msg.includes("crop") || msg.includes("recommendation")) return "Use the crop recommendation form on your dashboard to get the best crops for your farm.";
    if(msg.includes("rice")) return "Rice grows best in pH 6-7 and moisture >=50%.";
    if(msg.includes("maize")) return "Maize grows best in pH < 6 and moderate moisture.";
    return "I am here to help you with farming queries 🌾.";
  }

  sendBtn.addEventListener("click", () => {
    const userMsg = chatInput.value.trim();
    if(!userMsg) return;
    addMessage(userMsg, "user");
    chatInput.value = "";
    const reply = botReply(userMsg);
    addMessage(reply, "bot");
  });

  chatInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendBtn.click();
  });
});
<script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
