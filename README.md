# Intercom 2026 - Symposium Static Portal

A minimalist, high-performance static website for symposium registrations, official redirects, and rulebook distribution.

## ✨ Features Included

1. **Top Branding Header**:
   - College Logo (`assets/college-logo.svg`)
   - Club Logo (`assets/club-logo.svg`)
   - Symposium Logo (`assets/symposium-logo.svg`)
   - Dark/Light mode toggle switch with local storage persistence.

2. **3 Core Action Cards (Requested)**:
   - ⚡ **Registration Button**: Direct action card routing participants to the official registration portal.
   - 🌐 **Official Website Button**: Direct redirect link to your institution's main college/department web portal.
   - 📖 **Rulebooks Button**: Link directly navigating to the complete Rulebooks and Guidelines hub (`rulebooks.html`).

3. **Rulebooks System**:
   - Quick preview directory right on the home page (`index.html#quickRulebooks`) with category filters (`Technical`, `Coding`, `Gaming`, `Non-Tech`).
   - Dedicated full portal (`rulebooks.html`) with real-time keyword search, team size indicators, coordinator contacts, and one-click PDF downloads.

4. **Design Aesthetic**:
   - Ultra-modern minimalist dark/light UI
   - Subtle animated glowing ambient mesh
   - Glassmorphism backdrop filters
   - High-contrast typography with *Outfit* and *Plus Jakarta Sans*
   - Fully responsive for mobile, tablets, and desktops

---

## 🛠️ How to Customize Your Links & Logos

### 1. Changing the 3 Main Links
Open [index.html](file:///e:/intercom/index.html) and locate lines 105-155:
- **Registration Form URL**: Change `href="https://forms.google.com"` in `id="btnRegistration"` to your Google Form or Unstop link.
- **Official Website URL**: Change `href="https://example.edu"` in `id="btnOfficialWebsite"` to your college website.
- **Rulebooks Destination**: By default it opens [rulebooks.html](file:///e:/intercom/rulebooks.html).

### 2. Replacing the Logos with Your Own Images
Place your image files (PNG, JPG, or SVG) inside the `assets/` directory:
- College Logo: replace or update `assets/college-logo.svg`
- Club Logo: replace or update `assets/club-logo.svg`
- Symposium Logo: replace or update `assets/symposium-logo.svg`

### 3. Adding or Modifying Rulebooks
Open [script.js](file:///e:/intercom/script.js) and edit the `rulebooksData` array at the top. You can add new events, update coordinator phone numbers, change round descriptions, or point `pdfUrl` to your real PDF files in `assets/rulebooks/`.
