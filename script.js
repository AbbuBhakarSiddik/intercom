/**
 * INTERCOM '26 - Main Application Logic
 * Minimalist, dynamic event portal with rulebook directory & smooth UI interactions.
 */

// 1. Rulebooks Dataset (Comprehensive Event List)
const rulebooksData = [
  {
    id: "algo-clash",
    name: "Code Sprint (AlgoClash)",
    category: "coding",
    teamSize: "1 - 2 Members",
    rounds: "2 Rounds (Online + On-Campus)",
    shortDesc: "Speed competitive programming contest testing data structures, algorithms, and logical problem-solving.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/algo-clash-rules.pdf",
    coordinator: "Karan Patel (+91 91234 56789)"
  },
  {
    id: "web-blitz",
    name: "Web Blitz (Design to Code)",
    category: "coding",
    teamSize: "1 - 3 Members",
    rounds: "3 Hours Live Sprint",
    shortDesc: "Design and implement modern responsive web applications adhering to given prompt, UX guidelines, and clean code.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/web-blitz-rules.pdf",
    coordinator: "Sneha Roy (+91 98765 12345)"
  },
  {
    id: "ai-odyssey",
    name: "GenAI & ML Hackathon",
    category: "tech",
    teamSize: "2 - 4 Members",
    rounds: "6 Hours Prototype Sprint",
    shortDesc: "Build groundbreaking generative AI agents, LLM applications, or vision models to solve modern enterprise challenges.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/genai-hack-rules.pdf",
    coordinator: "Dev Anand (+91 93456 78901)"
  },
  {
    id: "paper-pres",
    name: "Tech Eureka (Paper Presentation)",
    category: "tech",
    teamSize: "1 - 3 Members",
    rounds: "Abstract Review + PPT Defense",
    shortDesc: "Present novel research in Cloud Computing, Quantum Tech, Cybersecurity, IoT, and Next-Gen Architectures.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/paper-presentation-rules.pdf",
    coordinator: "Dr. R. Sharma (Faculty Convenor)"
  },
  {
    id: "bug-hunt",
    name: "Zero Day (Bug Bounty & CTF)",
    category: "coding",
    teamSize: "1 - 2 Members",
    rounds: "Capture The Flag (Jeopardy)",
    shortDesc: "Test your cybersecurity prowess across reverse engineering, cryptography, web exploitation, and forensics.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/ctf-rules.pdf",
    coordinator: "Aditya Nair (+91 94567 89012)"
  },
  {
    id: "esports-arena",
    name: "Valorant & BGMI Showdown",
    category: "gaming",
    teamSize: "4 - 5 Members",
    rounds: "Knockout + Grand Finals",
    shortDesc: "Inter-collegiate tactical tournament with spectator streaming and live caster commentary.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/esports-rules.pdf",
    coordinator: "Vikram Seth (+91 95678 90123)"
  },
  {
    id: "tech-quiz",
    name: "Cognitive Rush (Tech Trivia)",
    category: "nontech",
    teamSize: "2 Members",
    rounds: "Buzzer Round & Rapid Fire",
    shortDesc: "Fast-paced quiz on tech history, Silicon Valley pioneers, emerging trends, and pop culture tech.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/quiz-rules.pdf",
    coordinator: "Pooja V. (+91 96789 01234)"
  },
  {
    id: "cad-craft",
    name: "CAD Crafter & 3D Modeling",
    category: "tech",
    teamSize: "1 - 2 Members",
    rounds: "Time-Bound Modeling",
    shortDesc: "Precision engineering design using Fusion 360/SolidWorks based on structural engineering blueprints.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/cad-craft-rules.pdf",
    coordinator: "M. Siddharth (+91 97890 12345)"
  },
  {
    id: "adhoc-pitch",
    name: "Pitch Perfect (Startup Ad-Venture)",
    category: "nontech",
    teamSize: "2 - 3 Members",
    rounds: "Shark-Tank Style Pitch",
    shortDesc: "Pitch innovative business models, go-to-market strategies, and product prototypes before guest angel judges.",
    ruleUrl: "#",
    pdfUrl: "assets/rulebooks/startup-pitch-rules.pdf",
    coordinator: "Ananya Sen (+91 98901 23456)"
  }
];

