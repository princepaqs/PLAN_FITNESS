// members.js

// import { members } from './data.js';

import { admin, members, trainers, cashiers } from './data.js';

const emailInput = localStorage.getItem("email");
const role = localStorage.getItem('role');
console.log(role);
// const background = document.getElementById("background");
// const errorTitle = document.getElementById("error-title");
// const errorMessageBox = document.getElementById("error-message-box");
// const errorMessageLogin = document.getElementById("error-message-login");
// const confirmErrorMessageBox = document.getElementById("confirm-error-message-box");
// const closeErrorMessageBox = document.getElementById("close-error-message-box");

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
        // document.getElementById('username').innerHTML = firstName;
        document.getElementById('profile-icon').src = userList.image;
        // document.getElementById('profile-icon-main').src = userList.image;
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



const tableBody = document.querySelector(".active-members-lists");

function populateTable() {
    tableBody.innerHTML = "";
    members.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.plan}</td>
            <td>${member.endDate}</td>
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
            const memberId = this.getAttribute("data-id");
            const selectedAction = this.value;
            this.selectedIndex = 0;

            if (selectedAction === "view") {
                openViewModal(memberId);
            } else if (selectedAction === "edit") {
                openEditModal(memberId);
            } else if (selectedAction === "delete") {
                openDeleteConfirmationModal(memberId);
            }
        });
    });
}

function openViewModal(memberId) {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    document.getElementById("viewMemberID").value = member.id;
    document.getElementById("viewMemberName").value = member.name;
    document.getElementById("viewMemberJoined").value = member.joinDate;
    document.getElementById("viewMemberContact").value = member.contact;
    document.getElementById("viewMemberEmail").value = member.email;
    document.getElementById("viewMemberStatus").value = member.status;
    document.getElementById("viewMemberPlan").value = member.plan;
    document.getElementById("viewMemberPlanStart").value = member.planStart;
    document.getElementById("viewMemberExpiry").value = member.endDate;
    document.getElementById("viewMemberTrainer").value = member.trainer;
    document.getElementById("viewMemberSchedule").value = member.schedule;
    document.getElementById("viewMemberSessions").value = member.sessions;

    document.getElementById("viewMemberModal").style.display = "block";
}

function openEditModal(memberId) {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    // Populate the edit modal with current data
    document.getElementById("editMemberID").value = member.id;
    document.getElementById("editMemberName").value = member.name;
    document.getElementById("editMemberJoined").value = member.joinDate;
    document.getElementById("editMemberContact").value = member.contact;
    document.getElementById("editMemberEmail").value = member.email;
    document.getElementById("editMemberStatus").value = member.status;
    document.getElementById("editMemberPlan").value = member.plan;
    document.getElementById("editMemberPlanStart").value = member.planStart;
    document.getElementById("editMemberExpiry").value = member.endDate;
    document.getElementById("editMemberTrainer").value = member.trainer;
    document.getElementById("editMemberSchedule").value = member.schedule;
    document.getElementById("editMemberSessions").value = member.sessions;

    document.getElementById("editMemberModal").style.display = "block";

    document.getElementById("editModal").style.display = "none";

    // Handle the save button
    document.getElementById("saveEdit").onclick = function () {
        member.name = document.getElementById("editMemberName").value;
        member.joinDate = document.getElementById("editMemberJoined").value;
        member.contact = document.getElementById("editMemberContact").value;
        member.email = document.getElementById("editMemberEmail").value;
        member.status = document.getElementById("editMemberStatus").value;
        member.plan = document.getElementById("editMemberPlan").value;
        member.planStart = document.getElementById("editMemberPlanStart").value;
        member.endDate = document.getElementById("editMemberExpiry").value; // FIXED
        member.trainer = document.getElementById("editMemberTrainer").value;
        member.schedule = document.getElementById("editMemberSchedule").value;
        member.sessions = document.getElementById("editMemberSessions").value;

        // Save changes to localStorage (if applicable)
        localStorage.setItem("members", JSON.stringify(members)); // FIXED

        // Close the modal
        document.getElementById("editMemberModal").style.display = "none";
        // Show success modal
        const editModal = document.getElementById("editModal");
        editModal.style.display = "block";

        // Hide the success modal after 2 seconds
        setTimeout(() => {
            editModal.style.display = "none";
        }, 2000);


        // Refresh the table
        populateTable();
    };
}
document.getElementById("closeViewModal").addEventListener("click", () => {
    document.getElementById("viewMemberModal").style.display = "none";
});

document.getElementById("closeEditModal").addEventListener("click", () => {
    document.getElementById("editMemberModal").style.display = "none";
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
    const tableBody = document.querySelector(".active-members-lists");
    const successModal = document.getElementById("successModal");

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
        let lastMember = members[members.length - 1]; 
        let lastID = lastMember ? parseInt(lastMember.id.replace("PF", "")) : 18; 
        document.getElementById("memberID").value = `PF${lastID + 1}`;
    }

    // Reset Form
    function resetForm() {
        form.reset(); // Clears all input fields
    }

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let newMember = {
            id: document.getElementById("memberID").value,
            name: document.getElementById("memberName").value,
            contact: document.getElementById("contact").value,
            email: document.getElementById("email").value,
            endDate: document.getElementById("dateOfJoin").value,
            status: "Active"
        };

        members.push(newMember);
        // alert("New member successfully added!"); // Show success message

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
    function addMemberToTable(member) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.plan}</td>
            <td>${member.endDate}</td>
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
    }
});


function openDeleteConfirmationModal(memberId) {
    memberToDelete = memberId;
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

function deleteMember(memberId) {
    // Remove the member from the array
    const index = members.findIndex(m => m.id === memberId);
    if (index !== -1) {
        members.splice(index, 1);
    }

    // Save updated members list to localStorage (if applicable)
    localStorage.setItem("members", JSON.stringify(members));

    // Refresh the table
    populateTable();

    // Show success modal
    document.getElementById("deleteSuccessModal").style.display = "block";

    // Hide success modal after 2 seconds
    setTimeout(() => {
        document.getElementById("deleteSuccessModal").style.display = "none";
    }, 2000);
}