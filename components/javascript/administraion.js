// trainers.js

import { cashiers } from './data.js';

const role = localStorage.getItem('role');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

setInterval(() => {
    let currentDateTime = new Date();
    let dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
    let timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    dateElement.innerHTML = currentDateTime.toLocaleDateString('en-US', dateOptions);
    timeElement.innerHTML = currentDateTime.toLocaleTimeString('en-US', timeOptions);
}, 1000);



const tableBody = document.querySelector(".active-trainers-lists");

function populateTable() {
    tableBody.innerHTML = "";
    cashiers.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.dayOff}</td>
            <td>${member.contact}</td>
            <td>${member.status}</td>
            <td>
                <select class="action-dropdown" data-id="${member.id}">
                    <option value="" selected disabled>Action</option>
                    <option class="btn-view" value="view">View</option>
                    <option class="btn-edit" value="edit">Edit</option>
                    <option class="btn-delete" value="delete">Delete</option>
                </select>
            </td>
        `;
        tableBody.appendChild(row);
    });

    attachEventListeners();
}

let memberToDelete = null;

function attachEventListeners() {
    document.querySelectorAll(".action-dropdown").forEach(dropdown => {
        dropdown.addEventListener("change", function () {
            const trainerId = this.getAttribute("data-id");
            const selectedAction = this.value;
            this.selectedIndex = 0;

            if (selectedAction === "view") {
                openViewModal(trainerId);
            } else if (selectedAction === "sched") {
                openScheduleModal(trainerId);
            }  else if (selectedAction === "edit") {
                openEditModal(trainerId);
            } else if (selectedAction === "delete") {
                openDeleteConfirmationModal(trainerId);
            }
        });
    });
}

function openViewModal(trainerId) {
    const trainer = cashiers.find(m => m.id === trainerId);
    if (!trainer) return;

    document.getElementById("viewTrainerID").value = trainer.id;
    document.getElementById("viewTrainerName").value = trainer.name;
    document.getElementById("viewTrainerNickname").value = trainer.nickname;
    document.getElementById("viewTrainerContact").value = trainer.contact;
    document.getElementById("viewTrainerAddress").value = trainer.address;
    document.getElementById("viewTrainerDateHired").value = trainer.dateHired;
    document.getElementById("viewTrainerEmail").value = trainer.email;
    document.getElementById("viewTrainerStatus").value = trainer.status;
    

    document.getElementById("viewTrainerModal").style.display = "block";
}

function openEditModal(trainerId) {
    const trainer = cashiers.find(m => m.id === trainerId);
    if (!trainer) return;

    console.log("Trainer Data:", trainer); // Debugging

    document.getElementById("editTrainerID").value = trainer.id;
    document.getElementById("editTrainerName").value = trainer.name;
    document.getElementById("editTrainerNickname").value = trainer.nickname;
    document.getElementById("editTrainerAddress").value = trainer.address;
    document.getElementById("editTrainerContact").value = trainer.contact;
    document.getElementById("editTrainerEmail").value = trainer.email;
    document.getElementById("editTrainerStatus").value = trainer.status;

    document.getElementById("editTrainerDateHired").value = trainer.dateHired


    document.getElementById("editTrainerModal").style.display = "block";
    document.getElementById("editModal").style.display = "none";

    document.getElementById("saveEdit").onclick = function () {
        trainer.name = document.getElementById("editTrainerName").value;
        trainer.dateHired = document.getElementById("editTrainerDateHired").value; // FIXED
        trainer.contact = document.getElementById("editTrainerContact").value;
        trainer.email = document.getElementById("editTrainerEmail").value;
        trainer.status = document.getElementById("editTrainerStatus").value;

        localStorage.setItem("cashiers", JSON.stringify(cashiers));

        document.getElementById("editTrainerModal").style.display = "none";
        const editModal = document.getElementById("editModal");
        editModal.style.display = "block";

        setTimeout(() => {
            editModal.style.display = "none";
        }, 2000);

        populateTable();
    };
}


document.getElementById("closeViewModal").addEventListener("click", () => {
    document.getElementById("viewTrainerModal").style.display = "none";
});

document.getElementById("closeEditModal").addEventListener("click", () => {
    document.getElementById("editTrainerModal").style.display = "none";
});

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
        const plan = cells[2].textContent.toLowerCase();
        const end = cells[3].textContent.toLowerCase(); // Assuming the name is in the second column (index 1)
        // If the name matches the search query, show the row, otherwise hide it
        if (id.includes(searchQuery) || name.includes(searchQuery) || plan.includes(searchQuery) || end.includes(searchQuery)) {
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


document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("addMemberModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const cancelBtn = document.querySelector(".cancel-btn");
    const form = document.getElementById("addMemberForm");
    const tableBody = document.querySelector(".active-trainers-lists");
    const successModal = document.getElementById("successModal");

    let cashiers = [];

    // Open Modal
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "flex";
        generateMemberID(); // Generate ID on open
    });

    // Close Modal on Cancel
    cancelBtn.addEventListener("click", function () {
        modal.style.display = "none";
        resetForm(); // Reset form when closing
    });

    // Close Modal when clicking outside
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            resetForm();
        }
    };

    // Auto-generate Member ID
    function generateMemberID() {
        let lastMember = cashiers[cashiers.length - 1]; 
        let lastID = lastMember ? parseInt(lastMember.id.replace("C", "")) : 18; 
        document.getElementById("trainerID").value = `C${lastID + 1}`;
    }

    // Reset Form
    function resetForm() {
        form.reset(); // Clears all input fields
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let newMember = {
            id: document.getElementById("trainerID").value,
            name: document.getElementById("trainerName").value,
            dayOff: document.getElementById("dayOff").value,
            contact: document.getElementById("contact").value,
            email: document.getElementById("email").value,
            status: document.getElementById("status").value,
        };

        cashiers.push(newMember);
        
        // Update table with new member
        addMemberToTable(newMember);

        modal.style.display = "none"; // Close modal
        
        successModal.style.display = "block";

        // Hide the modal after 2 seconds
        setTimeout(() => {
            successModal.style.display = "none";
        }, 2000);

        // Reset form
        form.reset();
    });

    // Function to add a new row to the table
    function addMemberToTable(cashiers) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${cashiers.id}</td>
            <td>${cashiers.name}</td>
            <td>${cashiers.dayOff}</td>
            <td>${cashiers.contact}</td>
            <td>${cashiers.status}</td>
            <td>
                <select class="action-dropdown" data-id="${cashiers.id}">
                    <option value="" selected disabled>Action</option>
                    <option class="btn-view" value="view">View</option>
                    <option class="btn-edit" value="edit">Edit</option>
                    <option class="btn-delete" value="delete">Delete</option>
                </select>
            </td>
        `;
        tableBody.appendChild(row);
    }
});


