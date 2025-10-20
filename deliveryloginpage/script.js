// Predefined users or from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [
  { email: "ravi", password: "ravi" },
  { email: "sravan", password: "sravan" },
  { email: "sudheer", password: "salar" },
  { email: "sai", password: "sai" }
];

// Save users to localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// Toggle forms
function toggleForms() {
  document.getElementById("signup-section").classList.toggle("active");
  document.getElementById("login-section").classList.toggle("active");
  document.querySelector(".message").style.display = "none";
}

// Show messages
function showMessage(text, type) {
  const msg = document.querySelector(".message");
  msg.innerHTML = text;
  msg.className = "message " + type;
  msg.style.display = "block";
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // Sign Up Form
  const signupForm = document.getElementById("signupForm");
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    if (!email || !password) {
      showMessage("❌ Please fill in all fields.", "error");
      return;
    }

    if (users.some(user => user.email === email)) {
      showMessage("❌ User already exists! Please login.", "error");
      return;
    }

    users.push({ email, password });
    saveUsers();
    showMessage("✅ Account created successfully! Please login.", "success");

    setTimeout(() => {
      toggleForms();
    }, 1500);
  });

  //Login Formm
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const loadingScreen = document.getElementById("loadingScreen");

  const validUser = users.find(u => u.email === email && u.password === password);

  if (validUser) {
    // Hide login form and show spinner
    document.querySelector(".carousel-form-overlay .form-container").style.display = "none";
    loadingScreen.style.display = "flex";

    // Show spinner for 2 seconds, then redirect
    setTimeout(() => {
      window.location.href = "../delivery/index.html";
    }, 1500);

  } else {
    showMessage("❌ Invalid username or password. Try again.", "error");
  }
});



});
