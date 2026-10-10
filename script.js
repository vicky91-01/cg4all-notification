
/* =====================================================
   CG4ALL NOTIFICATION SYSTEM
===================================================== */

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const notificationList = document.getElementById("notificationList");
const notificationCount = document.getElementById("notificationCount");
const noNotifications = document.getElementById("noNotifications");
const markAllReadBtn = document.getElementById("markAllRead");

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

function displayNotifications() {
    notificationList.innerHTML = "";

    noNotifications.style.display =
        notifications.length === 0 ? "block" : "none";

    notifications.forEach(notification => {
        const item = document.createElement("div");
        item.className = "notification-item";

        if (notification.unread) {
            item.classList.add("unread");
        }

        const title = document.createElement("strong");
        title.textContent = notification.title;

        const message = document.createElement("p");
        message.textContent = notification.message;

        const time = document.createElement("small");
        time.textContent = notification.time;

        item.append(title, message, time);

        if (notification.unread) {
            const readButton = document.createElement("button");
            readButton.className = "read-btn";
            readButton.textContent = "Mark as read";

            readButton.addEventListener("click", () => {
                notification.unread = false;
                displayNotifications();
            });

            item.appendChild(document.createElement("br"));
            item.appendChild(readButton);
        } else {
            const readStatus = document.createElement("small");
            readStatus.textContent = " ✓ Read";
            item.appendChild(document.createElement("br"));
            item.appendChild(readStatus);
        }

        notificationList.appendChild(item);
    });

    const unreadCount = notifications.filter(
        notification => notification.unread
    ).length;```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CG4ALL - Learning Library</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- ================= NAVBAR ================= -->
    <nav class="navbar">
        <a href="#home" class="logo">CG4<span>ALL</span></a>

        <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#desktop">Desktop</a>
            <a href="#services">Services</a>
            <a href="#library" class="nav-active">Library</a>
            <a href="#join">Join Us</a>
            <a href="#contact">Contact Us</a>

            <!-- Notification -->
            <div class="notification">
                <button id="notificationBtn" aria-label="Notifications"
                        aria-expanded="false">
                    🔔
                    <span id="notificationCount">3</span>
                </button>

                <div id="notificationPanel" class="notification-panel">
                    <div class="notification-header">
                        <h3>Notifications</h3>
                        <button id="markAllRead" class="mark-all-btn">
                            Mark all read
                        </button>
                    </div>

                    <div id="notificationList"></div>

                    <div id="noNotifications" class="no-notifications">
                        No notifications
                    </div>
                </div>
            </div>

            <button class="quick-guide"
                    onclick="document.getElementById('library').scrollIntoView({behavior:'smooth'})">
                Quick Guide
            </button>
        </div>
    </nav>

    <!-- ================= MAIN CONTENT ================= -->
    <main id="home">
        <section class="welcome-section">
            <span class="welcome-badge">A Trusted Platform for Learning & Solutions</span>
            <h1>Welcome to <span>CG4ALL</span></h1>
            <p>Explore our latest courses, services, and learning resources.</p>
        </section>

        <!-- Existing featured video -->
        <section class="video-section">
            <h2>Featured Video</h2>

            <div class="video-container">
                <iframe
                    src="https://www.youtube.com/embed/ptAiVYJCRNk"
                    title="CG4ALL Featured Video"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>

            <p class="video-note">
                Watch the featured CG4ALL video above.
            </p>
        </section>
    </main>

    <!-- ================= LIBRARY SECTION ================= -->
    <section class="library-section" id="library">

        <div class="library-container">

            <!-- Hero -->
            <div class="library-hero">
                <div class="library-hero-content">
                    <span class="library-tag">LEARN · PRACTICE · GROW</span>

                    <h2>Your Learning <span>Library</span></h2>

                    <p>
                        Explore programming, design, technology, and career
                        resources — all in one place.
                    </p>

                    <form class="library-search" id="librarySearchForm">
                        <span class="search-icon">⌕</span>
                        <input type="search" id="librarySearch"
                               placeholder="Search courses, topics, or skills..."
                               aria-label="Search library resources">
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div class="hero-illustration" aria-hidden="true">
                    <div class="book-stack">
                        <div class="book book-one">Programming</div>
                        <div class="book book-two">Web Development</div>
                        <div class="book book-three">Data Science</div>
                        <div class="book book-four">Design</div>
                        <div class="book book-five">Career Growth</div>
                    </div>

                    <div class="laptop">
                        <div class="laptop-screen">
                            <strong>Learn<br>Build<br>Grow</strong>
                            <span></span>
                        </div>
                        <div class="laptop-base"></div>
                    </div>
                </div>
            </div>

            <!-- Category filters -->
            <div class="library-categories" aria-label="Resource categories">
                <button class="library-filter active" data-category="all">
                    <span>▦</span> All Resources
                </button>
                <button class="library-filter" data-category="programming">
                    <span>&lt;/&gt;</span> Programming
                </button>
                <button class="library-filter" data-category="web">
                    <span>▣</span> Web Development
                </button>
                <button class="library-filter" data-category="data">
                    <span>▥</span> Data Science &amp; AI
                </button>
                <button class="library-filter" data-category="design">
                    <span>◉</span> Design
                </button>
                <button class="library-filter" data-category="cloud">
                    <span>☁</span> Cloud &amp; DevOps
                </button>
            </div>

            <!-- Resource heading -->
            <div class="library-title-row">
                <div>
                    <h3>Explore the Library</h3>
                    <p>Handpicked resources to build practical skills.</p>
                </div>

                <label class="sort-control">
                    <span>Sort by</span>
                    <select id="librarySort">
                        <option value="popular">Most Popular</option>
                        <option value="az">Name: A–Z</option>
                        <option value="beginner">Beginner First</option>
                    </select>
                </label>
            </div>

            <!-- Resource cards -->
            <div class="library-grid" id="libraryGrid">

                <article class="library-card"
                    data-category="programming"
                    data-level="beginner"
                    data-title="Java Programming"
                    data-popular="1">

                    <div class="resource-thumb thumb-java">
                        <span class="language-mark">♨</span>
                        <div class="thumb-code">class Java {<br>&nbsp; Learn();<br>}</div>
                        <span class="thumb-label">Programming</span>
                    </div>

                    <div class="resource-content">
                        <h4>Java Programming</h4>
                        <p>Learn core Java concepts with hands-on examples, exercises, and real-world projects.</p>

                        <div class="resource-meta">
                            <span class="level beginner-level">▮ Beginner</span>
                            <span>▤ 12 lessons</span>
                        </div>

                        <a href="#library" class="resource-link">Explore Resource →</a>
                    </div>
                </article>

                <article class="library-card"
                    data-category="web"
                    data-level="beginner"
                    data-title="Web Development"
                    data-popular="2">

                    <div class="resource-thumb thumb-web">
                        <div class="web-window">
                            <div class="window-dots">● ● ●</div>
                            <div class="web-logos">
                                <span>5</span><span>3</span><span>JS</span>
                            </div>
                        </div>
                        <span class="thumb-label">Development</span>
                    </div>

                    <div class="resource-content">
                        <h4>Web Development</h4>
                        <p>Learn HTML, CSS, JavaScript, and modern tools to build real-world web applications.</p>

                        <div class="resource-meta">
                            <span class="level beginner-level">▮ Beginner</span>
                            <span>▤ 18 lessons</span>
                        </div>

                        <a href="#library" class="resource-link">Explore Resource →</a>
                    </div>
                </article>

                <article class="library-card"
                    data-category="data"
                    data-level="intermediate"
                    data-title="Python for Data Science"
                    data-popular="3">

                    <div class="resource-thumb thumb-python">
                        <div class="python-mark">Py</div>
                        <div class="chart-art"><span></span><span></span><span></span><span></span></div>
                        <span class="thumb-label">Data Science &amp; AI</span>
                    </div>

                    <div class="resource-content">
                        <h4>Python for Data Science</h4>
                        <p>Work with Python, Pandas, NumPy, and data visualization to discover insights.</p>

                        <div class="resource-meta">
                            <span class="level intermediate-level">▮ Intermediate</span>
                            <span>▤ 10 lessons</span>
                        </div>

                        <a href="#library" class="resource-link">Explore Resource →</a>
                    </div>
                </article>

                <article class="library-card"
                    data-category="design"
                    data-level="beginner"
                    data-title="UI UX Design Fundamentals"
                    data-popular="4">

                    <div class="resource-thumb thumb-design">
                        <div class="design-window">
                            <div class="design-sidebar"></div>
                            <div class="design-shapes">
                                <span></span><span></span><span></span>
                                <i></i><i></i><i></i>
                            </div>
                        </div>
                        <span class="thumb-label">Design</span>
                    </div>

                    <div class="resource-content">
                        <h4>UI/UX Design Fundamentals</h4>
                        <p>Learn interface design principles and create attractive, user-friendly experiences.</p>

                        <div class="resource-meta">
                            <span class="level beginner-level">▮ Beginner</span>
                            <span>▤ 8 lessons</span>
                        </div>

                        <a href="#library" class="resource-link">Explore Resource →</a>
                    </div>
                </article>

                <article class="library-card"
                    data-category="cloud"
                    data-level="intermediate"
                    data-title="Cloud Computing and DevOps"
                    data-popular="5">

                    <div class="resource-thumb thumb-cloud">
                        <span class="cloud-symbol">☁</span>
                        <strong>Cloud &amp; DevOps</strong>
                        <span class="thumb-label">Infrastructure</span>
                    </div>

                    <div class="resource-content">
                        <h4>Cloud Computing &amp; DevOps</h4>
                        <p>Explore cloud infrastructure, deployment, version control, and DevOps fundamentals.</p>

                        <div class="resource-meta">
                            <span class="level intermediate-level">▮ Intermediate</span>
                            <span>▤ 14 lessons</span>
                        </div>

                        <a href="#library" class="resource-link">Explore Resource →</a>
                    </div>
                </article>

                <article class="library-card"
                    data-category="programming"
                    data-level="beginner"
                    data-title="C++ Programming"
                    data-popular="6">

                    <div class="resource-thumb thumb-cpp">
                        <div class="cpp-mark">C++</div>
                        <div class="cpp-code">&lt;/&gt;</div>
                        <span class="thumb-label">Programming</span>
                    </div>

                    <div class="resource-content">
                        <h4>C++ Programming</h4>
                        <p>Build a strong foundation in C++, problem-solving, and programming logic.</p>

                        <div class="resource-meta">
                            <span class="level beginner-level">▮ Beginner</span>
                            <span>▤ 15 lessons</span>
                        </div>

                        <a href="#library" class="resource-link">Explore Resource →</a>
                    </div>
                </article>

            </div>

            <p id="libraryEmpty" class="library-empty" hidden>
                No resources found. Try another search or category.
            </p>

            <!-- Learning paths -->
            <div class="learning-paths">
                <div class="paths-heading">
                    <div>
                        <h3>Popular Learning Paths</h3>
                        <p>Structured paths to help you go from beginner to job-ready.</p>
                    </div>
                    <a href="#learning-paths">View all learning paths →</a>
                </div>

                <div class="learning-path-grid" id="learning-paths">
                    <a href="#library" class="learning-path">
                        <span class="path-icon">&lt;/&gt;</span>
                        <div>
                            <h4>Start with Programming</h4>
                            <p>Build a strong foundation in programming.</p>
                        </div>
                        <span class="path-arrow">›</span>
                    </a>

                    <a href="#library" class="learning-path">
                        <span class="path-icon path-blue">▣</span>
                        <div>
                            <h4>Build Your First Website</h4>
                            <p>From basics to a complete project.</p>
                        </div>
                        <span class="path-arrow">›</span>
                    </a>

                    <a href="#library" class="learning-path">
                        <span class="path-icon path-pink">▥</span>
                        <div>
                            <h4>Explore AI &amp; Data</h4>
                            <p>Learn data analysis and machine learning.</p>
                        </div>
                        <span class="path-arrow">›</span>
                    </a>
                </div>
            </div>

        </div>
    </section>

    <!-- ================= FOOTER ================= -->
    <footer class="footer" id="contact">
        <p>© 2026 CG4ALL. Upskill with Intent.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

    notificationCount.textContent = unreadCount;
    notificationCount.style.display =
        unreadCount > 0 ? "flex" : "none";
}

notificationBtn.addEventListener("click", event => {
    event.stopPropagation();

    const isOpen = notificationPanel.classList.toggle("open");

    notificationBtn.setAttribute("aria-expanded", String(isOpen));
});

notificationPanel.addEventListener("click", event => {
    event.stopPropagation();
});

document.addEventListener("click", event => {
    if (!event.target.closest(".notification")) {
        notificationPanel.classList.remove("open");
        notificationBtn.setAttribute("aria-expanded", "false");
    }
});

markAllReadBtn.addEventListener("click", () => {
    notifications.forEach(notification => {
        notification.unread = false;
    });

    displayNotifications();
});

displayNotifications();


/* =====================================================
   LIBRARY SEARCH, FILTERS AND SORTING
===================================================== */

(function () {
    const section = document.getElementById("library");

    if (!section) return;

    const searchInput = section.querySelector("#librarySearch");
    const searchForm = section.querySelector("#librarySearchForm");
    const sortSelect = section.querySelector("#librarySort");
    const grid = section.querySelector("#libraryGrid");
    const emptyMessage = section.querySelector("#libraryEmpty");
    const filterButtons = section.querySelectorAll(".library-filter");

    let activeCategory = "all";

    function updateLibrary() {
        const query = searchInput.value.trim().toLowerCase();

        const cards = Array.from(
            grid.querySelectorAll(".library-card")
        );

        cards.forEach(card => {
            const title = card.dataset.title || "";
            const content = card.textContent || "";

            const matchesSearch =
                (title + " " + content).toLowerCase().includes(query);

            const matchesCategory =
                activeCategory === "all" ||
                card.dataset.category === activeCategory;

            card.hidden = !(matchesSearch && matchesCategory);
        });

        const visibleCards = cards.filter(card => !card.hidden);

        visibleCards.sort((a, b) => {
            if (sortSelect.value === "az") {
                return a.dataset.title.localeCompare(b.dataset.title);
            }

            if (sortSelect.value === "beginner") {
                const levelA = a.dataset.level === "beginner" ? 0 : 1;
                const levelB = b.dataset.level === "beginner" ? 0 : 1;

                return levelA - levelB ||
                    Number(a.dataset.popular) - Number(b.dataset.popular);
            }

            return Number(a.dataset.popular) -
                Number(b.dataset.popular);
        });

        visibleCards.forEach(card => {
            grid.appendChild(card);
        });

        emptyMessage.hidden = visibleCards.length !== 0;
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category;

            filterButtons.forEach(filter => {
                filter.classList.toggle("active", filter === button);
            });

            updateLibrary();
        });
    });

    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        updateLibrary();
    });

    searchInput.addEventListener("input", updateLibrary);
    sortSelect.addEventListener("change", updateLibrary);
})();


/* =====================================================
   QUICK GUIDE AND NAVIGATION
===================================================== */

document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});