// 2. Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initActionCards();
  initMainRulebookQuickView();
  initDedicatedRulebooksPage();
  initContactModal();
});

// Helper: Make entire action cards tappable while preserving button connections
function initActionCards() {
  const cards = document.querySelectorAll(".action-card");
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-action-bar")) return;
      const link = card.querySelector(".card-action-bar");
      if (link) {
        link.click();
      }
    });
  });
}

// 3. Theme Toggle (Dark / Light)
function initThemeToggle() {
  const themeToggleBtns = document.querySelectorAll("#themeToggleBtn");
  const htmlEl = document.documentElement;

  // Check saved theme
  const savedTheme = localStorage.getItem("intercom-theme") || "dark";
  htmlEl.setAttribute("data-theme", savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const currentTheme = htmlEl.getAttribute("data-theme") || "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", newTheme);
      localStorage.setItem("intercom-theme", newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll("#themeToggleBtn i");
  icons.forEach(icon => {
    if (theme === "light") {
      icon.className = "fa-solid fa-sun";
    } else {
      icon.className = "fa-solid fa-moon";
    }
  });
}

// 4. Quick Preview Section on Landing Page (index.html)
function initMainRulebookQuickView() {
  const container = document.getElementById("rulebookCardsContainer");
  const filterTabs = document.querySelectorAll("#categoryFilter .tab-btn");
  if (!container) return;

  renderQuickRulebooks(rulebooksData, container);

  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.getAttribute("data-filter");

      const filtered = filter === "all"
        ? rulebooksData
        : rulebooksData.filter(item => item.category === filter);

      renderQuickRulebooks(filtered, container);
    });
  });
}

