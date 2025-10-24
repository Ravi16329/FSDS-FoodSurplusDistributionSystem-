// Mark donation as collected
function markCollected(index) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  donations[index].isCollected = true;
  localStorage.setItem("donations", JSON.stringify(donations));
  displayDonors();
}

// Open Google Maps for the given address
function navigateToLocation(address) {
  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  window.open(mapsUrl, "_blank");
}

// Pickup request alert (can be extended to backend later)
function pickupRequest(address) {
  alert(`📦 Pickup request sent for location: ${address}`);
}

// Display all donors
function displayDonors() {
  const donorContainer = document.getElementById("donorContainer");
  donorContainer.innerHTML = ""; // Clear previous content

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
              <div class="d-flex flex-wrap gap-2 mt-2">
                <button class="btn btn-outline-info btn-sm" style="margin-left:10px;"
                  onclick="navigateToLocation('${donation.donorAddress}')">
                  Navigate
                </button>
                <button class="btn btn-success btn-sm" onclick="markCollected(${index})" style="margin-left:40px;">
                  Mark as Collected
                </button>
              </div>

              <div class="mt-3">
                <button id="pickuprequst" class="btn btn-sm btn-primary w-100" 
                  onclick="pickupRequest('${donation.donorAddress}')">
                  PickUp Request
                </button>
              </div>
            `
        }
      </div>
    `;

    donorContainer.appendChild(donorCard);
  });
}

// Initialize display on page load
document.addEventListener("DOMContentLoaded", displayDonors);
