/**
 * INTERCOM '26 - Main Application Logic
 * Innovation Ignite Symposium 2.0 Portal
 */

document.addEventListener("DOMContentLoaded", () => {
  enforceDarkTheme();
  initActionCards();
  initContactModal();
});

// 1. Permanent Dark Theme Enforcement
function enforceDarkTheme() {
  document.documentElement.setAttribute("data-theme", "dark");
  try {
    localStorage.setItem("intercom-theme", "dark");
  } catch (e) {
    // LocalStorage fallback
  }
}

// 2. Action Cards Interactivity (entire card clickable)
function initActionCards() {
  const cards = document.querySelectorAll(".action-card");
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-action-bar, a, button")) return;
      const link = card.querySelector(".card-action-bar");
      if (link) {
        link.click();
      }
    });
  });
}

// 3. Helpdesk & Contact Modal Logic
function initContactModal() {
  const helpBtns = document.querySelectorAll("#btnHelpModal, #btnHelpTrigger, a[href='#contactModal']");
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
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (window.location.hash === "#contactModal") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  helpBtns.forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Contact tab accordion toggle for event coordinator directory
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

  // Keyboard accessibility: Escape key to close modal
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  // Handle direct navigation with #contactModal in URL
  if (window.location.hash === "#contactModal") {
    openModal();
  }
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#contactModal") {
      openModal();
    }
  });
}
