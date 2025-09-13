document.addEventListener("DOMContentLoaded", () => {

  // ------------------ Crop Recommendation ------------------
  const cropForm = document.getElementById("cropForm");
  const resultsDiv = document.getElementById("results");
  const dashCrop = document.getElementById("dashCrop");

  if (cropForm) {
    cropForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const ph = parseFloat(document.getElementById("ph").value);
      const moisture = parseInt(document.getElementById("moisture").value);
      const previousCrop = document.getElementById("previousCrop").value.trim().toLowerCase();
      const area = parseFloat(document.getElementById("area").value);

      let recommendation = "";

      if(ph >=6 && ph <=7 && moisture >=50) recommendation = "🌾 Best Crop: Rice";
      else if(ph < 6) recommendation = "🌽 Best Crop: Maize";
      else if(ph > 7) recommendation = "🥜 Best Crop: Groundnut";
      else recommendation = "🌿 Try Pulses or Vegetables";

      if(previousCrop && recommendation.toLowerCase().includes(previousCrop)) {
        recommendation += " | ⚠️ Avoid repeating the same crop!";
      }

      if(area && area > 0) {
        recommendation += ` | ✅ Estimated area: ${area} hectares`;
      }

      resultsDiv.innerHTML = recommendation;

      if(dashCrop) dashCrop.innerText = recommendation;
    });
  }

  // ------------------ Chatbot ------------------
  const chatToggle = document.getElementById("chatToggle");
  const chatBot = document.getElementById("chatBot");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const voiceBtn = document.getElementById("voiceBtn");

  chatToggle?.addEventListener("click", () => {
    chatBot.style.display = "flex";
    chatToggle.style.display = "none";
  });
  closeChat?.addEventListener("click", () => {
    chatBot.style.display = "none";
    chatToggle.style.display = "block";
  });

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "user-msg" : "bot-msg";
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function speak(text){
    if('speechSynthesis' in window){
      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(text);
      synth.speak(utter);
    }
  }

  function botReply(message){
    const msg = message.toLowerCase();
    if(msg.includes("hello") || msg.includes("hi")) return "Hello! How can I assist with your farm today?";
    else if(msg.includes("crop") || msg.includes("recommendation")) return "Use the crop recommendation form on your dashboard to get the best crops for your farm.";
    else if(msg.includes("rice")) return "Rice grows best in pH 6-7 and moisture >=50%.";
    else if(msg.includes("maize")) return "Maize grows best in pH < 6 and moderate moisture.";
    else return "I am here to help you with farming queries 🌾.";
  }

  sendBtn?.addEventListener("click", () => {
    const userMsg = chatInput.value.trim();
    if(userMsg === "") return;

    addMessage(userMsg, "user");
    chatInput.value = "";

    const reply = botReply(userMsg);
    addMessage(reply, "bot");
    speak(reply);
  });

  chatInput?.addEventListener("keypress", (e) => {
    if(e.key === "Enter") sendBtn.click();
  });

  if('SpeechRecognition' in window || 'webkitSpeechRecognition' in window){
    voiceBtn?.addEventListener("click", () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.start();
      recognition.onresult = function(event){
        chatInput.value = event.results[0][0].transcript;
        sendBtn.click();
      };
    });
  } else {
    voiceBtn?.style.display = "none";
  }

});
