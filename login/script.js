// Load users from localStorage or use predefined credentials
let users = JSON.parse(localStorage.getItem("users")) || [
  { email: "ravi", password: "ravi" },
  { email: "sravan", password: "sravan" },
  { email: "sudheer", password: "salar" },
  { email: "sai", password: "sai" }
];

// Save updated users to localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Toggle forms (login <-> signup)
function toggleForms() {
  document.getElementById("signup-section").classList.toggle("active");
  document.getElementById("login-section").classList.toggle("active");
  document.querySelector(".message").innerHTML = ""; // Clear message
}

// Handle Sign Up
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  // Check if user already exists
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    showMessage("User already exists! Please login.", "error");
    return;
  }

  // Add new user
  users.push({ email, password });
  saveUsers();
  showMessage("✅ Account created successfully! Please login.", "success");

  // Switch to login form after 2 seconds
  setTimeout(() => {
    toggleForms();
  }, 2000);
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const loadingScreen = document.getElementById("loadingScreen");

  // Check credentials
  const validUser = users.find(user => user.email === email && user.password === password);

  if (validUser) {
    showMessage("🎉 Login successful! Redirecting...", "success");

    // Show loading spinner immediately
    loadingScreen.style.display = "flex";

    // Redirect after 2 seconds
    setTimeout(() => {
      window.location.href = "../reciever/index.html";
    }, 2000);

  } else {
    showMessage("❌ Invalid username or password. Try again.", "error");
  }
});

// Function to show nice messages
function showMessage(text, type) {
  let msg = document.querySelector(".message");
  msg.innerHTML = text;
  msg.className = "message " + type;
  msg.style.display = "block";
}
