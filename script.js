document.getElementById("cropForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let ph = parseFloat(document.getElementById("ph").value);
  let moisture = parseInt(document.getElementById("moisture").value);
  let previousCrop = document.getElementById("previousCrop").value.trim().toLowerCase();
  let area = parseFloat(document.getElementById("area").value);

  let recommendation = "";

  if (ph >= 6 && ph <= 7 && moisture >= 50) {
    recommendation = "🌾 Best Crop: <b>Rice</b>";
  } else if (ph < 6) {
    recommendation = "🌽 Best Crop: <b>Maize</b>";
  } else if (ph > 7) {
    recommendation = "🥜 Best Crop: <b>Groundnut</b>";
  } else {
    recommendation = "🌿 Try <b>Pulses or Vegetables</b>";
  }

  if (previousCrop && recommendation.toLowerCase().includes(previousCrop)) {
    recommendation += "<br>⚠️ Avoid repeating the same crop!";
  }

  if (area && area > 0) {
    recommendation += `<br>✅ Estimated area: <b>${area} hectares</b>`;
  }

  document.getElementById("results").innerHTML = recommendation;
});
