/**
 * INTERCOM '26 - Main Application Logic
 * Innovation Ignite Symposium 2.0 Portal
 * SIET CSE • Creative Codex
 */

// Target registration launch time: October 4th, 2026 at 7:30 PM IST (UTC+5:30)
const REGISTRATION_TARGET = new Date("2026-10-04T19:30:00+05:30").getTime();

// Destination URL for active registrations (Custom form or official portal)
const REGISTRATION_URL = "https://symposium-2-0.vercel.app/";

document.addEventListener("DOMContentLoaded", () => {
  enforceDarkTheme();
  initActionCards();
  initContactModal();
  initHypeLaunchCountdown();
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

// 4. Hype Launch Modal & Live Registration Timer System
function initHypeLaunchCountdown() {
  const hypeModal = document.getElementById("hypeModal");
  const closeHypeModalBtn = document.getElementById("closeHypeModal");
  const hypeDismissBtn = document.getElementById("hypeDismissBtn");
  const hypeBackdrop = document.getElementById("hypeBackdrop");
  const floatingHypePill = document.getElementById("floatingHypePill");
  const hypeActionBtn = document.getElementById("hypeActionBtn");
  const hypeActionText = document.getElementById("hypeActionText");
  const hypeActionIcon = document.getElementById("hypeActionIcon");

  // Hype Modal Text Elements
  const hypeTitle = document.getElementById("hypeTitle");
  const hypeSubtitle = document.getElementById("hypeSubtitle");
  const hypeStatusMsg = document.getElementById("hypeStatusMsg");

  // Hype Modal Timer Digits
  const hypeHours = document.getElementById("hypeHours");
  const hypeMinutes = document.getElementById("hypeMinutes");
  const hypeSeconds = document.getElementById("hypeSeconds");

  // Floating Pill Timer
  const floatingTimer = document.getElementById("floatingTimer");

  // Card 1 Elements
  const cardRegister = document.getElementById("cardRegister");
  const cardHours = document.getElementById("cardHours");
  const cardMinutes = document.getElementById("cardMinutes");
  const cardSeconds = document.getElementById("cardSeconds");
  const btnRegistration = document.getElementById("btnRegistration");
  const btnRegLabel = document.getElementById("btnRegLabel");
  const btnRegIcon = document.getElementById("btnRegIcon");
  const cardRegStatusPill = document.getElementById("cardRegStatusPill");
  const cardRegStatusLabel = document.getElementById("cardRegStatusLabel");
  const cardRegDesc = document.getElementById("cardRegDesc");

  // Modal Contact Registration Button
  const btnModalRegistration = document.getElementById("btnModalRegistration");
  const modalRegText = document.getElementById("modalRegText");
  const modalRegIcon = document.getElementById("modalRegIcon");

  // Toast Notification
  const toast = document.getElementById("registrationToast");

  let isLiveTriggered = false;

  // Helper: pad with leading zero
  function pad(num) {
    return String(Math.max(0, num)).padStart(2, "0");
  }

  // Open Hype Modal
  function openHypeModal() {
    if (!hypeModal) return;
    hypeModal.classList.add("active");
    hypeModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("hype-active");
  }

  // Close Hype Modal (allowing user to watch/browse the website freely)
  function closeHypeModal() {
    if (!hypeModal) return;
    hypeModal.classList.remove("active");
    hypeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("hype-active");
  }

  // Trigger brief Toast notification
  function showToast(message) {
    if (!toast) return;
    const msgEl = toast.querySelector(".portal-toast-msg");
    if (msgEl && message) msgEl.textContent = message;
    toast.classList.remove("active");
    void toast.offsetWidth;
    toast.classList.add("active");

    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove("active");
    }, 3600);
  }

  // Trigger celebration particle effect when live
  function triggerCelebration() {
    const colors = ["#ff5722", "#ff9800", "#10b981", "#6366f1", "#ec4899", "#fbbf24"];
    const container = document.body;

    for (let i = 0; i < 40; i++) {
      const particle = document.createElement("div");
      particle.className = "celebration-sparkle";
      const size = Math.floor(Math.random() * 8) + 6;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = Math.random() * 100;
      const endX = startX + (Math.random() * 30 - 15);
      const duration = (Math.random() * 1.5 + 1.2).toFixed(2);
      const delay = (Math.random() * 0.4).toFixed(2);

      particle.style.cssText = `
        position: fixed;
        top: 0;
        left: ${startX}vw;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
        z-index: 999999;
        pointer-events: none;
        opacity: 0.95;
        box-shadow: 0 0 10px ${color};
        animation: confettiFall ${duration}s ease-out ${delay}s forwards;
      `;
      container.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, (parseFloat(duration) + parseFloat(delay)) * 1000 + 200);
    }
  }

  // Ensure keyframes for celebration exist
  if (!document.getElementById("celebrationStyles")) {
    const styleEl = document.createElement("style");
    styleEl.id = "celebrationStyles";
    styleEl.textContent = `
      @keyframes confettiFall {
        0% { transform: translateY(-10px) rotate(0deg) scale(0.6); opacity: 1; }
        50% { opacity: 0.9; }
        100% { transform: translateY(100vh) rotate(540deg) scale(1.1); opacity: 0; }
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Core countdown update function
  function updateTimer() {
    const now = Date.now();
    const diff = REGISTRATION_TARGET - now;

    if (diff <= 0) {
      // ==========================================
      // STATE: REGISTRATIONS ARE LIVE!
      // ==========================================
      if (!isLiveTriggered) {
        isLiveTriggered = true;
        triggerCelebration();
      }

      // 1. Update Hype Modal
      if (hypeTitle) {
        hypeTitle.innerHTML = '<span class="hype-fire-text">LET THE GAME BEGIN!</span>';
      }
      if (hypeSubtitle) {
        hypeSubtitle.innerHTML = '<span style="color:#10b981;font-weight:900;">🔥 REGISTRATIONS ARE NOW LIVE! 🚀</span>';
      }
      if (hypeStatusMsg) {
        hypeStatusMsg.textContent = "Registration is officially open! Tap below to register your team.";
      }
      if (hypeHours) hypeHours.textContent = "00";
      if (hypeMinutes) hypeMinutes.textContent = "00";
      if (hypeSeconds) hypeSeconds.textContent = "00";

      if (hypeActionBtn) {
        hypeActionBtn.href = REGISTRATION_URL;
        hypeActionBtn.target = "_blank";
        hypeActionBtn.rel = "noopener noreferrer";
        hypeActionBtn.style.background = "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)";
        hypeActionBtn.style.boxShadow = "0 8px 32px rgba(16, 185, 129, 0.65)";
      }
      if (hypeActionText) hypeActionText.textContent = "REGISTER NOW • ENTER ARENA";
      if (hypeActionIcon) hypeActionIcon.className = "fa-solid fa-bolt";

      // 2. Update Card 1
      if (cardRegister) {
        cardRegister.classList.add("is-live");
      }
      if (cardRegStatusPill) {
        cardRegStatusPill.className = "card-status-pill pill-live";
      }
      if (cardRegStatusLabel) {
        cardRegStatusLabel.textContent = "Registrations Live";
      }
      if (cardRegDesc) {
        cardRegDesc.textContent = "LET THE GAME BEGIN! Registrations are now officially live. Submit your entries and prepare to dominate the arena!";
      }
      if (cardHours) cardHours.textContent = "00";
      if (cardMinutes) cardMinutes.textContent = "00";
      if (cardSeconds) cardSeconds.textContent = "00";

      if (btnRegistration) {
        btnRegistration.href = REGISTRATION_URL;
        btnRegistration.target = "_blank";
        btnRegistration.rel = "noopener noreferrer";
      }
      if (btnRegLabel) btnRegLabel.textContent = "Register Now";
      if (btnRegIcon) btnRegIcon.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';

      // 3. Update Modal Button
      if (btnModalRegistration) {
        btnModalRegistration.href = REGISTRATION_URL;
        btnModalRegistration.target = "_blank";
        btnModalRegistration.rel = "noopener noreferrer";
      }
      if (modalRegText) modalRegText.textContent = "Register Now";
      if (modalRegIcon) modalRegIcon.className = "fa-solid fa-bolt";

      // 4. Update Floating Pill
      if (floatingTimer) {
        floatingTimer.textContent = "LIVE NOW!";
        floatingTimer.style.color = "#34d399";
      }

      return;
    }

    // ==========================================
    // STATE: COUNTDOWN RUNNING LIVE (PRE-LAUNCH)
    // ==========================================
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedH = pad(hours);
    const formattedM = pad(minutes);
    const formattedS = pad(seconds);

    // Update Hype Modal Digits
    if (hypeHours) hypeHours.textContent = formattedH;
    if (hypeMinutes) hypeMinutes.textContent = formattedM;
    if (hypeSeconds) hypeSeconds.textContent = formattedS;

    // Update Floating Pill
    if (floatingTimer) {
      floatingTimer.textContent = `${formattedH}:${formattedM}:${formattedS}`;
    }

    // Update Card 1 Digits
    if (cardHours) cardHours.textContent = formattedH;
    if (cardMinutes) cardMinutes.textContent = formattedM;
    if (cardSeconds) cardSeconds.textContent = formattedS;

    // Update Buttons with Live Countdown
    const timerLabelText = `Opens in ${formattedH}h ${formattedM}m ${formattedS}s`;
    if (btnRegLabel) btnRegLabel.textContent = timerLabelText;
    if (modalRegText) modalRegText.textContent = timerLabelText;
    if (hypeActionText) hypeActionText.textContent = `Opens in ${formattedH}:${formattedM}:${formattedS}`;
  }

  // Event Listeners: Close Hype Modal
  if (closeHypeModalBtn) {
    closeHypeModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeHypeModal();
    });
  }

  if (hypeDismissBtn) {
    hypeDismissBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeHypeModal();
    });
  }

  if (hypeBackdrop) {
    hypeBackdrop.addEventListener("click", closeHypeModal);
  }

  // Keyboard Escape to close
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hypeModal && hypeModal.classList.contains("active")) {
      closeHypeModal();
    }
  });

  // Reopen Hype Modal from Floating Pill
  if (floatingHypePill) {
    floatingHypePill.addEventListener("click", openHypeModal);
  }

  // Click on Card 1 Registration Button
  if (btnRegistration) {
    btnRegistration.addEventListener("click", (e) => {
      const now = Date.now();
      if (now < REGISTRATION_TARGET) {
        e.preventDefault();
        openHypeModal();
        showToast("Registrations go live today at 7:30 PM!");
      }
      // If live, default anchor navigation to REGISTRATION_URL proceeds
    });
  }

  // Click on Contact Modal Registration Button
  if (btnModalRegistration) {
    btnModalRegistration.addEventListener("click", (e) => {
      const now = Date.now();
      if (now < REGISTRATION_TARGET) {
        e.preventDefault();
        openHypeModal();
        showToast("Registrations go live today at 7:30 PM!");
      }
    });
  }

  // Click on Hype Action Button when counting down
  if (hypeActionBtn) {
    hypeActionBtn.addEventListener("click", (e) => {
      const now = Date.now();
      if (now < REGISTRATION_TARGET) {
        e.preventDefault();
        showToast("LET THE GAME BEGIN! Unlocking at 7:30 PM!");
      }
    });
  }

  // Toast dismiss on click
  if (toast) {
    toast.addEventListener("click", () => {
      toast.classList.remove("active");
    });
  }

  // Run initial timer calculation immediately
  updateTimer();

  // Tick every second
  setInterval(updateTimer, 1000);

  // Automatically pop up the Hype component when the website opens
  setTimeout(() => {
    openHypeModal();
  }, 280);
}
