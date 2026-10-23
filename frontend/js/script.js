
/* =========================================
   COLLEGE EVENT REGISTRATION
   Frontend JavaScript
========================================= */

/*
   DEMONSTRATION ONLY:
   This version stores demo data in the browser.
   Real accounts and registrations must use the
   backend and database.
*/


// 1. Event Information

const events = {
    "techfest": {
        name: "TechFest 2026",
        date: "15 November 2026",
        venue: "College Auditorium"
    },

    "rhythm": {
        name: "Rhythm & Beats",
        date: "20 November 2026",
        venue: "Open-Air Stage"
    },

    "startup": {
        name: "Startup Spark",
        date: "25 November 2026",
        venue: "Seminar Hall"
    },

    "sports": {
        name: "Campus Sports Day",
        date: "28 November 2026",
        venue: "College Ground"
    },

    "ai-day": {
        name: "AI Innovation Day",
        date: "2 December 2026",
        venue: "Computer Lab"
    },

    "canvas": {
        name: "Creative Canvas",
        date: "5 December 2026",
        venue: "Art Studio"
    }
};


// 2. Display Messages

function showMessage(elementId, message, type = "success") {
    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.textContent = message;
    element.className = `message ${type}`;
}


// 3. Event Search and Category Filter

const eventSearch = document.getElementById("eventSearch");
const categoryFilter = document.getElementById("categoryFilter");

function filterEvents() {
    const cards = document.querySelectorAll("#eventGrid .event-card");

    if (!cards.length) {
        return;
    }

    const searchText = eventSearch.value.trim().toLowerCase();
    const category = categoryFilter.value;

    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesSearch = text.includes(searchText);

        const matchesCategory =
            category === "all" || cardCategory === category;

        const visible = matchesSearch && matchesCategory;

        card.classList.toggle("hidden", !visible);

        if (visible) {
            visibleCount++;
        }
    });

    const noEventsMessage = document.getElementById("noEventsMessage");

    if (noEventsMessage) {
        noEventsMessage.classList.toggle("hidden", visibleCount !== 0);
    }
}

if (eventSearch && categoryFilter) {
    eventSearch.addEventListener("input", filterEvents);
    categoryFilter.addEventListener("change", filterEvents);
}


// 4. Fill the Selected Event Automatically

const eventNameSelect = document.getElementById("eventName");

if (eventNameSelect) {
    const parameters = new URLSearchParams(window.location.search);
    const selectedEvent = parameters.get("event");

    if (selectedEvent && events[selectedEvent]) {
        eventNameSelect.value = selectedEvent;
    }
}


// 5. Temporary Demo Account Storage

function getDemoAccounts() {
    try {
        return JSON.parse(
            localStorage.getItem("demoAccounts") || "[]"
        );
    } catch {
        return [];
    }
}


// 6. Signup Form

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function (eventObject) {
        eventObject.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const rollNumber = document.getElementById("signupRoll").value.trim();
        const email = document.getElementById("signupEmail").value.trim().toLowerCase();
        const department = document.getElementById("signupDepartment").value;

        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 8) {
            showMessage(
                "signupMessage",
                "Password must contain at least 8 characters.",
                "error"
            );
            return;
        }

        if (password !== confirmPassword) {
            showMessage(
                "signupMessage",
                "Passwords do not match.",
                "error"
            );
            return;
        }

        const accounts = getDemoAccounts();

        const accountExists = accounts.some(account =>
            account.email === email ||
            account.rollNumber.toLowerCase() === rollNumber.toLowerCase()
        );

        if (accountExists) {
            showMessage(
                "signupMessage",
                "An account with this email or roll number already exists in this browser.",
                "error"
            );
            return;
        }

        /*
           DEMO ONLY:
           Do not store real passwords in localStorage.
           A real application must send credentials to
           a backend using HTTPS and use secure password
           hashing on the server.
        */

        const demoAccount = {
            name,
            rollNumber,
            email,
            department
        };

        accounts.push({
            ...demoAccount,
            password
        });

        localStorage.setItem("demoAccounts", JSON.stringify(accounts));

        localStorage.setItem(
            "demoCurrentUser",
            JSON.stringify(demoAccount)
        );

        showMessage(
            "signupMessage",
            "Demo account created! Redirecting to login...",
            "success"
        );

        signupForm.reset();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);
    });
}


// 7. Login Form

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (eventObject) {
        eventObject.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const accounts = getDemoAccounts();

        const account = accounts.find(item =>
            item.email === email &&
            item.password === password
        );

        if (!account) {
            showMessage(
                "loginMessage",
                "Demo login failed. Check your details or create an account first.",
                "error"
            );
            return;
        }

        const currentUser = {
            name: account.name,
            rollNumber: account.rollNumber,
            email: account.email,
            department: account.department
        };

        localStorage.setItem(
            "demoCurrentUser",
            JSON.stringify(currentUser)
        );

        showMessage(
            "loginMessage",
            "Demo login successful! Opening your registrations...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "my-registrations.html";
        }, 1000);
    });
}


