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

  // 🟢 Ask user details
  const userName = prompt("Enter your name:");
  const userAddress = prompt("Enter your address:");
  const userPhone = prompt("Enter your phone number:");

  if (!userName || !userAddress || !userPhone) {
    alert("❌ Please fill all details before sending pickup request.");
    return;
  }

  // Get existing pickup requests
  let pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];

  // Prepare pickup request object
  const pickupData = {
    donorName: donation.donorName,
    donorAddress: donation.donorAddress,
    foodType: donation.foodType,
    peopleCount: donation.peopleCount,
    // 🟩 Added user details
    requesterName: userName,
    requesterAddress: userAddress,
    requesterPhone: userPhone,
    status: "Pending Pickup",
    time: new Date().toLocaleString()
  };

  // Save the request
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
                  onclick="pickupRequest(${index})">
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

// ✅ Initialize on load
document.addEventListener("DOMContentLoaded", displayDonors);
