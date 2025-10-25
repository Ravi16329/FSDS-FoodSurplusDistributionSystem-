// ✅ Mark donation as collected (unchanged)
function markCollected(index) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  donations[index].isCollected = true;
  localStorage.setItem("donations", JSON.stringify(donations));
  displayDonors();
}

// ✅ Open Google Maps for donor location (unchanged)
function navigateToLocation(address) {
  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  window.open(mapsUrl, "_blank");
}

// ✅ Pickup Request — UPDATED FUNCTIONALITY
function pickupRequest(index) {
  let donations = JSON.parse(localStorage.getItem("donations")) || [];
  const donation = donations[index];

  const userName = prompt("Enter your name:");
  const userAddress = prompt("Enter your address:");
  const userPhone = prompt("Enter your phone number:");

  if (!userName || !userAddress || !userPhone) {
    alert("❌ Please fill all details before sending pickup request.");
    return;
  }

  let pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];

  const pickupData = {
    donorName: donation.donorName,
    donorAddress: donation.donorAddress,
    foodType: donation.foodType,
    peopleCount: donation.peopleCount,
    requesterName: userName,
    requesterAddress: userAddress,
    requesterPhone: userPhone,
    status: "Pending Pickup",
    time: new Date().toLocaleString()
  };

  pickupRequests.push(pickupData);
  localStorage.setItem("pickupRequests", JSON.stringify(pickupRequests));

  alert("📦 Pickup request sent successfully!");
}

// ✅ Initialize sample donations if not already present (unchanged)
if (!localStorage.getItem("donations")) {
  localStorage.setItem("donations", JSON.stringify([
    { donorName: "Ram", foodType: "Rice, Dal", peopleCount: 10, donorAddress: "Prakash Nagar", isCollected: false },
    { donorName: "Swagath Restaurant", foodType: "Chapati, Curry", peopleCount: 20, donorAddress: "Madhura Nagar", isCollected: false },
    { donorName: "Krishna", foodType: "Noodles, Fruits", peopleCount: 4, donorAddress: "Secunderabad", isCollected: false }
  ]));
}

// ✅ Display donors dynamically (unchanged)
function displayDonors() {
  const donorContainer = document.getElementById("donorContainer");
  donorContainer.innerHTML = "";

  const donations = JSON.parse(localStorage.getItem("donations")) || [];
  const pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];

  donations.forEach((donation, index) => {
    const donorCard = document.createElement("div");
    donorCard.classList.add("col-md-4", "mb-4");

    // Check if this donor has a pickup request
    const request = pickupRequests.find(r => r.donorName === donation.donorName && r.donorAddress === donation.donorAddress);

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
          <div class="d-flex gap-2 mt-2">
            <button class="btn btn-outline-info btn-sm flex-fill"
              onclick="navigateToLocation('${donation.donorAddress}')">
              Navigate
            </button>
            <button class="btn btn-success btn-sm flex-fill"
              onclick="markCollected(${index})">
              Mark as Collected
            </button>
          </div>

          <div class="mt-3">
            <button class="btn btn-sm btn-primary w-100 pickup-request" 
              onclick="pickupRequest(${index})"
              ${request && request.agentName ? 'disabled' : ''}>
              PickUp Request
            </button>
          </div>
        `
    }

    ${
  request ? `
    <hr>
    <div class="d-flex justify-content-between">
      <!-- Receiver Details -->
      <div class="flex-fill me-3">
        <h6>📍 Receiver Details</h6>
        <p><strong>Name:</strong> ${request.requesterName}</p>
        <p><strong>Address:</strong> ${request.requesterAddress}</p>
        <p><strong>Phone:</strong> ${request.requesterPhone}</p>
      </div>

      <!-- Delivery Agent Details -->
      <div class="flex-fill ms-3">
        <h6>🚚 Delivery Agent</h6>
        ${
          request.agentName
            ? `<p><strong>Name:</strong> ${request.agentName}</p>
               <p><strong>Phone:</strong> ${request.agentPhone}</p>
               <p><strong>Estimated Time:</strong> ${request.deliveryTime}</p>`
            : `<p class="text-muted">No delivery agent assigned yet</p>`
        }
      </div>
    </div>

    <hr>
    <p class="text-success fw-bold">${request.status}</p>
  ` : ''
}

  </div>
`;


    donorContainer.appendChild(donorCard);
  });
}

// Auto-refresh pickup requests in donor cards
setInterval(displayDonors, 3000);
