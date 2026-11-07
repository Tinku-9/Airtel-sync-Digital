# Data Privacy & Security Note — Project Udyam Digital
**Bharti Airtel / Accel Business — Enterprise Track A (Airtel SYNC 2026)**
*Prepared in Compliance with the Digital Personal Data Protection Act (DPDP Act), 2023*

---

## 1. Executive Privacy Philosophy: Privacy by Design
Project Udyam Digital redesigns small business acquisition for Accel Business with **Privacy by Design** embedded at every touchpoint. In transitioning from paper-heavy field sales visits to an automated, self-serve digital onboarding journey, customer data protection, statutory compliance, and trust are foundational. All data in this demonstration environment is synthetic; however, the technical and procedural controls are architected to satisfy India’s **DPDP Act, 2023** and enterprise telecom security benchmarks.

---

## 2. Key DPDP Act 2023 Principles & Architecture Choices

### 2.1 Statutory Notice & Affirmative Consent (Section 5 & Section 6)
- **Granular, Non-Bundled Choice**: Before any query to government registries (GSTIN or Udyam) or document upload, the customer is presented with an affirmative consent modal. Service onboarding consent is strictly unbundled from marketing promotions.
- **Multi-Lingual Clarity**: Consent notices are written in clear, plain language (available in English and Hindi), explicitly identifying:
  1. The specific data fields collected (GSTIN, Udyam number, address proof, signatory ID).
  2. The specific Data Fiduciary (Accel Business / Bharti Airtel).
  3. The right to withdraw consent and the proportionate offline alternative (doorstep partner assistance).

### 2.2 Purpose Limitation (Section 6)
- Personal and business identifiers collected during onboarding are utilized solely to:
  1. Authenticate business identity and prevent commercial telecom fraud.
  2. Verify technical eligibility and serviceability (e.g. city tier and facility size).
  3. Dispatch certified local installation partners to the verified premises.
- Registry lookups are never triggered passively or during browsing; they execute only upon user-initiated validation.

### 2.3 Data Minimisation & Proportionality (Section 6)
- **Prefill Preference**: The system prioritizes authoritative registry lookups (GSTIN/Udyam) over redundant physical document requests.
- **Restricted Extraction**: The OCR pipeline extracts only statutory business identity fields (legal name, trade name, 15-character GSTIN, bill issue date, and authorized signatory name). Extraneous information present on utility bills (such as bank details, tariff slabs, or family names) is discarded immediately from memory.
- **Zero Unrelated Data**: No personal bank statements, personal social profiles, or financial credit histories are solicited.

### 2.4 Identifier Masking & Pseudonymization (Section 8)
- **Interface & Log Masking**: All sensitive identifiers are masked across customer screens, back-office views, and audit logs. GSTINs appear as `08YKZXS****1Z0`, Udyam numbers as `UDYAM-XX-00-****801`, and signatory IDs display only the last three characters.
- **Analytics Separation**: Product usage metrics and funnel telemetry are pseudonymized. Analytics events do not contain cleartext customer identifiers or document contents.

### 2.5 Storage Limitation & Retention Schedule (Section 8)
- **90-Day Operational Image Purge**: Raw specimen document images (utility bills, registration certificates) are subject to an automated 90-day retention schedule. Upon service activation and statutory verification sign-off, raw image files are purged.
- **Cryptographic Audit Trails**: Accel Business retains only a cryptographic SHA-256 hash token, verification timestamp, and registry transaction ID for statutory compliance audits, eliminating long-term image exposure risk.

---

## 3. Technical & Operational Safeguards

| Domain | Control Specification |
| :--- | :--- |
| **In-Transit Security** | Strict TLS 1.3 encryption across all client, advisor, and back-office endpoints. |
| **At-Rest Security** | AES-256 encryption for cached registry responses and provisional order records. |
| **Access Control (RBAC)**| Least-privilege access: local field partners can access only leads geofenced to their postal circle. |
| **Integrity & Scanning** | Automated file type validation, size restrictions, and anti-virus scanning on document uploads. |
| **Rights of Data Principal**| Self-serve paths for customers to review profile details, request corrections, or revoke consent. |
| **Grievance Redressal**| Escalation route to Accel Business Data Protection Officer (DPO) with statutory turnaround SLA. |
