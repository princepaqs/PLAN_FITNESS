import { members, trainers, cashiers } from './data.js';

const emailInput = localStorage.getItem("email");

if (!emailInput) {
    alert("You are not logged in!");
} else {
    // Find user in both trainers and cashiers lists
    const userList = [...cashiers, ...trainers].find(user => user.email === emailInput);

    if (!userList) {
        alert("Invalid user!");
    } else {
        // Extract first name only
        const firstName = userList.name.split(" ")[0];

        // Update UI elements
        document.getElementById('name').innerHTML = userList.name;
        document.getElementById('email').innerHTML = userList.email;
        document.getElementById('username').innerHTML = firstName;
    }
}

function loadTrainers() {
    const trainerList = document.getElementById('trainerList');

    trainers.forEach(trainer => {
        const trainerItem = document.createElement('li');
        trainerItem.classList.add('trainer-details');

        // Create the profile image element
        const trainerProfile = document.createElement('img');
        trainerProfile.src = trainer.profile;
        trainerProfile.alt = trainer.name;
        trainerProfile.classList.add('trainer-profile');

        // Create the trainer name element
        const trainerName = document.createElement('div');
        trainerName.classList.add('trainer-name');
        trainerName.textContent = trainer.name;

        // Append the profile image and name to the trainer item
        trainerItem.appendChild(trainerProfile);
        trainerItem.appendChild(trainerName);

        // Append the trainer item to the list
        trainerList.appendChild(trainerItem);
    });
}
window.onload = loadTrainers;

const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

setInterval(() => {
    let currentDateTime = new Date();
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
    let timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    dateElement.innerHTML = currentDateTime.toLocaleDateString('en-US', dateOptions);
    timeElement.innerHTML = currentDateTime.toLocaleTimeString('en-US', timeOptions);
}, 1000);

const tableBody = document.querySelector(".active-members-lists");

function populateTable() {
    members.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.joinDate}</td>
            <td>${member.endDate}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Call function to populate the table
populateTable();

window.sortTable = function(columnIndex, isDate = false) {
    const table = document.querySelector(".member-table tbody");
    const rows = Array.from(table.querySelectorAll("tr"));

    let sortedRows = rows.sort((rowA, rowB) => {
        let cellA = rowA.children[columnIndex].textContent.trim();
        let cellB = rowB.children[columnIndex].textContent.trim();

        if (isDate) {
            return new Date(cellA) - new Date(cellB); // Sort by date
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
    const rows = document.querySelectorAll('.member-table tbody tr');

    // Loop through the rows
    rows.forEach(row => {
        // Get the text content of each cell in the row (except the first cell)
        const cells = row.querySelectorAll('td');
        const id = cells[0].textContent.toLowerCase();
        const name = cells[1].textContent.toLowerCase();
        const start = cells[2].textContent.toLowerCase();
        const end = cells[3].textContent.toLowerCase(); // Assuming the name is in the second column (index 1)

        // If the name matches the search query, show the row, otherwise hide it
        if (id.includes(searchQuery) || name.includes(searchQuery) || start.includes(searchQuery) || end.includes(searchQuery)) {
            row.style.display = '';  // Show row
        } else {
            row.style.display = 'none';  // Hide row
        }
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



