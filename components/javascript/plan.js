import { admin, plans, trainers, cashiers } from './data.js';

const emailInput = localStorage.getItem("email");
const role = localStorage.getItem('role');
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
        document.getElementById('profile-icon').src = userList.image;
        console.log(role)
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

if(role === 'admin' || role === 'cashier'){
    console.log("Test")
    const addPlanButton = document.querySelector(".addPlan");
    const planModal = document.querySelector(".plan-modal");
    const planModalTitle = document.querySelector(".plan-modal-title");
    // const planId = document.getElementById("planId");
    const planIdInput = document.getElementById("planId");
    const planNameInput = document.getElementById("planName");
    const planAmountInput = document.getElementById("planAmount");
    const planValidityInput = document.getElementById("planValidity");
    const planSessionsInput = document.getElementById("planSessions");
    const planAdd = document.querySelector(".addPlanModal");
    const planEdit = document.querySelector(".editPlanModal");
    const planDelete = document.querySelector(".deletePlanModal")
    const planClose = document.querySelector(".closePlanModal");
    const tableBody = document.querySelector(".plan-lists");

    function populateTable() {
        plans.forEach(plan => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${plan.id}</td>
                <td>${plan.name}</td>
                <td>${plan.validity}</td>
                <td>${plan.sessions}</td>
                <td>₱ ${plan.amount}.00</td>
                <td>
                    <div class="custom-dropdown" data-id="${plan.id}">
                        <button class="dropdown-btn">Action</button>
                        <ul class="dropdown-menu">
                            <li data-action="edit" class="editPlan"><span class="material-symbols-outlined">edit</span> Edit</li>
                            <li data-action="delete" class="deletePlan"><span class="material-symbols-outlined">delete</span> Delete</li>
                        </ul>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }


    // Call function to populate the table
    populateTable();

    document.addEventListener("DOMContentLoaded", function () {
        let activeDropdown = null; // Track the currently open dropdown

        document.querySelectorAll(".custom-dropdown").forEach((dropdown) => {
            const button = dropdown.querySelector(".dropdown-btn");
            const menu = dropdown.querySelector(".dropdown-menu");

            // Show dropdown on button click
            button.addEventListener("click", function (event) {
                event.stopPropagation();

                // Close any previously open dropdown
                if (activeDropdown && activeDropdown !== menu) {
                    activeDropdown.style.display = "none";
                }

                // Toggle the clicked dropdown
                menu.style.display = menu.style.display === "block" ? "none" : "block";
                menu.style.zIndex = "2";

                // Update active dropdown
                activeDropdown = menu.style.display === "block" ? menu : null;
            });

            // Handle menu item click
            menu.querySelectorAll("li").forEach((item) => {
                item.addEventListener("click", function () {
                    let action = this.getAttribute("data-action");
                    let planDataId = dropdown.getAttribute("data-id");

                    let existingPlan = plans.find(plan => plan.id === planDataId);

                    if (!existingPlan) {
                        alert("Plan not found.");
                        return;
                    }

                    if (action === "edit") {
                        planModal.style.display = "flex"; 
                        background.style.display = "flex";
                        planAdd.style.display = "none"
                        planEdit.style.display = "flex";
                        planModalTitle.innerHTML = "Edit Plan";
                        planIdInput.value = existingPlan.id;
                        planNameInput.value = existingPlan.name;
                        planAmountInput.value = existingPlan.amount;
                        planValidityInput.value = parseInt(existingPlan.validity.split(" ")); // example value = "12 months"
                        planSessionsInput.value = existingPlan.sessions; // it is a dropdown
                        // console.log(`Editing Plan ID1: ${planDataId}`);
                        // planModalTitle.innerHTML = planId;
                        // Trigger edit function
                    } else if (action === "delete") {
                        console.log(`Deleting Plan ID: ${planDataId}`);
                        // if (confirm("Are you sure you want to delete this plan?")) {
                        //     // Call delete function here
                        // }
                        errorMessageBox.style.zIndex = 300; 
                        errorMessageBox.classList.add("open-error-message-box");
                        background.style.display = "flex";
                        errorTitle.innerHTML = "Delete";
                        errorMessageLogin.innerHTML = "Are you sure you want to delete this plan?";
                    }

                    menu.style.display = "none"; // Close dropdown after selection
                    activeDropdown = null;
                });
            });
        });

        // Close dropdown if clicked outside
        document.addEventListener("click", function () {
            if (activeDropdown) {
                activeDropdown.style.display = "none";
                activeDropdown = null;
            }
        });
    });



    window.sortTable = function (columnIndex, isDate = false, isNumeric = false, isDuration = false) {
        const table = document.querySelector(".plan-table tbody");
        const rows = Array.from(table.querySelectorAll("tr"));

        let sortedRows = rows.sort((rowA, rowB) => {
            let cellA = rowA.children[columnIndex].textContent.trim();
            let cellB = rowB.children[columnIndex].textContent.trim();

            if (isDate) {
                return new Date(cellA) - new Date(cellB); // Sort by date
            } else if (isNumeric) {
                if (cellA === "N/A") cellA = "0";
                if (cellB === "N/A") cellB = "0";
                return parseInt(cellA) - parseInt(cellB); // Sort numerically
            } else if (isDuration) {
                let numA = parseInt(cellA); // Extract number (e.g., "3 months" -> 3)
                let numB = parseInt(cellB);
                return numA - numB;
            } else {
                return cellA.localeCompare(cellB); // Sort alphabetically
            }
        });

        table.innerHTML = "";
        sortedRows.forEach(row => table.appendChild(row));
    };


    window.searchTable = function searchTable() {
    // Get the input value and convert to lowercase for case-insensitive search
    const searchQuery = document.getElementById('search').value.toLowerCase();
    
    // Get all table rows in the tbody
    const rows = document.querySelectorAll('.plan-table tbody tr');

    // Loop through the rows
    rows.forEach(row => {
        // Get the text content of each cell in the row (except the first cell)
        const cells = row.querySelectorAll('td');
        const id = cells[0].textContent.toLowerCase();
        const name = cells[1].textContent.toLowerCase();
        const validity = cells[2].textContent.toLowerCase();
        const session = cells[3].textContent.toLowerCase();
        const amount = cells[4].textContent.toLowerCase(); // Assuming the name is in the second column (index 1)

        // If the name matches the search query, show the row, otherwise hide it
        if (id.includes(searchQuery) || name.includes(searchQuery) || validity.includes(searchQuery) || session.includes(searchQuery) || amount.includes(searchQuery)) {
            row.style.display = '';  // Show row
        } else {
            row.style.display = 'none';  // Hide row
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    
    const editPlanButton = document.querySelector(".editPlan");

    addPlanButton.addEventListener("click", function () {
        planModal.style.display = "flex"; 
        background.style.display = "flex";
        planEdit.style.display = "none";
        planModalTitle.innerHTML = "Add Plan";
        planAdd.style.display = "flex";
        planIdInput.value = null;
        planNameInput.value = null;
        planAmountInput.value = null;
        planValidityInput.value = null; // example value = "12 months"
        planSessionsInput.value = null; // it is a dropdown
    });

    editPlanButton.addEventListener("click", function () {
        planModal.style.display = "flex"; 
        background.style.display = "flex";
        planEdit.style.display = "flex";
        planModalTitle.innerHTML = "Edit Plan";
        planAdd.style.display = "none";
    });

    planAdd.addEventListener("click", function () {
        // Get input values inside the event listener
        const planId = document.getElementById("planId").value.trim();
        const planName = document.getElementById("planName").value.trim();
        const planAmount = document.getElementById("planAmount").value.trim();
        const planValidity = document.getElementById("planValidity").value.trim();
        const planSessions = document.getElementById("planSessions").value.trim();

        if (!planId || !planName || !planAmount || !planValidity || !planSessions) {
            errorMessageBox.classList.add("open-error-message-box");
            confirmErrorMessageBox.style.display = "none";
            closeErrorMessageBox.style.display = "none";
            errorTitle.innerHTML = "Error";
            errorMessageLogin.innerHTML = "Please input all fields.";
            background.style.display = "flex";
            background.style.zIndex = "299";
            errorMessageBox.style.zIndex = "300";

            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.zIndex = "200";
                confirmErrorMessageBox.style.display = "block";
                closeErrorMessageBox.style.display = "block";
            }, 2000);
        } else {
            errorMessageBox.classList.add("open-error-message-box");
            confirmErrorMessageBox.style.display = "none";
            closeErrorMessageBox.style.display = "none";
            errorTitle.innerHTML = "Add Plan";
            errorMessageLogin.innerHTML = "New plan added successfully!";
            background.style.display = "flex";
            background.style.zIndex = "299";
            errorMessageBox.style.zIndex = "300";

            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
                background.style.zIndex = "200";
                planModal.style.display = "none";
                confirmErrorMessageBox.style.display = "block";
                closeErrorMessageBox.style.display = "block";
            }, 2000);

            // console.log("Plan Added:", { planId, planName, planAmount, planValidity, planSessions });
        }
    });

    planEdit.addEventListener("click", function () {
        // Get input values inside the event listener
        const planId = document.getElementById("planId").value.trim();
        const planName = document.getElementById("planName").value.trim();
        const planAmount = document.getElementById("planAmount").value.trim();
        const planValidity = document.getElementById("planValidity").value.trim();
        const planSessions = document.getElementById("planSessions").value.trim();

        if (!planId || !planName || !planAmount || !planValidity || !planSessions) {
            errorMessageBox.classList.add("open-error-message-box");
            confirmErrorMessageBox.style.display = "none";
            closeErrorMessageBox.style.display = "none";
            errorTitle.innerHTML = "Error";
            errorMessageLogin.innerHTML = "Please input all fields.";
            background.style.display = "flex";
            background.style.zIndex = "299";
            errorMessageBox.style.zIndex = "300";

            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.zIndex = "200";
                confirmErrorMessageBox.style.display = "block";
                closeErrorMessageBox.style.display = "block";
            }, 2000);
        } else {
            errorMessageBox.classList.add("open-error-message-box");
            confirmErrorMessageBox.style.display = "none";
            closeErrorMessageBox.style.display = "none";
            errorTitle.innerHTML = "Edit Plan";
            errorMessageLogin.innerHTML = "Plan edited successfully!";
            background.style.display = "flex";
            background.style.zIndex = "299";
            errorMessageBox.style.zIndex = "300";

            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
                background.style.zIndex = "200";
                planModal.style.display = "none";
                confirmErrorMessageBox.style.display = "block";
                closeErrorMessageBox.style.display = "block";
            }, 2000);

            // console.log("Plan Added:", { planId, planName, planAmount, planValidity, planSessions });
        }
    });

    planClose.addEventListener("click", function () {
        planModal.style.display = "none"; 
        background.style.display = "none";
    });

    // Close modal when clicking cancel
    closeErrorMessageBox.onclick = function () {
        errorMessageBox.classList.remove("open-error-message-box");
        background.style.display = "none";
    };

    // Close modal when clicking cancel
    document.getElementById("closePlanModal").onclick = function () {
        errorMessageBox.classList.remove("open-error-message-box");
        background.style.zIndex = "200";
    };

    // Confirm action
    document.getElementById("confirm-error-message-box").onclick = function () {
        errorMessageBox.classList.remove("open-error-message-box");
        background.style.display = "none";
        background.style.zIndex = "200";
        planModal.style.display = "none";
    };
});


} else if(role === 'trainer') {
    document.addEventListener("DOMContentLoaded", function () {
        const editSchedule = document.querySelector(".addPlan");
        const confirmSchedule = document.querySelector(".confirm-schedule");
        const closeSchedule = document.querySelector(".close-schedule");
        const schedule = document.querySelector(".schedule-confirmation");
    
        editSchedule.addEventListener("click", function () {
            schedule.style.display = "flex"; // Toggles sidebar visibility
        });

        confirmSchedule.addEventListener("click", function () {
            schedule.style.display = "none"; // Toggles sidebar visibility
            errorMessageBox.classList.add("open-error-message-box");
            confirmErrorMessageBox.style.display = "none";
            closeErrorMessageBox.style.display = "none";
            errorTitle.innerHTML = "Edit Plan";
            errorMessageLogin.innerHTML = "Schedule edited successfully!";
            background.style.display = "flex";
            background.style.zIndex = "299";
            errorMessageBox.style.zIndex = "300";

            setTimeout(() => {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
                background.style.zIndex = "200";
                planModal.style.display = "none";
                confirmErrorMessageBox.style.display = "block";
                closeErrorMessageBox.style.display = "block";
            }, 2000);
        });

        closeSchedule.addEventListener("click", function () {
            schedule.style.display = "none"; // Toggles sidebar visibility
        });
    });

    
}



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
            if(role === 'admin'){
                window.location.href = "login.html"; // Adjust according to your logout logic
            } else if (role === 'cashier') {
                window.location.href = "../login.html"; // Adjust according to your logout logic
            } else {
                window.location.href = "../login.html"; // Adjust according to your logout logic
            }
        };
    } else {
        console.error("One or more required elements are missing.");
    }
});
