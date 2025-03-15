// import { members, trainers, cashiers } from './data.js';


const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

setInterval(() => {
    let currentDateTime = new Date();
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
    let timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    dateElement.innerHTML = currentDateTime.toLocaleDateString('en-US', dateOptions);
    timeElement.innerHTML = currentDateTime.toLocaleTimeString('en-US', timeOptions);
}, 1000);

document.addEventListener("DOMContentLoaded", function () {
    const updateDetailsButton = document.querySelector(".update-details");
    const updateDetailsCancel = document.querySelector(".update-details-cancel");
    const updateDetailsContent = document.querySelector(".update-details-content");

    updateDetailsButton.addEventListener("click", function () {
        updateDetailsContent.classList.toggle("open"); // Toggles sidebar visibility
    });

    updateDetailsCancel.addEventListener("click", function () {
        updateDetailsContent.classList.toggle("open"); // Toggles sidebar visibility
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const updatePasswordButton = document.querySelector(".update-password");
    const updatePasswordCancel = document.querySelector(".update-password-cancel");
    const updatePasswordContent = document.querySelector(".update-password-content");

    updatePasswordButton.addEventListener("click", function () {
        updatePasswordContent.classList.toggle("open"); // Toggles sidebar visibility
    });

    updatePasswordCancel.addEventListener("click", function () {
        updatePasswordContent.classList.toggle("open"); // Toggles sidebar visibility
    });
});

// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach(toggle => {
    toggle.addEventListener("click", function () {
        const passwordInput = this.previousElementSibling; // Get the input field before the toggle button
        
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.textContent = "visibility"; // Change to eye-off icon
        } else {
            passwordInput.type = "password";
            this.textContent = "visibility_off"; // Change back to eye icon
        }
    });
});

document.getElementById("logout-btn").addEventListener("click", function (event) {
    
    const errorMessageBox = document.getElementById("error-message-box");
    const errorMessageLogin = document.getElementById("error-message-login");
    const confirmErrorMessageBox = document.getElementById("confirm-error-message-box");
    const closeErrorMessageBox = document.getElementById("close-error-message-box");

    if (errorMessageBox && errorMessageLogin && closeErrorMessageBox && confirmErrorMessageBox) {
        // Show the logout confirmation modal
        errorMessageBox.classList.add("open-error-message-box");
        errorMessageLogin.innerHTML = "Do you wish to log out?";

        // Close modal when clicking cancel
        closeErrorMessageBox.onclick = function () {
            errorMessageBox.classList.remove("open-error-message-box");
        };

        // Confirm logout action
        confirmErrorMessageBox.onclick = function () {
            // Perform logout (redirect, clear session, etc.)
            window.location.href = "login.html"; // Adjust according to your logout logic
        };
    } else {
        console.error("One or more required elements are missing.");
    }
});