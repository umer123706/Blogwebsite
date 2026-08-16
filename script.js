document.getElementById("year").textContent = new Date().getFullYear();

let state = { query: "", category: "All" };

/* ---------- Terminal boot animation ---------- */
const bootLines = [
  "$ techfix --index",
  "Loading categories ... done",
  "Indexing 8 articles ... done",
  "Search ready",
  "Status: ONLINE",
];
const terminalEl = document.getElementById("terminalLines");
let bootIndex = 0;
function typeBoot() {
  if (bootIndex >= bootLines.length) return;
  const line = document.createElement("div");
  line.textContent = bootLines[bootIndex];
  if (bootIndex === bootLines.length - 1) line.style.color = "var(--ok)";
  terminalEl.appendChild(line);
  bootIndex++;
  setTimeout(typeBoot, 450);
}
typeBoot();

/* ---------- Render categories ---------- */
const categoryGrid = document.getElementById("categoryGrid");
const categoryFilter = document.getElementById("categoryFilter");
const footerCategories = document.getElementById("footerCategories");

CATEGORIES.forEach((c) => {
  const card = document.createElement("button");
  card.className = "category";
  card.innerHTML = `<span>${c.icon}</span><h3>${c.name}</h3><p>${c.blurb}</p>`;
  card.addEventListener("click", () => {
    state.category = state.category === c.name ? "All" : c.name;
    syncFilterUI();
    renderArticles();
    document.getElementById("latest").scrollIntoView({ behavior: "smooth" });
  });
  categoryGrid.appendChild(card);

  const opt = document.createElement("option");
  opt.value = c.name;
  opt.textContent = c.name;
  categoryFilter.appendChild(opt);

  const link = document.createElement("a");
  link.href = "#latest";
  link.textContent = c.name;
  link.addEventListener("click", (e) => {
    e.preventDefault();
    state.category = c.name;
    syncFilterUI();
    renderArticles();
    showHome();
    document.getElementById("latest").scrollIntoView({ behavior: "smooth" });
  });
  footerCategories.appendChild(link);
});

function syncFilterUI() {
  categoryFilter.value = state.category;
  document.querySelectorAll(".category").forEach((el, i) => {
    el.classList.toggle("active", CATEGORIES[i].name === state.category);
  });
}

/* ---------- Render articles ---------- */
const articleGrid = document.getElementById("articleGrid");
const noResults = document.getElementById("noResults");

function articleCardHTML(a) {
  return `
    <button class="article-card" data-id="${a.id}">
      <span class="tag">[${a.category}]</span>
      <h3>${a.title}</h3>
      <p>${a.excerpt}</p>
      <div class="article-meta"><span>${a.readTime} min · ${a.level}</span><span class="read-link">Read →</span></div>
    </button>`;
}

function renderArticles() {
  const q = state.query.trim().toLowerCase();
  const filtered = ARTICLES.filter((a) => {
    const matchCat = state.category === "All" || a.category === state.category;
    const matchQ = !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  articleGrid.innerHTML = filtered.map(articleCardHTML).join("");
  noResults.hidden = filtered.length !== 0;

  articleGrid.querySelectorAll(".article-card").forEach((btn) => {
    btn.addEventListener("click", () => openArticle(btn.dataset.id));
  });
}

/* ---------- Search + filter controls ---------- */
const searchInput = document.getElementById("searchInput");
const headerSearch = document.getElementById("headerSearch");

searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  headerSearch.value = e.target.value;
  renderArticles();
});
headerSearch.addEventListener("input", (e) => {
  state.query = e.target.value;
  searchInput.value = e.target.value;
  showHome();
  renderArticles();
});
categoryFilter.addEventListener("change", (e) => {
  state.category = e.target.value;
  syncFilterUI();
  renderArticles();
});

/* ---------- Article detail view ---------- */
const homeView = document.getElementById("homeView");
const articleView = document.getElementById("articleView");
const articleContent = document.getElementById("articleContent");
const relatedGrid = document.getElementById("relatedGrid");

function openArticle(id) {
  const a = ARTICLES.find((x) => x.id === id);
  if (!a) return;

  articleContent.innerHTML = `
    <span class="tag">[${a.category}]</span>
    <h1>${a.title}</h1>
    <div class="article-meta detail-meta">${a.readTime} min read · ${a.level}</div>
    ${a.body.map((s) => `<div class="body-section"><h2>${s.h}</h2><p>${s.p}</p></div>`).join("")}
  `;

  const related = ARTICLES.filter((x) => x.id !== a.id && x.category === a.category)
    .concat(ARTICLES.filter((x) => x.id !== a.id && x.category !== a.category))
    .slice(0, 2);
  relatedGrid.innerHTML = related.map(articleCardHTML).join("");
  relatedGrid.querySelectorAll(".article-card").forEach((btn) => {
    btn.addEventListener("click", () => openArticle(btn.dataset.id));
  });

  homeView.hidden = true;
  articleView.hidden = false;
  window.scrollTo({ top: 0 });
}

document.getElementById("backBtn").addEventListener("click", showHome);
document.getElementById("logoLink").addEventListener("click", (e) => { e.preventDefault(); showHome(); });

function showHome() {
  homeView.hidden = false;
  articleView.hidden = true;
  window.scrollTo({ top: 0 });
}

/* ---------- Nav links (work from either view) ---------- */
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    showHome();
    setTimeout(() => {
      document.getElementById(link.dataset.target).scrollIntoView({ behavior: "smooth" });
    }, 30);
  });
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");
menuBtn.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

/* ---------- Newsletter (front-end only) ---------- */
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = document.getElementById("newsletterEmail");
  const msg = document.getElementById("newsletterMsg");
  const email = emailInput.value.trim();
  if (!email.includes("@")) {
    msg.textContent = "Enter a valid email address.";
    msg.hidden = false;
    return;
  }
  msg.textContent = `You're subscribed with ${email}.`;
  msg.hidden = false;
  emailInput.value = "";
});

/* ---------- Init ---------- */
syncFilterUI();
renderArticles();
