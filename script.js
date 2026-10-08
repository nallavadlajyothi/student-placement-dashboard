// ================================
// MOBILE SIDEBAR
// ================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
});


// Close sidebar after clicking a link

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        navItems.forEach(function (nav) {
            nav.classList.remove("active");
        });

        item.classList.add("active");

        sidebar.classList.remove("open");

    });

});


// ================================
// DARK MODE
// ================================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️ Light Mode";

        localStorage.setItem(
            "placementTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙 Dark Mode";

        localStorage.setItem(
            "placementTheme",
            "light"
        );

    }

});


// Load saved theme

if (
    localStorage.getItem("placementTheme")
    === "dark"
) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️ Light Mode";

}


// ================================
// JOB SEARCH + FILTER
// ================================

const searchJob =
    document.getElementById("searchJob");

const jobFilter =
    document.getElementById("jobFilter");

const jobCards =
    document.querySelectorAll(".job-card");


function filterJobs() {

    const searchText =
        searchJob.value.toLowerCase();

    const selectedFilter =
        jobFilter.value;

    jobCards.forEach(function (card) {

        const company =
            card.querySelector(".company")
            .textContent
            .toLowerCase();

        const role =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        const category =
            card.dataset.role;

        const matchesSearch =
            company.includes(searchText) ||
            role.includes(searchText);

        const matchesFilter =
            selectedFilter === "all" ||
            category === selectedFilter;

        if (
            matchesSearch &&
            matchesFilter
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


searchJob.addEventListener(
    "input",
    filterJobs
);

jobFilter.addEventListener(
    "change",
    filterJobs
);


// ================================
// SAVE JOB
// ================================

function saveJob(button) {

    button.classList.toggle("saved");

    if (button.classList.contains("saved")) {

        button.textContent = "♥";

        showNotification(
            "Job saved to your favourites!"
        );

    } else {

        button.textContent = "♡";

        showNotification(
            "Job removed from favourites."
        );

    }

}


// ================================
// APPLY FOR JOB
// ================================

function applyJob(jobName, button) {

    button.textContent = "Applied ✓";

    button.disabled = true;

    button.style.background = "#27ae60";

    showNotification(
        "Application submitted for " + jobName
    );

}


// ================================
// NOTIFICATION
// ================================

const notification =
    document.getElementById("notification");

const notificationText =
    document.getElementById(
        "notificationText"
    );

let notificationTimer;


function showNotification(message) {

    notificationText.textContent = message;

    notification.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer =
        setTimeout(function () {

            notification.classList.remove(
                "show"
            );

        }, 3000);

}


// ================================
// SAVE APPLICATIONS
// ================================

const applyButtons =
    document.querySelectorAll(".apply-btn");

applyButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const applicationCount =
                localStorage.getItem(
                    "applicationCount"
                ) || 8;

            localStorage.setItem(
                "applicationCount",
                Number(applicationCount) + 1
            );

        }
    );

});


// ================================
// ACTIVE NAVIGATION
// ================================

window.addEventListener(
    "scroll",
    function () {

        const sections =
            document.querySelectorAll(
                "section[id]"
            );

        let current = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });

        navItems.forEach(function (item) {

            item.classList.remove("active");

            const href =
                item.getAttribute("href");

            if (href === "#" + current) {

                item.classList.add("active");

            }

        });

    }
);
