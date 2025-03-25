import { admin, plans, trainers, cashiers, members } from './data.js';

const emailInput = localStorage.getItem("email");
const background = document.getElementById("background");
const errorTitle = document.getElementById("error-title");
const errorMessageBox = document.getElementById("error-message-box");
const errorMessageLogin = document.getElementById("error-message-login");
const confirmErrorMessageBox = document.getElementById("confirm-error-message-box");
const closeErrorMessageBox = document.getElementById("close-error-message-box");

if (!emailInput) {
    alert("You are not logged in!");
} else {
    // Find user in both trainers and cashiers lists
    const userList = [...admin, ...cashiers, ...trainers].find(user => user.email === emailInput);

    if (!userList) {
        alert("Invalid user!");
    } else {

        // Update UI elements
        document.getElementById('name').innerHTML = userList.name;
        document.getElementById('email').innerHTML = userList.email;
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

document.getElementById("logout-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    background.style.display = "flex";
    
    errorMessageBox.style.zIndex = 200;
    if (errorMessageBox && errorMessageLogin && closeErrorMessageBox && confirmErrorMessageBox) {
        // Show the logout confirmation modal
        errorMessageBox.classList.add("open-error-message-box");
        errorTitle.innerHTML = "Logout";
        errorMessageLogin.innerHTML = "Do you wish to log out?";
        closeErrorMessageBox.style.display = "block";
        confirmErrorMessageBox.style.display = "block";

        // Close modal when clicking cancel
        closeErrorMessageBox.onclick = function () {
            errorMessageBox.classList.remove("open-error-message-box");
            background.style.display = "none";
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

const searchInput = document.getElementById("search");
const suggestionBox = document.createElement("div");
suggestionBox.setAttribute("id", "suggestionBox");
searchInput.parentNode.appendChild(suggestionBox); // Append below input

const memberIdInput = document.getElementById("member-id");
const memberNameInput = document.getElementById("member-name");
const startNewPlanBtn = document.getElementById("start-new-plan");

window.searchTable = function searchTable() {
    const searchQuery = searchInput.value.toLowerCase().trim();
    suggestionBox.innerHTML = ""; // Clear previous suggestions
    suggestionBox.style.display = "none"; // Hide dropdown by default

    if (searchQuery === "") {
        clearFields();
        return;
    }

    // Find matching members
    const matchedMembers = members.filter(member =>
        member.id.toLowerCase().includes(searchQuery) || member.name.toLowerCase().includes(searchQuery)
    );

    if (matchedMembers.length === 0) {
        clearFields();
        return;
    }

    // Show suggestions in dropdown
    suggestionBox.style.display = "block";
    matchedMembers.forEach(member => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item"); // You can style this in CSS
        suggestionItem.textContent = `${member.name} (${member.id})`;
        suggestionItem.addEventListener("click", function () {
            autofillMemberDetails(member);
            suggestionBox.style.display = "none"; // Hide dropdown after selection
        });
        suggestionBox.appendChild(suggestionItem);
    });
};

// Autofill selected member's details
function autofillMemberDetails(member) {
    clearFields();
    startNewPlanBtn.style.display = "block";
    const matchedPlan = plans.find(plan => plan.id.includes(member.plan));

    // Enable the necessary fields
    document.getElementById("trainer-name").disabled = false;
    document.getElementById("plan-id").disabled = false;
    document.getElementById("plan-date-start").disabled = false;
    document.getElementById("continue-payment").disabled = false;

    memberIdInput.value = member.id;
    memberNameInput.value = member.name;
    document.getElementById("plan-id").value = member.plan || "";
    console.log(matchedPlan?.id, member.plan);
    console.log(matchedPlan?.id, member.trainer);
    
    document.getElementById("plan-name").value = matchedPlan?.name || "";
    document.getElementById("plan-validity").value = matchedPlan?.validity || "";
    document.getElementById("plan-date-start").value = member.planStart || "";
    document.getElementById("plan-date-end").value = member.endDate || "";
    document.getElementById("plan-price").value = matchedPlan?.amount || "";
    document.getElementById("trainer-name").value = member.trainer || "";
    document.getElementById("trainer-schedule").value = member.schedule || "";
    document.getElementById("trainer-sessions").value = member.sessions || "";
}


// Function to clear all fields when no match is found
function clearFields() {
    // searchInput.value = "";
    startNewPlanBtn.style.display = "none";
    memberIdInput.value = "";
    memberNameInput.value = "";
    document.getElementById("trainer-name").disabled = true;
    document.getElementById("plan-id").disabled = true;
    document.getElementById("plan-date-start").disabled = true;
    document.getElementById("continue-payment").disabled = true;
    document.getElementById("trainer-schedule").disabled = true;
    document.getElementById("trainer-sessions").disabled = true;

    document.getElementById("plan-id").value = "";
    document.getElementById("plan-name").value = "";
    document.getElementById("plan-validity").value = "";
    document.getElementById("plan-date-start").value = "";
    document.getElementById("plan-date-end").value = "";
    document.getElementById("plan-price").value = "";
    document.getElementById("trainer-name").value = "";
    document.getElementById("trainer-schedule").value = "";
    document.getElementById("trainer-sessions").value = "";
}

function clearSearch() {
    searchInput.value = "";
    startNewPlanBtn.style.display = "none";
}

function startPlan() {
    // searchInput.value = "";
    startNewPlanBtn.style.display = "block";
    // memberIdInput.value = "";
    // memberNameInput.value = "";
    // document.getElementById("trainer-name").disabled = true;
    // document.getElementById("plan-id").disabled = true;
    // document.getElementById("plan-date-start").disabled = true;
    // document.getElementById("continue-payment").disabled = true;

    document.getElementById("plan-id").value = "";
    document.getElementById("plan-name").value = "";
    document.getElementById("plan-validity").value = "";
    document.getElementById("plan-date-start").value = "";
    document.getElementById("plan-date-end").value = "";
    document.getElementById("plan-price").value = "";
    document.getElementById("trainer-name").value = "";
    document.getElementById("trainer-schedule").value = "";
    document.getElementById("trainer-sessions").value = "";
}

// Attach event listener for real-time search
searchInput.addEventListener("input", searchTable);

document.getElementById("cancel-payment").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    clearFields();
    clearSearch();
})

document.getElementById("continue-payment").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    console.log("Test payment");

    const paymentModal = document.getElementById("payment-modal");
    background.style.display = "flex";
    paymentModal.style.display = "flex";

    // Get modal content div
    const modalContent = document.getElementById("payment-modal-content");

    // Calculate total amount
    const Amount = parseInt(document.getElementById("plan-price").value) * parseInt(document.getElementById("trainer-sessions").value);

    // Create the HTML content dynamically
    modalContent.innerHTML = `
    <table style="width: 100%; border-collapse: collapse;">
        <tr><td><strong>Member ID:</strong></td><td>${document.getElementById("member-id").value}</td></tr>
        <tr><td><strong>Member Name:</strong></td><td>${document.getElementById("member-name").value}</td></tr>
        <tr><td><strong>Plan ID:</strong></td><td>${document.getElementById("plan-id").value}</td></tr>
        <tr><td><strong>Plan Name:</strong></td><td>${document.getElementById("plan-name").value}</td></tr>
        <tr><td><strong>Validity:</strong></td><td>${document.getElementById("plan-validity").value}</td></tr>
        <tr><td><strong>Plan Date Start:</strong></td><td>${document.getElementById("plan-date-start").value}</td></tr>
        <tr><td><strong>Plan Expiry:</strong></td><td>${document.getElementById("plan-date-end").value}</td></tr>
        <tr><td><strong>Price:</strong></td><td>${document.getElementById("plan-price").value}</td></tr>
        <tr><td><strong>Trainer Name:</strong></td><td>${document.getElementById("trainer-name").value}</td></tr>
        <tr><td><strong>Schedule:</strong></td><td>${document.getElementById("trainer-schedule").value}</td></tr>
        <tr><td><strong>Sessions:</strong></td><td>${document.getElementById("trainer-sessions").value}</td></tr>
        <tr>
            <td><h3 style="color: #8C0909;"><strong>Amount Due:</strong></h3></td>
            <td><h3 style="color: #8C0909;">₱ <span id="amount-due">${Amount}</span>.00</h3></td>
        </tr>
        <tr>
            <td><h3 style="color: #8C0909;"><strong>Enter Amount:</strong></h3></td>
            <td><input type="number" id="amount-input" style="width: 50%; padding: 2%;" oninput="calculateChange()"></td>
        </tr>
        <tr>
            <td><h3 style="color: #8C0909;"><strong>Change:</strong></h3></td>
            <td><h3 style="color: #8C0909;">₱ <span id="change-amount">0.00</span></h3></td>
        </tr>
    </table>
    `;

    // Attach the calculateChange function after modal content is inserted
    window.calculateChange = function () {
        let amountDue = parseFloat(document.getElementById("amount-due").innerText);
        let enteredAmount = parseFloat(document.getElementById("amount-input").value) || 0;
        let change = enteredAmount - amountDue;

        // Update the displayed change
        document.getElementById("change-amount").innerText = change >= 0 ? change.toFixed(2) : "0.00";
    };
});


