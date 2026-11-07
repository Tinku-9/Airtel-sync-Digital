# Project Udyam Digital — Accel Business / Airtel SYNC 2026
**Young Technology Leaders (YTL) Hackathon — Enterprise Track A**

Making small businesses in India go digital in one sitting.

---

## What is in this Submission Pack

| Deliverable | File / Path | Description |
| :--- | :--- | :--- |
| **Interactive Web Application** | `index.html`, `style.css`, `app.js` | Full responsive prototype: Conversational AI Advisor (Voice & Hindi), Dynamic Bundle Builder, Smart KYC & Document OCR, and Order Tracker. |
| **WhatsApp Flow (Stretch Goal 1)** | Integrated into `index.html` (Modal) | Authentic WhatsApp mobile simulation for conversational onboarding. |
| **Partner Cockpit (Stretch Goal 2)** | `backoffice.html`, `backoffice.js` | Field sales & partner dashboard with ML Lead Propensity Scorer, KYC exception queue, and commission attribution. |
| **10-Slide Presentation Deck** | `Project_Udyam_Digital_Business_Case.pptx` | Official hackathon PowerPoint deck formatted on top of `Submission Template_Sync.pptx`. |
| **Business Case Document** | `business_case.md` | Full 10-slide slide-by-slide executive companion with data citations from `smb_leads.csv`. |
| **Solution Architecture** | `architecture.md` | High-level system architecture, sequence diagrams, and DPDP Act 2023 compliance boundaries. |
| **Data Privacy Note** | `privacy_note.md` | 1-page statutory compliance note adhering to the Digital Personal Data Protection Act, 2023. |
| **3-Minute Demo Script** | `demo_script.md` | Precision second-by-second presentation script (0:00 to 3:00) with visual walkthrough markers. |

---

## How to Run the Prototype

Because the prototype fetches the supplied CSV registries and catalogue files, run a local web server from this directory:

### Option 1: Python HTTP Server (Recommended)
From PowerShell or terminal in the project directory:

```powershell
# Run from submission folder:
python -m http.server 8000
```

Then open your browser and navigate to:
👉 **`http://localhost:8000`**

To open the **Sales & Partner Back-Office Cockpit**, visit:
👉 **`http://localhost:8000/backoffice.html`**

---

## Quick Demo Guide for Judges & Evaluators

### 1. AI Advisor & Multilingual Discovery (Step 1)
- Click the language selector (`EN` / `हिन्दी` / `Hinglish`) to change interface language.
- Click any of the **Judge Test Scenarios** in the left sidebar (e.g. *🩺 Clinic*, *🛒 Kirana*, *🏬 3-Store Retail*, *⚙️ Textile Mill*).
- Click the **Microphone** icon to test voice speech-to-text in Hindi or English.
- The advisor will query `product_catalogue.csv` rules and explain *why* each product was selected.

### 2. Dynamic Bundle Builder & Dependency Rules (Step 2)
- Adjust quantities (SIMs, Email seats, CCTV cameras).
- Toggle add-ons and observe instant Monthly Recurring Cost (MRC) and One-Time Setup (OTC) recalculation.
- Notice the **Dependency Warning**: selecting 4G Failover (P09) or Firewall (P21) requires a base broadband/leased line (P01–P06).

### 3. Smart KYC & DPDP Anomaly Detection (Step 3)
- Click the **DPDP Act 2023 consent checkbox**.
- **Method A (Registry Lookup)**: Test `32TTNXB7384T1ZW` (Active) or `37IHKXV5167L1ZS` (Cancelled status caught!).
- **Method B (Document OCR)**: Test specimen buttons:
  - `K02`: Clean verification pass (<90-day bill, active GSTIN, matching signatory).
  - `K11`: Catches expired utility bill (dated Oct 31, 2025: >90 days old relative to July 15, 2026)!
  - `K07`: Catches trade name vs legal proprietor name mismatch.

### 4. Order Tracker & Partner Handoff (Step 4)
- View dynamic Order Reference (`AB-2026-XXXX`).
- Observe calculated SLA delivery date derived from catalogue installation constraints.
- View assigned local partner with 48-hour SLA commitment and direct WhatsApp chat button.

---

## All Lookups & Data are Synthetic
All businesses, identifiers, GSTINs, Udyam numbers, and customer records in this project are synthetic and created for the Airtel SYNC / YTL Hackathon. No live government APIs are contacted.