function openDeleteConfirmationModal(trainerId) {
    memberToDelete = trainerId;
    document.getElementById("deleteConfirmationModal").style.display = "block";
}

// Handle delete confirmation
document.getElementById("confirmDelete").addEventListener("click", function () {
    if (memberToDelete) {
        deleteMember(memberToDelete);
        memberToDelete = null;
    }
    document.getElementById("deleteConfirmationModal").style.display = "none";
});

// Handle delete cancellation
document.getElementById("cancelDelete").addEventListener("click", function () {
    document.getElementById("deleteConfirmationModal").style.display = "none";
});

function deleteMember(trainerId) {
    // Remove the member from the array
    const index = cashiers.findIndex(m => m.id === trainerId);
    if (index !== -1) {
        cashiers.splice(index, 1);
    }

    // Save updated trainers list to localStorage (if applicable)
    localStorage.setItem("cashiers", JSON.stringify(cashiers));

    // Refresh the table
    populateTable();

    // Show success modal
    document.getElementById("deleteSuccessModal").style.display = "block";

    // Hide success modal after 2 seconds
    setTimeout(() => {
        document.getElementById("deleteSuccessModal").style.display = "none";
    }, 2000);
}


// Function to open the schedule modal
function openScheduleModal(trainerId) {
    const modal = document.getElementById("scheduleModal");
    modal.style.display = "flex";

    // Update trainer details in modal
    const trainer = cashiers.find(t => t.id === trainerId);
    if (trainer) {
        document.getElementById("modalTrainerInfo").innerText = 
            `Trainer ID: ${trainer.id}  Trainer Name: ${trainer.name}`;
    }
}

// Close Modal when clicking the close button
document.getElementById("closeModalsched").addEventListener("click", function () {
    document.getElementById("scheduleModal").style.display = "none";
});

// Close Modal when clicking outside the modal content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("scheduleModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

