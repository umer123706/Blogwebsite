const articles = [
    {
        id: "network",
        cat: "Networking",
        title: "How to Troubleshoot a Network Connection: A Complete Beginner's Guide",
        desc: "Learn a logical, step-by-step process for diagnosing network problems.",
        icon: "⌁",
        url: "blog/network-troubleshooting.html"
    },
    {
        id: "windows",
        cat: "Windows",
        title: "10 Windows Troubleshooting Checks You Can Try First",
        desc: "A practical checklist for diagnosing common Windows problems.",
        icon: "▣",
        url: "blog/windows-troubleshooting.html"
    },
    {
        id: "linux",
        cat: "Linux",
        title: "15 Linux Commands Every Beginner Should Know",
        desc: "A practical introduction to files, processes, storage, networking and logs.",
        icon: "⌘",
        url: "blog/linux-commands.html"
    },
    {
        id: "dns",
        cat: "Networking",
        title: "What Is DNS and Why Does It Matter?",
        desc: "Understand DNS and learn how to troubleshoot common name-resolution problems.",
        icon: "⌁",
        url: "blog/dns-guide.html"
    },
    {
        id: "ai",
        cat: "AI & Technology",
        title: "How AI Can Help With Technical Documentation",
        desc: "Learn how AI can help create SOPs, troubleshooting guides, checklists and technical documentation.",
        icon: "✦",
        url: "blog/ai-technical-documentation.html"
    },
    {
        id: "wifi",
        cat: "IT Support",
        title: "Wi-Fi Connected but No Internet: A Simple Troubleshooting Flow",
        desc: "Follow a logical workflow to diagnose Wi-Fi and internet connectivity problems.",
        icon: "⚙",
        url: "blog/wifi-no-internet.html"
    },
    {
        id: "tools",
        cat: "Software & Tools",
        title: "Essential Tools for a Beginner IT Support Technician",
        desc: "Build a practical toolkit for computer support, networking and troubleshooting.",
        icon: "▤",
        url: "blog/software-tools.html"
    },
    {
        id: "ip",
        cat: "Networking",
        title: "How to Find Your IP Address on Windows",
        desc: "Learn how to find your IPv4 address, IPv6 address, default gateway and DNS information.",
        icon: "⌁",
        url: "blog/ip-address-windows.html"
    },
    {
        id: "disk",
        cat: "Windows",
        title: "How to Check Free Disk Space on Windows",
        desc: "Learn several ways to check storage space and identify disk-space problems.",
        icon: "▣",
        url: "blog/disk-space-windows.html"
    }
];


// -----------------------------------------
// ARTICLE SEARCH & FILTER
// -----------------------------------------

const grid = document.getElementById("articleGrid");
const search = document.getElementById("searchInput");
const filter = document.getElementById("categoryFilter");
const noResults = document.getElementById("noResults");


function renderArticles() {

    if (!grid) return;

    const query = search
        ? (search.value || "").toLowerCase().trim()
        : "";

    const category = filter
        ? filter.value
        : "All";


    const filteredArticles = articles.filter(article => {

        const matchesCategory =
            category === "All" ||
            article.cat === category;

        const searchableText =
            `${article.title} ${article.desc} ${article.cat}`
            .toLowerCase();

        const matchesSearch =
            !query ||
            searchableText.includes(query);

        return matchesCategory && matchesSearch;
    });


    grid.innerHTML = filteredArticles.map(article => `

        <article class="article">

            <div class="article-visual">
                ${article.icon}
            </div>

            <div class="article-body">

                <span class="tag">
                    ${article.cat}
                </span>

                <h3>
                    ${article.title}
                </h3>

                <p>
                    ${article.desc}
                </p>

                <a
                    class="read-btn"
                    href="${article.url}">
                    Read full guide →
                </a>

            </div>

        </article>

    `).join("");


    if (noResults) {
        noResults.hidden = filteredArticles.length !== 0;
    }
}


// Initial article display
renderArticles();


// Search
if (search) {

    search.addEventListener(
        "input",
        renderArticles
    );

}


// Category filter
if (filter) {

    filter.addEventListener(
        "change",
        renderArticles
    );

}


// -----------------------------------------
// CATEGORY CARDS
// -----------------------------------------

document
    .querySelectorAll(".category")
    .forEach(category => {

        category.addEventListener(
            "click",
            () => {

                const selectedCategory =
                    category.dataset.category;

                if (filter) {

                    filter.value =
                        selectedCategory;

                }

                renderArticles();

            }
        );

    });


// -----------------------------------------
// MOBILE MENU
// -----------------------------------------

const menuButton =
    document.querySelector(".menu-btn");

const navigation =
    document.querySelector(".nav");


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navigation.classList.remove(
                        "open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

}


// -----------------------------------------
// NEWSLETTER FORM
// -----------------------------------------

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            newsletterForm.reset();

            showToast(
                "Thanks! Newsletter signup will be available soon."
            );

        }
    );

}


// -----------------------------------------
// TOAST MESSAGE
// -----------------------------------------

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        3500
    );

}


// -----------------------------------------
// COPYRIGHT YEAR
// -----------------------------------------

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}
