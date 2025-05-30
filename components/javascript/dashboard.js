import { admin, members, trainers, cashiers } from './data.js';

const emailInput = localStorage.getItem("email");
const role = localStorage.getItem('role');
console.log(role);
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
        // Extract first name only
        const firstName = userList.name.split(" ")[0];

        // Update UI elements
        document.getElementById('name').innerHTML = userList.name;
        document.getElementById('email').innerHTML = userList.email;
        document.getElementById('username').innerHTML = firstName;
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
            // window.location.href = "login.html"; // Adjust according to your logout logic
        };
    } else {
        console.error("One or more required elements are missing.");
    }
});

if(role === 'admin'){
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

            // Add click event listener
            trainerItem.addEventListener('click', () => {
                // alert(`Trainer: ${trainer.name}`);
                errorMessageBox.classList.add("open-error-message-box");
                errorMessageBox.style.width = '70%';
                errorMessageLogin.style.marginTop = '0'
                errorMessageBox.style.height = '95%';
                confirmErrorMessageBox.style.display = "none";
                closeErrorMessageBox.style.display = "none";
                errorTitle.innerHTML = "Schedule";
                errorMessageLogin.innerHTML =`
                <div class="schedule-month">
                    <div class="previous-month">&lt;</div>
                    <div class="month">March</div>
                    <div class="next-month">&gt;</div>
                </div>
                <table class="schedule-table">
                    <thead>
                        <th>Time/Day</th>
                        <th id="weekday1">Sunday</th>
                        <th id="weekday2">Monday</th>
                        <th id="weekday3">Tuesday</th>
                        <th id="weekday4">Wednesday</th>
                        <th id="weekday5">Thursday</th>
                        <th id="weekday6">Friday</th>
                        <th id="weekday7">Saturday</th>
                    </thead>
                    <tr>
                        <td>10:00 AM-12:00 NN<br>02:00 PM-04:00 PM<br>06:00 PM-08:00 PM</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">1</strong><p style="color: red;">Available</p><p style="color: red;">Available</p><p style="color: red;">Available</p></td>
                    </tr>
                    <tr>
                        <td>10:00 AM-12:00 NN<br>02:00 PM-04:00 PM<br>06:00 PM-08:00 PM</td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">2</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">3</strong><p style="color: red;">Available</p><p style="color: #8C0909;">Ava Fernandez</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">4</strong><p style="color: #8C0909;">Isabella Hughes</p><p style="color: #8C0909;">Nathaniel Scott</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">5</strong><p style="color: red;">Available</p><p style="color: red;">Available</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">6</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">2</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">8</strong><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Olivia Brooks</p><p style="color: black;">Unavailable</p></td>
                    </tr>
                    <tr>
                        <td>10:00 AM-12:00 NN<br>02:00 PM-04:00 PM<br>06:00 PM-08:00 PM</td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">9</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">10</strong><p style="color: red;">Available</p><p style="color: #8C0909;">Ava Fernandez</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">11</strong><p style="color: #8C0909;">Isabella Hughes</p><p style="color: #8C0909;">Nathaniel Scott</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">12</strong><p style="color: red;">Available</p><p style="color: red;">Available</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">13</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">14</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">15</strong><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Olivia Brooks</p><p style="color: black;">Unavailable</p></td>
                    </tr>
                    <tr>
                        <td>10:00 AM-12:00 NN<br>02:00 PM-04:00 PM<br>06:00 PM-08:00 PM</td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">16</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">17</strong><p style="color: red;">Available</p><p style="color: #8C0909;">Ava Fernandez</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">18</strong><p style="color: #8C0909;">Isabella Hughes</p><p style="color: #8C0909;">Nathaniel Scott</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">19</strong><p style="color: red;">Available</p><p style="color: red;">Available</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">20</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">21</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">22</strong><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Olivia Brooks</p><p style="color: black;">Unavailable</p></td>
                    </tr>
                    <tr>
                        <td>10:00 AM-12:00 NN<br>02:00 PM-04:00 PM<br>06:00 PM-08:00 PM</td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">23</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">24</strong><p style="color: red;">Available</p><p style="color: #8C0909;">Ava Fernandez</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">25</strong><p style="color: #8C0909;">Isabella Hughes</p><p style="color: #8C0909;">Nathaniel Scott</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">26</strong><p style="color: red;">Available</p><p style="color: red;">Available</p><p style="color: red;">Available</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">27</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Ethan Wallace</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">28</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">29</strong><p style="color: black;">Unavailable</p><p style="color: #8C0909;">Olivia Brooks</p><p style="color: black;">Unavailable</p></td>
                    </tr>
                    <tr>
                        <td>10:00 AM-12:00 NN<br>02:00 PM-04:00 PM<br>06:00 PM-08:00 PM</td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">30</strong><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p><p style="color: black;">Unavailable</p></td>
                        <td><strong style="color: #8C0909; display: flex; align-items: left;">31</strong><p style="color: red;">Available</p><p style="color: #8C0909;">Ava Fernandez</p><p style="color: red;">Available</p></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <div class="schedule-confirmation">
                    <button class="close-schedule" type="button" id="close-schedule">Close</button>
                </div>
                `;
                background.style.display = "flex";
                background.style.zIndex = "299";
                errorMessageBox.style.zIndex = "300";

                document.getElementById("close-schedule").addEventListener("click", closeSchedule);

    function closeSchedule() {
        errorMessageBox.classList.remove("open-error-message-box");
        background.style.display = "none";
    }
            });
    
            // Append the trainer item to the list
            trainerList.appendChild(trainerItem);
        });
    }

    window.onload = loadTrainers;
    
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

    document.getElementById("report").addEventListener("click", function () {
        background.style.display = "flex";
        const errorMessageBox = document.getElementById("error-message-box");
        const errorTitle = document.getElementById("error-title");
        const errorMessageLogin = document.getElementById("error-message-login");
        const confirmErrorMessageBox = document.getElementById("confirm-error-message-box");
        const closeErrorMessageBox = document.getElementById("close-error-message-box");
    
        confirmErrorMessageBox.style.display = "none";
        closeErrorMessageBox.style.marginLeft = "auto";
    
        if (errorMessageBox && errorMessageLogin && closeErrorMessageBox && confirmErrorMessageBox) {
            // Update modal content for the report
            errorMessageBox.classList.add("open-error-message-box");
            errorMessageBox.style.width = "40%";
            errorTitle.innerHTML = "Report";
            
            // Set up the report table inside the modal
            errorMessageLogin.innerHTML = `
                <div style="display: flex; justify-content: space-around; text-align: center;">
                    <div>
                        <p style="font-weight: normal; margin-bottom: 3%">Total Members last Month</p>
                        <p style="font-weight: normal; color: red; font-style: italic; margin-bottom: 3%">(February)</p>
                        <p style=" font-size: 500%; font-weight: bold; margin-bottom: 3%">8</p>
                    </div>
                    <div>
                        <p style="font-weight: normal; margin-bottom: 3%">Total Members this Month</p>
                        <p style="font-weight: normal; color: red; font-style: italic; margin-bottom: 3%">(March)</p>
                        <p style=" font-size: 500%; font-weight: bold; margin-bottom: 3%">18</p>
                    </div>
                </div>
            `;
    
            // Close modal when clicking the close button
            closeErrorMessageBox.onclick = function () {
                errorMessageBox.classList.remove("open-error-message-box");
                background.style.display = "none";
            };
        } else {
            console.error("One or more required elements are missing.");
        }
    });
} else if (role === "trainer") {
    document.addEventListener("DOMContentLoaded", function () {
        const today = new Date();
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];

        for (let i = 0; i < 7; i++) {
            let futureDate = new Date();
            futureDate.setDate(today.getDate() + i);

            let month = months[futureDate.getMonth()]; // Get full month name
            let day = futureDate.getDate();
            let formattedDate = `${month} ${day}`;
            let weekday = weekdays[futureDate.getDay()];

            document.getElementById(`day${i + 1}`).innerText = formattedDate;
            document.getElementById(`weekday${i + 1}`).innerText = weekday;
        }
    });
}