document.getElementById("payment-cancel").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    background.style.display = "none";
    const paymentModal = document.getElementById("payment-modal");
    paymentModal.style.display = "none";
})

document.getElementById("payment-confirm").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    console.log("Test");
    // background.style.display = "none";
    if(!document.getElementById("amount-input").value){
        return;
    }
    errorMessageBox.style.zIndex = 200;
    const paymentModal = document.getElementById("payment-modal");
    paymentModal.style.display = "none";
    errorMessageBox.classList.add("open-error-message-box");
    errorTitle.innerHTML = "Payment";
    errorMessageLogin.innerHTML = "Payment processed successfully!";
    closeErrorMessageBox.style.display = "none";
    confirmErrorMessageBox.style.display = "none";

    setTimeout(() => {
        errorMessageBox.classList.remove("open-error-message-box");
        background.style.display = "none";
    }, 2000);
})

document.getElementById("plan-id").addEventListener("change", (event) => {
    const planIdSelect = event.target;
    const planId = planIdSelect.value;
    console.log("Plan ID:", planId);

    const matchedPlan = plans.find(plan => plan.id.includes(planId));

    document.getElementById("plan-name").value = matchedPlan?.name || "";
    document.getElementById("plan-validity").value = matchedPlan?.validity || "";
    document.getElementById("plan-date-start").value = "";
    document.getElementById("plan-date-end").value = "";
    document.getElementById("plan-price").value = matchedPlan?.amount || "";

    // Reset value briefly to allow re-selection
    // setTimeout(() => planIdSelect.value = "", 100);
});

