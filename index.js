document.getElementById("nextUserImgBtn").addEventListener("click", nextUser);
document.getElementById("prevUserImgBtn").addEventListener("click", prevUser);

let users = [];
let currentIndex = -1;

function fetchUser() {
    fetch("https://randomuser.me/api/")
        .then(response => response.json())
        .then(data => {
            users.push(data.results[0]);
            currentIndex = users.length - 1;
            displayUser(users[currentIndex]);
        })
        .catch(error => console.error("Error fetching user:", error));
}

function displayUser(user) {
    const introText = document.getElementById("intro-text");
    const userProfile = document.getElementById("user-profile");
    const prevUserImgBtn = document.getElementById("prevUserImgBtn");
    const nextUserImgBtn = document.getElementById("nextUserImgBtn");

    // Hide intro text after first user is shown
    introText.style.display = "none";

    // Show profile and buttons
    userProfile.classList.remove("hidden");
    prevUserImgBtn.classList.remove("hidden");
    nextUserImgBtn.classList.remove("hidden");

    userProfile.innerHTML = `
        <div class="card">
            <img src="${user.picture.large}" alt="User Image" style="border-radius: 50%; width: 150px;">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Location:</strong> ${user.location.city}, ${user.location.country}</p>
        </div>
    `;

    // Hide "Back" button if it's the first user
    prevUserImgBtn.style.display = currentIndex > 0 ? "inline-block" : "none";
}

// Move to the next user or fetch a new one
function nextUser() {
    if (currentIndex < users.length - 1) {
        currentIndex++;
        displayUser(users[currentIndex]);
    } else {
        fetchUser();
    }
}

// Move to the previous user
function prevUser() {
    if (currentIndex > 0) {
        currentIndex--;
        displayUser(users[currentIndex]);
    }
}