function renderQuickRulebooks(items, container) {
  if (items.length === 0) {
    container.innerHTML = `<div class="no-results-card" style="grid-column: 1/-1;">No rulebooks found in this category.</div>`;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="rulebook-card" data-category="${item.category}">
      <div class="rulebook-card-header">
        <span class="event-category-tag tag-${item.category}">${item.category}</span>
        <span class="event-team-badge"><i class="fa-solid fa-users"></i> ${item.teamSize}</span>
      </div>
      <h3 class="event-name">${item.name}</h3>
      <p class="event-desc">${item.shortDesc}</p>
      <div class="rulebook-card-footer">
        <span class="rule-meta"><i class="fa-solid fa-circle-check"></i> ${item.rounds}</span>
        <div class="rule-links">
          <a href="rulebooks.html#${item.id}" class="rule-btn rule-btn-view" title="Detailed rule breakdown">
            <i class="fa-solid fa-eye"></i> Details
          </a>
          <a href="${item.pdfUrl}" class="rule-btn rule-btn-download" title="Download Official Rulebook PDF" onclick="handlePdfDownload(event, '${item.name}')">
            <i class="fa-solid fa-file-pdf"></i> PDF
          </a>
        </div>
      </div>
    </div>
  `).join("");
}

// 5. Dedicated Rulebooks Portal (rulebooks.html)
function initDedicatedRulebooksPage() {
  const container = document.getElementById("rulebooksListContainer");
  if (!container) return;

  const searchInput = document.getElementById("rulebookSearchInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const resetBtn = document.getElementById("resetSearchBtn");
  const noResults = document.getElementById("noResultsState");
  const filterTabs = document.querySelectorAll("#pageCategoryFilter .tab-btn");

  let currentCategory = "all";
  let searchQuery = "";

  // Update counts on filter badges
  updateCategoryCounts();

  function applyFilterAndSearch() {
    let filtered = rulebooksData;

    if (currentCategory !== "all") {
      filtered = filtered.filter(item => item.category === currentCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.shortDesc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      container.style.display = "none";
      if (noResults) noResults.style.display = "block";
    } else {
      container.style.display = "grid";
      if (noResults) noResults.style.display = "none";
      renderDetailedRulebooks(filtered, container);
    }
  }

  // Initial render
  applyFilterAndSearch();

  // Category Tabs click
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.getAttribute("data-filter");
      applyFilterAndSearch();
    });
  });

  // Search input change
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = searchQuery ? "block" : "none";
      }
      applyFilterAndSearch();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearBtn.style.display = "none";
        applyFilterAndSearch();
        searchInput.focus();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        currentCategory = "all";
        if (clearBtn) clearBtn.style.display = "none";
        filterTabs.forEach(t => {
          if (t.getAttribute("data-filter") === "all") t.classList.add("active");
          else t.classList.remove("active");
        });
        applyFilterAndSearch();
      });
    }
  }
}

function updateCategoryCounts() {
  const countAll = document.getElementById("count-all");
  const countTech = document.getElementById("count-tech");
  const countCoding = document.getElementById("count-coding");
  const countGaming = document.getElementById("count-gaming");
  const countNontech = document.getElementById("count-nontech");

  if (countAll) countAll.textContent = rulebooksData.length;
  if (countTech) countTech.textContent = rulebooksData.filter(i => i.category === "tech").length;
  if (countCoding) countCoding.textContent = rulebooksData.filter(i => i.category === "coding").length;
  if (countGaming) countGaming.textContent = rulebooksData.filter(i => i.category === "gaming").length;
  if (countNontech) countNontech.textContent = rulebooksData.filter(i => i.category === "nontech").length;
}

function renderDetailedRulebooks(items, container) {
  container.innerHTML = items.map(item => `
    <article class="rulebook-detail-card" id="${item.id}">
      <div class="rulebook-card-header">
        <span class="event-category-tag tag-${item.category}">${item.category}</span>
        <span class="event-team-badge"><i class="fa-solid fa-users"></i> ${item.teamSize}</span>
      </div>

      <h3 class="event-name">${item.name}</h3>
      <div class="event-rounds-tag"><i class="fa-solid fa-trophy"></i> Structure: ${item.rounds}</div>
      <p class="event-desc">${item.shortDesc}</p>

      <div class="event-details-specs">
        <div class="spec-item">
          <strong>Coordinator</strong>
          <span>${item.coordinator}</span>
        </div>
        <div class="spec-item">
          <strong>Platform / Mode</strong>
          <span>On-Campus Lab</span>
        </div>
      </div>

      <div class="rulebook-card-footer">
        <a href="https://forms.google.com" target="_blank" rel="noopener" class="rule-btn rule-btn-view">
          <i class="fa-solid fa-pen-nib"></i> Register Event
        </a>
        <a href="${item.pdfUrl}" class="rule-btn rule-btn-download" onclick="handlePdfDownload(event, '${item.name}')">
          <i class="fa-solid fa-file-arrow-down"></i> Download Rulebook PDF
        </a>
      </div>
    </article>
  `).join("");
}

// 6. Contact / Help Modal Logic
function initContactModal() {
  const helpBtns = document.querySelectorAll("#btnHelpModal, #btnHelpTrigger, .modal-link-trigger");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.getElementById("closeContactModal");
  const backdrop = modal ? modal.querySelector(".modal-backdrop") : null;
  const contactTabBtn = document.getElementById("contactTabBtn");
  const contactDirectoryPanel = document.getElementById("contactDirectoryPanel");

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  }

  helpBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  // Contact tab accordion toggle
  if (contactTabBtn && contactDirectoryPanel) {
    contactTabBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const isExpanded = contactTabBtn.getAttribute("aria-expanded") === "true";
      const nextState = !isExpanded;
      contactTabBtn.setAttribute("aria-expanded", nextState ? "true" : "false");
      contactTabBtn.classList.toggle("active", nextState);
      contactDirectoryPanel.style.display = nextState ? "flex" : "none";
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// 7. PDF Download Notification Handler
window.handlePdfDownload = function(e, eventName) {
  // If no actual PDF file exists yet, show a user-friendly instruction banner
  const link = e.currentTarget.getAttribute("href");
  if (link.startsWith("assets/rulebooks/")) {
    e.preventDefault();
    alert(`[Rulebook Link] Download requested for "${eventName}".\n\nTo hook up your real PDF file, place your PDF document inside the /assets/rulebooks/ folder or update the link in script.js!`);
  }
};
