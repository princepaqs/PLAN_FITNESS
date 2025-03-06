import { members, trainers } from './data.js'

const emailInput = localStorage.getItem("email");
// console.log("Email: ", emailInput);

if(!emailInput){
    alert("You are not logged in!");
}else{
    // alert("Welcome " + emailInput);
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

// Call the loadTrainers function when the page loads
window.onload = loadTrainers;

const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

let currentDateTime = new Date();

console.log(currentDateTime);

let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
let timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

dateElement.innerHTML = currentDateTime.toLocaleDateString('en-US', dateOptions);
timeElement.innerHTML = currentDateTime.toLocaleTimeString('en-US', timeOptions);

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