document.getElementById("trainer-name").addEventListener("change", (event) => {
    const trainerName = event.target;
    const trainer = trainerName.value;
    console.log("Trainer:", trainer);

    // const matchedTrainer = trainers.find(trainer => trainer.name.includes(trainerName));

    
    document.getElementById("trainer-name").value = trainer || "";
    document.getElementById("trainer-schedule").value = "";
    document.getElementById("trainer-sessions").value = "";
    document.getElementById("trainer-schedule").disabled = false;
    document.getElementById("trainer-sessions").disabled = false;
    // document.getElementById("plan-validity").value = matchedPlan?.validity || "";
    // document.getElementById("plan-date-start").value = "";
    // document.getElementById("plan-date-end").value = "";
    // document.getElementById("plan-price").value = matchedPlan?.amount || "";

    // Reset value briefly to allow re-selection
    // setTimeout(() => planIdSelect.value = "", 100);
});

document.getElementById("plan-date-start").addEventListener("change", (event) => {
    const planDateStart = event.target.value; // Expected: YYYY-MM-DD from <input type="date">
    const planDateEnd = document.getElementById("plan-date-end");

    // Get the validity months from an element (span, div, or input)
    const validityText = document.getElementById("plan-validity").innerText || document.getElementById("plan-validity").value;

    // Extract numeric value (assuming format like "6 months")
    const validityMonths = parseInt(validityText.match(/\d+/), 10);

    if (isNaN(validityMonths)) {
        console.error("Invalid validity period");
        return;
    }

    // Convert the input date string to a Date object
    const startDate = new Date(planDateStart);
    if (isNaN(startDate.getTime())) {
        console.error("Invalid start date");
        return;
    }

    // Add validity months
    startDate.setMonth(startDate.getMonth() + validityMonths);

    // Format as YYYY-MM-DD for input[type="date"]
    const formattedEndDate = startDate.toISOString().split("T")[0];

    // Set the value in the date input field
    planDateEnd.value = formattedEndDate;
    console.log("Plan End Date:", formattedEndDate);
});

document.getElementById("start-new-plan").addEventListener("click", (event) => {
    event.preventDefault();
    background.style.display = "flex";
    
    errorMessageBox.style.zIndex = 200;
    if (errorMessageBox && errorMessageLogin && closeErrorMessageBox && confirmErrorMessageBox) {
        // Show the logout confirmation modal
        errorMessageBox.classList.add("open-error-message-box");
        errorTitle.innerHTML = "New Plan";
        errorMessageLogin.innerHTML = "Start new plan for the selected member?";
        closeErrorMessageBox.style.display = "block";
        confirmErrorMessageBox.style.display = "block";

        // Close modal when clicking cancel
        closeErrorMessageBox.onclick = function () {
            errorMessageBox.classList.remove("open-error-message-box");
            background.style.display = "none";
        };

        // Confirm logout action
        confirmErrorMessageBox.onclick = function () {
            // Perform logout (redirect, clear session, etc.)
            errorMessageBox.classList.remove("open-error-message-box");
            background.style.display = "none";
            startNewPlanBtn.style.display = "none";
            startPlan();
        };
    } else {
        console.error("One or more required elements are missing.");
    }
})

// Example user data
const paymentData = {
    memberId: "PF019",
    memberName: "Jacob Sullivan II",
    planId: "TSP-03",
    planName: "Trainer Support Plan",
    validity: "3 months",
    startDate: "Feb-28-2025",
    expiryDate: "May-28-2025",
    price: "₱3,199",
    trainerName: "Lexus Guevara",
    schedule: "Selected 9/9",
    sessions: "3",
    amountDue: "₱3,199",
    change: "₱301"
};



// // Example function for confirm button
// function confirmPayment() {
//     alert("Payment confirmed!");
// }

// // Example function for back button
// function closeModal() {
//     document.getElementById("payment-modal-content").innerHTML = ""; // Clears content
// }








