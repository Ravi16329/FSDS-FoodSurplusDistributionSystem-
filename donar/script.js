// Handle donation form submission
document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const donorName = document.getElementById('donorName').value.trim();
    const foodType = document.getElementById('foodType').value.trim();
    const peopleCount = document.getElementById('peopleCount').value.trim();
    const donorAddress = document.getElementById('donorAddress').value.trim();
    const mobileNumber = document.getElementById('mobileNumber').value.trim();

    // Validate mobile number (exactly 10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // Save donation data in localStorage
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations.push({ donorName, foodType, peopleCount, donorAddress, mobileNumber });
    localStorage.setItem('donations', JSON.stringify(donations));

    // SHOW BIG THANK YOU MESSAGE ON PAGE
    const messageDiv = document.getElementById('thankYouMessage');
    messageDiv.style.display = "block"; // Make it visible
    messageDiv.style.fontSize = "1.5rem"; // Bigger font
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.color = "#FF5733";
    messageDiv.style.textAlign = "center";
    messageDiv.style.marginTop = "15px";

    messageDiv.innerHTML = `
        Thank you, <span style="color:#28a745;">${donorName}</span>, for donating 
        <span style="color:#ffc107;">${foodType}</span> for 
        <span style="color:#17a2b8;">${peopleCount}</span> people!<br>
        God bless you, my dear donor ❤️❤️❤️<br>
        You won <span style="color:#ff4d4d;">LACKS OF HEARTS</span> 💖💖💖
    `;

    // Reset the form
    this.reset();
});


// Handle "Track My Food" form submission
function redirectToTrackingPage(event) {
    event.preventDefault();
    const donationId = document.getElementById('donationId').value.trim();

    // Validate donation ID / phone number
    if (!/^\d{10}$/.test(donationId)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    // Redirect to tracking page (update path if needed)
    const trackingUrl = `file:///D:/web%20pages/food%20donation/Maps%20Integration/index.html`;
    window.location.href = trackingUrl;
}
