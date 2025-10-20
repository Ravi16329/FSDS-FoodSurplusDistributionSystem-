function markCollected(index) {
  // Load data
  let donations = JSON.parse(localStorage.getItem("donations")) || [];

  // Update the selected donation status
  donations[index].isCollected = true;

  // Save back to localStorage
  localStorage.setItem("donations", JSON.stringify(donations));

  // Refresh UI
  displayDonors();
}

function navigateToLocation(address) {
  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  window.open(mapsUrl, "_blank");
}

function displayDonors() {
  const donorContainer = document.getElementById("donorContainer");
  donorContainer.innerHTML = ""; // Clear old data

  const donations = JSON.parse(localStorage.getItem("donations")) || [];

  donations.forEach((donation, index) => {
    const donorCard = document.createElement("div");
    donorCard.classList.add("col-md-4", "mb-4");

    donorCard.innerHTML = `
      <div class="donor-card p-4 ${donation.isCollected ? 'collected' : ''}">
        <span class="distance-badge">Nearby</span>
        <h5>${donation.donorName}</h5>
        <p><i class="fas fa-utensils"></i> ${donation.foodType}</p>
        <p><i class="fas fa-users"></i> Feeds ${donation.peopleCount} people</p>
        <p><i class="fas fa-map-marker-alt"></i> ${donation.donorAddress}</p>

        ${
          donation.isCollected
            ? `<p class="text-danger fw-bold">❌ Food Already Collected</p>`
            : `
              <button class="btn btn-success btn-sm me-2" onclick="markCollected(${index})">
                Mark as Collected
              </button>
              <button class="btn btn-primary btn-sm" onclick="navigateToLocation('${donation.donorAddress}')">
                Navigate
              </button>
            `
        }
      </div>
    `;

    donorContainer.appendChild(donorCard);
  });
}

document.addEventListener("DOMContentLoaded", displayDonors);
