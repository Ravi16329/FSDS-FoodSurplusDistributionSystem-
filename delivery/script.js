// delivery.js

document.addEventListener("DOMContentLoaded", displayPickupRequests);

function displayPickupRequests() {
  const deliveryContainer = document.getElementById("deliveryContainer");
  deliveryContainer.innerHTML = "";

  const pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];

  if (pickupRequests.length === 0) {
    deliveryContainer.innerHTML = `<p class="text-center text-muted">No pickup requests yet 🚫</p>`;
    return;
  }

  pickupRequests.forEach((req, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    card.innerHTML = `
      <div class="delivery-card p-4 shadow rounded bg-light">
        <h5>🍱 <strong>${req.foodType}</strong></h5>
        <p><strong>Feeds:</strong> ${req.peopleCount} people</p>

        <hr>
        <h6>👤 Donor Details</h6>
        <p><strong>Name:</strong> ${req.donorName}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${req.donorAddress}</p>

        <hr>
        <h6>📍 Receiver Details</h6>
        ${req.receiverName ? `
          <p><strong>Name:</strong> ${req.receiverName}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${req.receiverAddress}</p>
        ` : `<p class="text-muted">Receiver info not available</p>`}

        <hr>
        <h6>🚚 Pickup Requested By</h6>
        <p><strong>Name:</strong> ${req.requesterName}</p>
        <p><i class="fas fa-map-marker-alt"></i> ${req.requesterAddress}</p>
        <p><i class="fas fa-phone"></i> ${req.requesterPhone}</p>

        <hr>
        <p class="text-primary"><strong>Status:</strong> ${req.status}</p>
        <p class="text-muted"><small>🕒 Requested on: ${req.time}</small></p>
      </div>
    `;

    deliveryContainer.appendChild(card);
  });
}
