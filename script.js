/* =====================================================
   NOTIFICATION SYSTEM
===================================================== */


/* ================= GET HTML ELEMENTS ================= */

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


/* ================= NOTIFICATION DATA ================= */

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

    /* Clear previous notifications */

    notificationList.innerHTML = "";


    /* Check if notifications exist */

    if (notifications.length === 0) {

        noNotifications.style.display = "block";

        notificationCount.style.display = "none";

        return;

    }


    /* Hide empty message */

    noNotifications.style.display = "none";


    /* Show notification count */

    notificationCount.style.display = "flex";


    /* Loop through notifications */

    notifications.forEach(function(notification) {


        /* Create notification element */

        const notificationItem =
            document.createElement("div");


        notificationItem.className =
            "notification-item";


        /* Create notification content */

        notificationItem.innerHTML = `

            <strong>
                ${notification.title}
            </strong>

            <p>
                ${notification.message}
            </p>

            <small>
                ${notification.time}
            </small>

            ${
                notification.unread

                ?

                `<br>
                 <button class="read-btn">
                    Mark as read
                 </button>`

                :

                `<br>
                 <small>✓ Read</small>`
            }

        `;


        /* Add notification to panel */

        notificationList.appendChild(
            notificationItem
        );


        /* Find Mark as Read button */

        const readButton =
            notificationItem.querySelector(
                ".read-btn"
            );


        /* If notification is unread */

        if (readButton) {

            readButton.addEventListener(
                "click",

                function(event) {

                    /*
                       Prevent notification
                       panel from closing
                    */

                    event.stopPropagation();


                    /* Mark notification as read */

                    notification.unread = false;


                    /* Refresh notifications */

                    displayNotifications();

                }
            );

        }

    });


    /* ================= COUNT UNREAD ================= */

    const unreadCount =
        notifications.filter(
            function(notification) {

                return notification.unread;

            }
        ).length;


    /* Update badge */

    notificationCount.textContent =
        unreadCount;


    /* Hide badge when count = 0 */

    if (unreadCount === 0) {

        notificationCount.style.display = "none";

    } else {

        notificationCount.style.display = "flex";

    }

}


/* =====================================================
   OPEN / CLOSE NOTIFICATION PANEL
===================================================== */

notificationBtn.addEventListener(
    "click",

    function(event) {

        /* Prevent click from reaching document */

        event.stopPropagation();


        if (
            notificationPanel.style.display === "block"
        ) {

            notificationPanel.style.display = "none";

        } else {

            notificationPanel.style.display = "block";

        }

    }
);


/* =====================================================
   CLOSE PANEL WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",

    function(event) {

        if (
            !event.target.closest(".notification")
        ) {

            notificationPanel.style.display =
                "none";

        }

    }
);


/* =====================================================
   LOAD NOTIFICATIONS
===================================================== */

displayNotifications();