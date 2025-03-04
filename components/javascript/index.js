import { trainers, cashier } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

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

        validateField(emailInput, emailError, "Email is required");
        validateField(passwordInput, passwordError, "Password is required");

        let errorMessageBox = document.getElementById("error-message-box");
        let errorMessageLogin = document.getElementById("error-message-login");

        if (!emailInput.value.trim() || !passwordInput.value.trim()) {
            // alert("Please fill in all fields!");
            errorMessageBox.classList.add("open-error-message-box");
            errorMessageLogin.innerHTML = "Please fill in all fields!";
            return false;
        } else if (emailInput.value == "admin@gmail.com" && passwordInput.value == "admin") {
            // alert("Login Successful");
            window.location.href = "dashboard.html"; // Redirect to dashboard
            localStorage.setItem("email", emailInput.value);
            // window.confirm("Welcome " + emailInput.value);
        } else {
            // alert("Invalid credentials");
            errorMessageBox.classList.add("open-error-message-box");
            errorMessageLogin.innerHTML = "Invalid credentials provided. Please check your email and password.";
        }
    });
});

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


let closeErrorMessageBox = document.getElementById("close-error-message-box");

closeErrorMessageBox.onclick = function closeErrorMessageBox(){
    let errorMessageBox= document.getElementById("error-message-box");
    errorMessageBox.classList.remove("open-error-message-box");
}

// console.log("Trainers: ", trainers);

export {closeErrorMessageBox}
