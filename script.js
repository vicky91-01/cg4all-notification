
/* =====================================================
   CG4ALL - COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   1. LIBRARY ELEMENTS
===================================================== */

const librarySearch =
    document.getElementById("librarySearch");

const librarySearchForm =
    document.getElementById("librarySearchForm");

const libraryGrid =
    document.getElementById("libraryGrid");

const librarySort =
    document.getElementById("librarySort");

const filterButtons =
    document.querySelectorAll(".library-filter");

const libraryEmpty =
    document.getElementById("libraryEmpty");

const searchFeedback =
    document.getElementById("searchFeedback");

const resultCount =
    document.getElementById("resultCount");

const resetLibraryBtn =
    document.getElementById("resetLibrary");

const emptyReset =
    document.getElementById("emptyReset");


/* =====================================================
   2. LIBRARY VARIABLES
===================================================== */

let selectedCategory = "all";

let currentSearch = "";


/* =====================================================
   3. GET ALL RESOURCE CARDS
===================================================== */

function getLibraryCards() {

    return Array.from(
        libraryGrid.querySelectorAll(".library-card")
    );

}


/* =====================================================
   4. SEARCH, FILTER AND SORT
===================================================== */

function filterLibrary() {

    const cards = getLibraryCards();

    const search = currentSearch.trim().toLowerCase();

    let visibleCards = [];


    /* SEARCH AND CATEGORY FILTER */

    cards.forEach(card => {

        const title =
            (card.dataset.title || "").toLowerCase();

        const category =
            (card.dataset.category || "").toLowerCase();

        const description =
            (card.dataset.description || "").toLowerCase();

        const topics =
            (card.dataset.topics || "").toLowerCase();

        const cardText =
            card.textContent.toLowerCase();


        // Search all card information

        const matchesSearch =
            search === "" ||
            title.includes(search) ||
            category.includes(search) ||
            description.includes(search) ||
            topics.includes(search) ||
            cardText.includes(search);


        // Match selected category

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        // Display matching cards

        if (matchesSearch && matchesCategory) {

            card.hidden = false;

            visibleCards.push(card);

        } else {

            card.hidden = true;

        }

    });


    /* =================================================
       SORTING
    ================================================= */

    const sortValue = librarySort.value;


    if (sortValue === "popular") {

        visibleCards.sort((a, b) => {

            return Number(b.dataset.popular || 0) -
                   Number(a.dataset.popular || 0);

        });

    }


    else if (sortValue === "az") {

        visibleCards.sort((a, b) => {

            return a.dataset.title.localeCompare(
                b.dataset.title
            );

        });

    }


    else if (sortValue === "za") {

        visibleCards.sort((a, b) => {

            return b.dataset.title.localeCompare(
                a.dataset.title
            );

        });

    }


    else if (sortValue === "beginner") {

        const levels = {

            beginner: 1,

            intermediate: 2,

            advanced: 3

        };

        visibleCards.sort((a, b) => {

            return (levels[a.dataset.level] || 99) -
                   (levels[b.dataset.level] || 99);

        });

    }


    else if (sortValue === "lessons") {

        visibleCards.sort((a, b) => {

            return Number(b.dataset.lessons || 0) -
                   Number(a.dataset.lessons || 0);

        });

    }


    /* =================================================
       REORDER CARDS
    ================================================= */

    visibleCards.forEach(card => {

        libraryGrid.appendChild(card);

    });


    /* =================================================
       RESULT COUNT
    ================================================= */

    resultCount.textContent =
        `Showing ${visibleCards.length} of ${cards.length} resources`;


    /* =================================================
       EMPTY RESULT
    ================================================= */

    if (visibleCards.length === 0) {

        libraryEmpty.hidden = false;

        searchFeedback.textContent =
            "No resources found. Try another search.";

    } else {

        libraryEmpty.hidden = true;

        searchFeedback.textContent =
            search ? `${visibleCards.length} matching resources found.` : "";

    }

}


/* =====================================================
   5. LIVE SEARCH
===================================================== */

librarySearch.addEventListener("input", function() {

    currentSearch = this.value;

    filterLibrary();

});


/* =====================================================
   6. SEARCH BUTTON
===================================================== */

librarySearchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    currentSearch = librarySearch.value;

    filterLibrary();

});


/* =====================================================
   7. CATEGORY FILTER
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active class from all buttons

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        // Add active class to clicked button

        this.classList.add("active");


        // Get category

        selectedCategory =
            this.dataset.category.toLowerCase();


        // Apply filter

        filterLibrary();

    });

});


/* =====================================================
   8. SORTING DROPDOWN
===================================================== */

librarySort.addEventListener("change", function() {

    filterLibrary();

});


/* =====================================================
   9. RESET FILTERS
===================================================== */

function resetLibrary() {

    currentSearch = "";

    selectedCategory = "all";

    librarySearch.value = "";

    librarySort.value = "popular";


    filterButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.category === "all"
        );

    });


    filterLibrary();

}


resetLibraryBtn.addEventListener("click", resetLibrary);

emptyReset.addEventListener("click", resetLibrary);


/* =====================================================
   10. LEARNING PATH CLICK
===================================================== */

