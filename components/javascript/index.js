import { admin, trainers, cashiers } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const errorMessageBox = document.getElementById("error-message-box");
    const errorMessageLogin = document.getElementById("error-message-login");
    const background = document.getElementById("background");
    const closeErrorMessageBox = document.getElementById("close-error-message-box");

    function validateField(input, errorElement, message) {
        if (!input.value.trim()) {
            input.style.border = "2px solid red";
            errorElement.textContent = message;
        } else {
            input.style.border = ""; // Optional green
            errorElement.textContent = ""; // Remove error message
        }
    }

    emailInput.addEventListener("blur", function () {
        validateField(emailInput, emailError, "Email is required");
    });

    passwordInput.addEventListener("blur", function () {
        validateField(passwordInput, passwordError, "Password is required");
    });

    document.getElementById("login-btn").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        background.style.display = "flex";

        validateField(emailInput, emailError, "Email is required");
        validateField(passwordInput, passwordError, "Password is required");

        const adminList = [...admin ].find(admin => admin.email === emailInput.value && admin.password === passwordInput.value);
        const cashierList = [...cashiers ].find(cashier => cashier.email === emailInput.value && cashier.password === passwordInput.value);
        const trainerList = [...trainers ].find(trainer => trainer.email === emailInput.value && trainer.password === passwordInput.value);

        if (!emailInput.value.trim() || !passwordInput.value.trim()) {
            errorMessageBox.classList.add("open-error-message-box");
            errorMessageLogin.innerHTML = "Please fill in all fields!";
            return false;
        } else if (adminList) {
            // Show success message
            errorMessageBox.classList.add("open-error-message-box");
            errorMessageLogin.innerHTML = "You're all set! Logged in successfully.";

            // Hide the close button
            closeErrorMessageBox.style.display = "none";

            // Store email in local storage
            localStorage.setItem("email", emailInput.value);

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 2000);
        } else if (trainerList) {
            // Show success message
            errorMessageBox.classList.add("open-error-message-box");
            errorMessageLogin.innerHTML = "You're all set! Logged in successfully.";

            // Hide the close button
            closeErrorMessageBox.style.display = "none";


            // Store email in local storage
            localStorage.setItem("email", emailInput.value);

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "./trainers/dashboardTrainers.html";
            }, 2000);
        } else {
            errorMessageBox.classList.add("open-error-message-box");
            errorMessageLogin.innerHTML = "Invalid credentials provided. Please check your email and password.";
        }
    });

    // Toggle password visibility
    document.getElementById("toggle-password").addEventListener("click", function () {
        const passwordInput = document.getElementById("password");
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.textContent = "visibility_off"; // Change to eye-off icon
        } else {
            passwordInput.type = "password";
            this.textContent = "visibility"; // Change back to eye icon
        }
    });

    // Close error message box (only if login is not successful)
    closeErrorMessageBox.onclick = function () {
        errorMessageBox.classList.remove("open-error-message-box");
        background.style.display = "none";
    };
});
