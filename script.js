const applications = JSON.parse(localStorage.getItem("applications")) || [];
console.log("SCRIPT STARTED");

const searchInput = 
document.querySelector("#searchInput");

const form = document.querySelector("form");
const totalApplicationsElement =
document.querySelector("#totalApplications");
const interviewsElement = 
document.querySelector("#interviews");
const applicationsList = 
document.querySelector("#applicationList");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const company = document.querySelector("#company").value;
    const role = document.querySelector("#role").value; 
    const date = document.querySelector("#date").value;
    const status = document.querySelector("#status").value;
    const notes = document.querySelector("#notes").value;
    const link = document.querySelector("#link").value;
    const application = {
        company: company,
        role: role,
        date: date,
        status: status,
        notes: notes,
        link: link
    };
    applications.push(application);
    updateStats();
    localStorage.setItem("applications",
        JSON.stringify(applications)
    );

    
    console.log(application);
    const applicationsList = document.querySelector("#applicationList");
    const applicationElement = document.createElement("div");
    applicationElement.classList.add("application-card");
    applicationElement.innerHTML = `
    <h3>${company}</h3>
    <p><strong>Role:</strong> ${role}</p>
    <p><strong>Date Applied:</strong> ${date}</p>
    <p><strong>Status:</strong> ${status}</p>
    <p><strong>Notes:</strong> ${notes}</p>
    <p><strong>Link:</strong> <a href="${link}" target="_blank">${link}</a></p>
    <button class="delete-button">Delete</button>
    `;

    applicationsList.appendChild(applicationElement);
    const deleteButton = applicationElement.querySelector(".delete-button");
    deleteButton.addEventListener("click", function(){ 
        const applicationIndex = applications.indexOf(application);
        applications.splice(applicationIndex,1);
        localStorage.setItem("applications",JSON.stringify(applications));
        applicationElement.remove();
        updateStats();
       

    });
    form.reset();

});

searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredAppllications = applications.filter(function(application) {
        return  application.company.toLowerCase().includes(searchTerm) ||
                application.role.toLowerCase().includes(searchTerm);
    });
    console.log(filteredAppllications);
    const applicationCards = applicationsList.querySelectorAll(".application-card");

    applicationCards.forEach(function(card,index) {
        card.style.display = filteredAppllications.includes(applications[index]) ? "" : "none";
    });
});
function displayApplication(application){
    const applicationElement = document.createElement("div");
    applicationElement.classList.add("application-card");
    applicationElement.innerHTML = `
    <h3>${application.company}</h3>
    <p><strong>Role:</strong> ${application.role}</p>
    <p><strong>Date Applied:</strong> ${application.date}</p>
    <p><strong>Status:</strong> ${application.status}</p>
    <p><strong>Notes:</strong> ${application.notes}</p>
    <p><strong>Link:</strong> <a href="${application.link}" target="_blank">${application.link}</a></p>
    <button class="delete-button">Delete</button>
    `;
    applicationsList.appendChild(applicationElement);
    const deleteButton = applicationElement.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
        const applicationIndex = applications.indexOf(application);
        applications.splice(applicationIndex, 1);
        localStorage.setItem("applications", JSON.stringify(applications));
        applicationElement.remove();
        updateStats();
        
     });
}

applications.forEach(function(application) {
    displayApplication(application);
});

function updateStats(){
    totalApplicationsElement.textContent = applications.length;

    const interviewCount = applications.filter(function(application) {
        return application.status === "Interview";
    }).length;

    interviewsElement.textContent = interviewCount;

    const selectedCount = applications.filter(function(application){
        return application.status === "Selected";
    }).length;

    const selectedElement = document.querySelector("#selected");
    selectedElement.textContent = selectedCount;
}

updateStats();