document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cropForm");
  const resultsDiv = document.getElementById("results");
  const dashCrop = document.getElementById("dashCrop");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const ph = parseFloat(document.getElementById("ph").value);
    const moisture = parseFloat(document.getElementById("moisture").value);
    const previousCrop = document.getElementById("previousCrop").value.toLowerCase();
    const area = parseFloat(document.getElementById("area").value);

    let recommendations = [];

    // --- Rule-based Crop Recommendation System ---
    if (ph >= 6 && ph <= 7 && moisture >= 50) {
      recommendations.push("Rice", "Wheat", "Barley");
    } 
    else if (ph < 6 && moisture >= 40) {
      recommendations.push("Maize", "Groundnut", "Soybean");
    } 
    else if (ph > 7 && moisture < 40) {
      recommendations.push("Millets", "Pulses", "Chickpea");
    } 
    else {
      recommendations.push("Sugarcane", "Cotton", "Sunflower");
    }

    // Remove the previous crop if it is in recommendations
    recommendations = recommendations.filter(crop => crop.toLowerCase() !== previousCrop);

    // Ensure at least 2 recommendations
    if (recommendations.length < 2) {
      recommendations.push("Vegetables", "Fruits");
    }

    // Show in results section
    resultsDiv.innerHTML = `<h4>Recommended Crops:</h4>
      <ul>${recommendations.map(crop => `<li>${crop}</li>`).join("")}</ul>`;

    // Update dashboard
    dashCrop.innerText = recommendations.join(", ");
  });
});
