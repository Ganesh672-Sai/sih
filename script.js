document.addEventListener("DOMContentLoaded", () => {
  // ----------------- Chatbot Elements -----------------
  const chatToggle = document.getElementById("chatToggle");
  const chatBot = document.getElementById("chatBot");
  const closeChat = document.getElementById("closeChat");
  const sendBtn = document.getElementById("sendBtn");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const voiceBtn = document.getElementById("voiceBtn");

  // ----------------- Toggle Chatbot -----------------
  if (chatToggle) {
    chatToggle.addEventListener("click", () => {
      chatBot.style.display = "flex";
      chatToggle.style.display = "none";
    });
  }

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatBot.style.display = "none";
      chatToggle.style.display = "flex";
    });
  }

  // ----------------- Add Message -----------------
  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = sender === "user" ? "user-msg" : "bot-msg";
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // ----------------- Crop Recommendation Logic -----------------
  function getCropRecommendations(ph, moisture, previousCrop) {
    let recommendations = [];

    if (ph >= 6 && ph <= 7 && moisture >= 50) {
      recommendations.push("Rice", "Wheat", "Barley");
    } else if (ph < 6 && moisture >= 40) {
      recommendations.push("Maize", "Groundnut", "Soybean");
    } else if (ph > 7 && moisture < 40) {
      recommendations.push("Millets", "Pulses", "Chickpea");
    } else {
      recommendations.push("Sugarcane", "Cotton", "Sunflower");
    }

    // Remove previous crop if present
    if (previousCrop) {
      recommendations = recommendations.filter(crop => crop.toLowerCase() !== previousCrop.toLowerCase());
    }

    if (recommendations.length < 2) {
      recommendations.push("Vegetables", "Fruits");
    }

    return recommendations;
  }

  // ----------------- Bot Reply -----------------
  function botReply(message) {
    const msg = message.toLowerCase();

    // Greetings
    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! 👋 How can I assist with your farm today?";
    }

    // If user asks about crop recommendation with numbers
    const phMatch = msg.match(/ph\s*([0-9.]+)/);
    const moistureMatch = msg.match(/moisture\s*([0-9.]+)/);

    if (phMatch && moistureMatch) {
      const ph = parseFloat(phMatch[1]);
      const moisture = parseFloat(moistureMatch[1]);

      const recs = getCropRecommendations(ph, moisture, "");
      return `Based on pH ${ph} and moisture ${moisture}%, I recommend: ${recs.join(", ")} 🌾`;
    }

    // Keyword crop info
    if (msg.includes("rice")) return "Rice grows best in pH 6-7 and moisture ≥50%.";
    if (msg.includes("maize")) return "Maize grows best in pH < 6 and moderate moisture.";
    if (msg.includes("wheat")) return "Wheat thrives in pH 6-7 and 40–60% moisture.";

    return "I can help recommend crops! 🌱 Try asking like: 'Suggest crops for pH 6.5 and moisture 55%'.";
  }

  // ----------------- Send Button -----------------
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const userMsg = chatInput.value.trim();
      if (!userMsg) return;

      addMessage(userMsg, "user");
      chatInput.value = "";

      const reply = botReply(userMsg);
      addMessage(reply, "bot");
    });
  }

  // Press Enter to send
  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendBtn.click();
    });
  }

  // ----------------- Voice Input -----------------
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    if (voiceBtn) {
      voiceBtn.addEventListener("click", () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = function (event) {
          chatInput.value = event.results[0][0].transcript;
          sendBtn.click();
        };
      });
    }
  } else {
    if (voiceBtn) voiceBtn.style.display = "none";
  }
});