// 8. Get Current Demo User

function getCurrentDemoUser() {
    try {
        return JSON.parse(
            localStorage.getItem("demoCurrentUser") || "null"
        );
    } catch {
        return null;
    }
}


// 9. Registration Storage

function getRegistrations() {
    try {
        return JSON.parse(
            localStorage.getItem("demoRegistrations") || "[]"
        );
    } catch {
        return [];
    }
}

function saveRegistrations(registrations) {
    localStorage.setItem(
        "demoRegistrations",
        JSON.stringify(registrations)
    );
}


// 10. Event Registration Form

const eventRegistrationForm =
    document.getElementById("eventRegistrationForm");

if (eventRegistrationForm) {
    const currentUser = getCurrentDemoUser();

    if (currentUser) {
        document.getElementById("studentName").value = currentUser.name;
        document.getElementById("studentRoll").value = currentUser.rollNumber;
        document.getElementById("studentEmail").value = currentUser.email;
    }

    eventRegistrationForm.addEventListener(
        "submit",
        function (eventObject) {
            eventObject.preventDefault();

            const selectedEvent = document.getElementById("eventName").value;

            const studentName = document.getElementById("studentName").value.trim();
            const rollNumber = document.getElementById("studentRoll").value.trim();
            const email = document.getElementById("studentEmail").value.trim().toLowerCase();
            const phone = document.getElementById("studentPhone").value.trim();
            const year = document.getElementById("studentYear").value;

            if (!events[selectedEvent]) {
                showMessage(
                    "registerMessage",
                    "Please select a valid event.",
                    "error"
                );
                return;
            }

            /*
               DEMO ONLY:
               A production version must verify the logged-in
               student on the server and obtain their identity
               from the authenticated session.
            */

            const registrations = getRegistrations();

            const duplicate = registrations.some(registration =>
                registration.eventId === selectedEvent &&
                registration.rollNumber.toLowerCase() === rollNumber.toLowerCase()
            );

            if (duplicate) {
                showMessage(
                    "registerMessage",
                    "This roll number is already registered for this event in this browser.",
                    "error"
                );
                return;
            }

            const registration = {
                id: Date.now(),
                eventId: selectedEvent,
                eventName: events[selectedEvent].name,
                date: events[selectedEvent].date,
                venue: events[selectedEvent].venue,
                studentName,
                rollNumber,
                email,
                phone,
                year,
                status: "Registered"
            };

            registrations.push(registration);

            saveRegistrations(registrations);

            showMessage(
                "registerMessage",
                "Registration saved in this browser! Opening My Registrations...",
                "success"
            );

            eventRegistrationForm.reset();

            setTimeout(() => {
                window.location.href = "my-registrations.html";
            }, 1200);
        }
    );
}


// 11. Display My Registrations

function displayRegistrations() {
    const container = document.getElementById("registrationsContainer");

    if (!container) {
        return;
    }

    const currentUser = getCurrentDemoUser();

    if (!currentUser) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>Login to View Your Registrations</h2>

                <p>
                    Sign in to your demo account to view your saved events.
                </p>

                <a href="login.html" class="btn btn-primary">
                    Login
                </a>
            </div>
        `;
        return;
    }

    const registrations = getRegistrations().filter(registration =>
        registration.rollNumber.toLowerCase() ===
        currentUser.rollNumber.toLowerCase()
    );

    if (registrations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No Registrations Yet 📅</h2>

                <p>
                    You haven't registered for any events yet.
                    Explore upcoming events and join the fun!
                </p>

                <a href="events.html" class="btn btn-primary">
                    Explore Events
                </a>
            </div>
        `;
        return;
    }

    container.replaceChildren();

    registrations.forEach(registration => {
        const card = document.createElement("article");
        card.className = "registration-card";

        const details = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = registration.eventName;

        const date = document.createElement("p");
        date.textContent = `📅 ${registration.date}`;

        const venue = document.createElement("p");
        venue.textContent = `📍 ${registration.venue}`;

        const status = document.createElement("span");
        status.className = "status";
        status.textContent = registration.status;

        details.append(title, date, venue, status);

        const cancelButton = document.createElement("button");
        cancelButton.className = "btn btn-danger";
        cancelButton.textContent = "Cancel Registration";

        cancelButton.addEventListener("click", () => {
            cancelRegistration(registration.id);
        });

        card.append(details, cancelButton);

        container.appendChild(card);
    });
}


// 12. Cancel Registration

function cancelRegistration(registrationId) {
    const confirmed = window.confirm(
        "Are you sure you want to cancel this registration?"
    );

    if (!confirmed) {
        return;
    }

    const registrations = getRegistrations().filter(registration =>
        registration.id !== registrationId
    );

    saveRegistrations(registrations);

    displayRegistrations();
}


// 13. Initialize the Page

document.addEventListener("DOMContentLoaded", function () {
    displayRegistrations();
});

