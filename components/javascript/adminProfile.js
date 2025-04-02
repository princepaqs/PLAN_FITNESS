import { admin, trainers, cashiers } from './data.js';

const emailInput = localStorage.getItem("email");
const role = localStorage.getItem('role');
const errorMessageBox = document.getElementById("error-message-box");
const errorTitle = document.getElementById("error-title");
const errorMessageLogin = document.getElementById("error-message-login");
const confirmErrorMessageBox = document.getElementById("confirm-error-message-box");
const closeErrorMessageBox = document.getElementById("close-error-message-box");
const background = document.getElementById("background");

if (!emailInput) {
    alert("You are not logged in!");
} else {
    // Find user in both trainers and cashiers lists
    const userList = [...admin, ...cashiers, ...trainers].find(user => user.email === emailInput);

    if (!userList) {
        alert("Invalid user!");
    } else {
        // Extract first name only
        const firstName = userList.name.split(" ")[0];

        // Update UI elements
        document.getElementById('name').innerHTML = userList.name;
        document.getElementById('email').innerHTML = userList.email;

        document.getElementById('profile-fullname').innerHTML = userList.name;
        document.getElementById('profile-nickname').innerHTML = userList.nickname;
        document.getElementById('profile-contact').innerHTML = userList.contact;
        document.getElementById('profile-icon-main').src = userList.image;

        document.getElementById('fullname').value = userList.name;
        document.getElementById('profile-icon').src = userList.image;
        document.getElementById('nickname').value = userList.nickname;
        document.getElementById('contact').value = userList.contact;
    }
}

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
    const menuIcon = document.querySelector(".menu");
    const sidebar = document.querySelector(".sidebar");

    menuIcon.addEventListener("click", function () {
        sidebar.classList.toggle("hidden"); // Toggles sidebar visibility
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const updateDetailsButton = document.querySelector(".update-details");
    const updateDetailsSave = document.querySelector(".update-details-save");
    const updateDetailsCancel = document.querySelector(".update-details-cancel");
    const updateDetailsContent = document.querySelector(".update-details-content");

    

    updateDetailsSave.addEventListener("click", function () {
        errorMessageBox.classList.add("open-error-message-box");
        errorTitle.innerHTML = "Success!";
        const role = localStorage.getItem('role');
        if(role === 'admin'){
            errorMessageLogin.innerHTML = "Admin details updated successfully!";
        } else if (role === 'cashier') {
            errorMessageLogin.innerHTML = "Cashier details updated successfully!";
        } else {
            errorMessageLogin.innerHTML = "Trainer details updated successfully!";
        }
        
        updateDetailsContent.classList.toggle("open"); // Toggles sidebar visibility
        confirmErrorMessageBox.style.display = "none";
        closeErrorMessageBox.style.display = "none";
        background.style.display = "flex";
        setTimeout(() => {
            errorMessageBox.classList.remove("open-error-message-box");
            background.style.display = "none";
        }, 2000);
    });

    updateDetailsButton.addEventListener("click", function () {
        updateDetailsContent.classList.toggle("open"); // Toggles sidebar visibility
    });

    updateDetailsCancel.addEventListener("click", function () {
        updateDetailsContent.classList.toggle("open"); // Toggles sidebar visibility
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const updatePasswordButton = document.querySelector(".update-password");
    const updatePaswordSave = document.querySelector(".update-password-save");
    const updatePasswordCancel = document.querySelector(".update-password-cancel");
    const updatePasswordContent = document.querySelector(".update-password-content");

    updatePaswordSave.addEventListener("click", function () {
        confirmErrorMessageBox.style.display = "none";
        closeErrorMessageBox.style.display = "none";
        background.style.display = "flex";
        if (!document.getElementById("newPassword").value || !document.getElementById("confirmPassword").value) {
            errorMessageBox.classList.add("open-error-message-box");
            errorTitle.innerHTML = "Error!";
            errorMessageLogin.innerHTML = "Please fill in all fields!";
            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
            }, 2000);
            return false;
        } else if(document.getElementById("newPassword").value !== document.getElementById("confirmPassword").value) {
            errorMessageBox.classList.add("open-error-message-box");
            errorTitle.innerHTML = "Error!";
            errorMessageLogin.innerHTML = "Passwords do not match!";
            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
            }, 2000);
            return false;
        } else if(document.getElementById("newPassword").value.length < 8) {
            errorMessageBox.classList.add("open-error-message-box");
            errorTitle.innerHTML = "Error!";
            errorMessageLogin.innerHTML = "Password must be at least 8 characters long!";
            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
            }, 2000);
            return false;
        } else {
            errorMessageBox.classList.add("open-error-message-box");
            errorTitle.innerHTML = "Success!";
            const role = localStorage.getItem('role');
            if(role === 'admin'){
                errorMessageLogin.innerHTML = "Admin password updated successfully!";
            } else if (role === 'cashier') {
                errorMessageLogin.innerHTML = "Cashier password updated successfully!";
            } else {
                errorMessageLogin.innerHTML = "Trainer password updated successfully!";
            }
            updatePasswordContent.classList.toggle("open");
            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
            }, 2000);
        }
    });

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

    background.style.display = "flex";
    if (errorMessageBox && errorMessageLogin && closeErrorMessageBox && confirmErrorMessageBox) {
        // Show the logout confirmation modal
        errorMessageBox.classList.add("open-error-message-box");
        errorMessageLogin.innerHTML = "Do you wish to log out?";

        // Close modal when clicking cancel
        closeErrorMessageBox.onclick = function () {
            errorMessageBox.classList.remove("open-error-message-box");
            background.style.display = "none";
        };

        // Confirm logout action
        confirmErrorMessageBox.onclick = function () {
            // Perform logout (redirect, clear session, etc.)
            if(role === 'admin'){
                window.location.href = "login.html"; // Adjust according to your logout logic
            } else {
                window.location.href = "../login.html"; // Adjust according to your logout logic
            }
        };
    } else {
        console.error("One or more required elements are missing.");
    }
});