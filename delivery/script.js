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

    // Create delivery card
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
        ${
          req.requesterName
            ? `
          <p><strong>Name:</strong> ${req.requesterName}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${req.requesterAddress}</p>
          <p><i class="fas fa-phone"></i> ${req.requesterPhone}</p>
        `
            : `<p class="text-muted">Receiver info not available</p>`
        }

        <hr>
        <h6>🚚 Delivery Agent</h6>
        ${
          req.agentName
            ? `
          <p><strong>Name:</strong> ${req.agentName}</p>
          <p><i class="fas fa-phone"></i> ${req.agentPhone}</p>
          <p><strong>Estimated Time:</strong> ${req.deliveryTime}</p>
        `
            : `
          <p class="text-muted">No delivery agent assigned yet</p>
          <button class="btn btn-warning btn-sm w-100 mt-2" onclick="openAgentForm(${index})">
            I Will Pick Up
          </button>
        `
        }

        <hr>
        <p class="text-primary"><strong>Status:</strong> ${req.status}</p>
        <p class="text-muted"><small>🕒 Requested on: ${req.time}</small></p>

        <!-- Hidden form area -->
        <div id="agentForm-${index}" class="agent-form mt-3" style="display:none;">
          <input type="text" id="agentName-${index}" class="form-control mb-2" placeholder="Enter your name">
          <input type="text" id="agentPhone-${index}" class="form-control mb-2" placeholder="Enter your contact number">
          <input type="text" id="agentTime-${index}" class="form-control mb-2" placeholder="Estimated delivery time (e.g., 30 mins)">
          <button class="btn btn-success btn-sm w-100" onclick="submitAgentDetails(${index})">Submit</button>
        </div>
      </div>
    `;

    deliveryContainer.appendChild(card);
  });
}

// 🟢 Show form when agent clicks “I Will Pick Up”
function openAgentForm(index) {
  const form = document.getElementById(`agentForm-${index}`);
  form.style.display = "block";
}

// 🟢 Save agent details and update everywhere
function submitAgentDetails(index) {
  const agentName = document.getElementById(`agentName-${index}`).value.trim();
  const agentPhone = document.getElementById(`agentPhone-${index}`).value.trim();
  const deliveryTime = document.getElementById(`agentTime-${index}`).value.trim();

  if (!agentName || !agentPhone || !deliveryTime) {
    alert("❌ Please fill all the fields before submitting.");
    return;
  }

  let pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];

  pickupRequests[index].agentName = agentName;
  pickupRequests[index].agentPhone = agentPhone;
  pickupRequests[index].deliveryTime = deliveryTime;
  pickupRequests[index].status = "🚴 Delivery Agent Assigned";

  // ✅ Save back to localStorage (syncs with receiver page)
  localStorage.setItem("pickupRequests", JSON.stringify(pickupRequests));

  // 🆕 Optional — small helper to keep receiver page in sync instantly
  updateReceiverPickupRequests();

  alert("✅ Delivery details saved successfully!");

  displayPickupRequests(); // refresh UI
}

// 🆕 Function to ensure receiver page shows updated agent info
function updateReceiverPickupRequests() {
  let pickupRequests = JSON.parse(localStorage.getItem("pickupRequests")) || [];
  localStorage.setItem("pickupRequests", JSON.stringify(pickupRequests));
}