document.querySelectorAll(".path-card").forEach(path => {

    path.addEventListener("click", function(event) {

        event.preventDefault();

        selectedCategory =
            this.dataset.pathCategory;

        currentSearch = "";

        librarySearch.value = "";

        filterButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === selectedCategory
            );

        });

        filterLibrary();

        document.getElementById("library").scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =====================================================
   11. RESOURCE DETAILS MODAL
===================================================== */

const resourceModal =
    document.getElementById("resourceModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalCategory =
    document.getElementById("modalCategory");

const modalDescription =
    document.getElementById("modalDescription");

const modalLevel =
    document.getElementById("modalLevel");

const modalLessons =
    document.getElementById("modalLessons");

const closeResourceModal =
    document.getElementById("closeResourceModal");

const modalDone =
    document.getElementById("modalDone");


/* =====================================================
   12. EXPLORE RESOURCE BUTTON
===================================================== */

libraryGrid.addEventListener("click", function(event) {

    const exploreButton =
        event.target.closest(".explore-btn");

    if (!exploreButton) return;


    const card = exploreButton.closest(".library-card");

    if (!card) return;


    // Get selected card data

    modalTitle.textContent =
        card.dataset.title;

    modalDescription.textContent =
        card.dataset.description;

    modalCategory.textContent =
        card.dataset.category.toUpperCase();

    modalLevel.textContent =
        "Level: " + card.dataset.level;

    modalLessons.textContent =
        "Lessons: " + card.dataset.lessons;


    // Open modal

    resourceModal.hidden = false;

});


/* =====================================================
   13. CLOSE RESOURCE MODAL
===================================================== */

function closeModal() {

    resourceModal.hidden = true;

}

closeResourceModal.addEventListener("click", closeModal);

modalDone.addEventListener("click", closeModal);

resourceModal.addEventListener("click", function(event) {

    if (event.target === resourceModal) {

        closeModal();

    }

});


/* =====================================================
   14. QUICK GUIDE
===================================================== */

const quickGuideBtn =
    document.getElementById("quickGuideBtn");

const guideModal =
    document.getElementById("guideModal");

const closeGuideModal =
    document.getElementById("closeGuideModal");

const guideDone =
    document.getElementById("guideDone");


quickGuideBtn.addEventListener("click", function() {

    guideModal.hidden = false;

});


function closeGuide() {

    guideModal.hidden = true;

}

closeGuideModal.addEventListener("click", closeGuide);

guideDone.addEventListener("click", closeGuide);

guideModal.addEventListener("click", function(event) {

    if (event.target === guideModal) {

        closeGuide();

    }

});


/* =====================================================
   15. NOTIFICATION SYSTEM
===================================================== */

const notificationBtn =
    document.getElementById("notificationBtn");

const notificationPanel =
    document.getElementById("notificationPanel");

const notificationList =
    document.getElementById("notificationList");

const notificationCount =
    document.getElementById("notificationCount");

const noNotifications =
    document.getElementById("noNotifications");

const clearNotifications =
    document.getElementById("clearNotifications");


/* =====================================================
   NOTIFICATION DATA
===================================================== */

let notifications = [

    {
        id: 1,
        title: "New Course Added",
        message: "Python course has been added.",
        time: "5 minutes ago",
        unread: true
    },

    {
        id: 2,
        title: "New Job Opportunity",
        message: "A new developer job has been posted.",
        time: "20 minutes ago",
        unread: true
    },

    {
        id: 3,
        title: "Website Updated",
        message: "New features have been added.",
        time: "1 hour ago",
        unread: true
    }

];


/* =====================================================
   DISPLAY NOTIFICATIONS
===================================================== */

function displayNotifications() {

    notificationList.innerHTML = "";


    if (notifications.length === 0) {

        noNotifications.style.display = "block";

        notificationCount.style.display = "none";

        return;

    }


    noNotifications.style.display = "none";


    notifications.forEach(notification => {

        const item = document.createElement("div");

        item.className = "notification-item";


        const title = document.createElement("strong");

        title.textContent = notification.title;


        const message = document.createElement("p");

        message.textContent = notification.message;


        const time = document.createElement("small");

        time.textContent = notification.time;


        item.appendChild(title);

        item.appendChild(message);

        item.appendChild(time);


        if (notification.unread) {

            const readButton =
                document.createElement("button");

            readButton.className = "read-btn";

            readButton.textContent = "Mark as read";


            readButton.addEventListener("click", function() {

                notification.unread = false;

                displayNotifications();

            });


            item.appendChild(readButton);

        } else {

            const readStatus =
                document.createElement("small");

            readStatus.textContent = " ✓ Read";

            item.appendChild(readStatus);

        }


        notificationList.appendChild(item);

    });


    // Count unread notifications

    const unreadCount = notifications.filter(
        notification => notification.unread
    ).length;


    notificationCount.textContent = unreadCount;

    notificationCount.style.display =
        unreadCount > 0 ? "flex" : "none";

}


/* =====================================================
   OPEN / CLOSE NOTIFICATION PANEL
===================================================== */

notificationBtn.addEventListener("click", function(event) {

    event.stopPropagation();

    notificationPanel.classList.toggle("show");

});


/* =====================================================
   CLOSE ON OUTSIDE CLICK
===================================================== */

document.addEventListener("click", function(event) {

    if (!event.target.closest(".notification")) {

        notificationPanel.classList.remove("show");

    }

});


/* =====================================================
   CLEAR ALL NOTIFICATIONS
===================================================== */

clearNotifications.addEventListener("click", function() {

    notifications = [];

    displayNotifications();

});


/* =====================================================
   ESCAPE KEY - CLOSE MODALS AND PANEL
===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

        closeGuide();

        notificationPanel.classList.remove("show");

    }

});


/* =====================================================
   INITIALIZE ALL FEATURES
===================================================== */

filterLibrary();

displayNotifications();

console.log("CG4ALL Library Initialized Successfully!");

