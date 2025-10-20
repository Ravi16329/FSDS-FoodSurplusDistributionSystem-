// Sample Pickup Requests
let pickups = [
  { donor: "Ravi", address: "VIT-AP University", foodType: "Meals", quantity: 20, time: "10:00 AM", status: "Pending" },
  { donor: "Sravan", address: "Amaravathi", foodType: "Snacks", quantity: 50, time: "11:30 AM", status: "Pending" },
  { donor: "Sudheer", address: "Vijayawada", foodType: "Fruits", quantity: 30, time: "1:00 PM", status: "Pending" }
];

// Populate Table
function renderTable() {
  const tbody = document.querySelector("#pickupTable tbody");
  tbody.innerHTML = "";

  pickups.forEach((p, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.donor}</td>
      <td>${p.address}</td>
      <td>${p.foodType}</td>
      <td>${p.quantity}</td>
      <td>${p.time}</td>
      <td>${p.status}</td>
      <td>
        ${p.status === "Pending" ? `<button class="btn btn-success btn-sm" onclick="acceptPickup(${index})">Accept</button>` : ""}
        ${p.status === "In Progress" ? `<button class="btn btn-primary btn-sm" onclick="markDelivered(${index})">Delivered</button>` : ""}
      </td>
    `;

    tbody.appendChild(tr);
  });

  updateStats();
}

// Update Stats
function updateStats() {
  const total = pickups.length;
  const completed = pickups.filter(p => p.status === "Delivered").length;
  const pending = pickups.filter(p => p.status === "Pending").length;

  document.getElementById("totalPickups").textContent = total;
  document.getElementById("completedDeliveries").textContent = completed;
  document.getElementById("pendingPickups").textContent = pending;
}

// Accept Pickup
function acceptPickup(index) {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = "flex";

  setTimeout(() => {
    pickups[index].status = "In Progress";
    loadingScreen.style.display = "none";
    renderTable();
  }, 1500);
}

// Mark Delivered
function markDelivered(index) {
  const loadingScreen = document.getElementById("loadingScreen");
  loadingScreen.style.display = "flex";

  setTimeout(() => {
    pickups[index].status = "Delivered";
    loadingScreen.style.display = "none";
    renderTable();
  }, 1500);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
});
