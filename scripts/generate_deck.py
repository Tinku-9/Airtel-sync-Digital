import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # Blank slide layout

    # Color Palette
    AIRTEL_RED = RGBColor(228, 0, 0)
    DARK_NAVY = RGBColor(20, 24, 38)
    CARD_BG = RGBColor(246, 248, 252)
    BORDER_COLOR = RGBColor(220, 226, 235)
    TEXT_DARK = RGBColor(28, 33, 45)
    TEXT_MUTED = RGBColor(95, 105, 122)
    WHITE = RGBColor(255, 255, 255)
    GREEN = RGBColor(24, 134, 75)
    ACCENT_BLUE = RGBColor(23, 92, 211)

    # Helper function to add slide background
    def add_slide_bg(slide, is_title=False):
        bg_path = 'slide1_bg.jpg' if is_title else 'slide2_bg.jpg'
        if os.path.exists(bg_path):
            slide.shapes.add_picture(bg_path, 0, 0, prs.slide_width, prs.slide_height)

    # Helper for adding headers
    def add_header(slide, eyebrow, title, subtitle=None):
        tx_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(1.2))
        tf = tx_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        
        p0 = tf.paragraphs[0]
        p0.text = eyebrow.upper()
        p0.font.size = Pt(10)
        p0.font.bold = True
        p0.font.color.rgb = AIRTEL_RED
        
        p1 = tf.add_paragraph()
        p1.text = title
        p1.font.size = Pt(22)
        p1.font.bold = True
        p1.font.color.rgb = DARK_NAVY
        
        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.size = Pt(12)
            p2.font.color.rgb = TEXT_MUTED

    # Helper for adding metric cards
    def add_metric_card(slide, left, top, width, height, value, label, subtext="", border_color=AIRTEL_RED):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = CARD_BG
        shape.line.color.rgb = BORDER_COLOR
        shape.line.width = Pt(1)
        
        tf = shape.text_frame
        tf.word_wrap = True
        tf.margin_left = Inches(0.2)
        tf.margin_right = Inches(0.2)
        tf.margin_top = Inches(0.15)
        
        p = tf.paragraphs[0]
        p.text = value
        p.font.size = Pt(24)
        p.font.bold = True
        p.font.color.rgb = border_color
        
        p2 = tf.add_paragraph()
        p2.text = label
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = DARK_NAVY
        
        if subtext:
            p3 = tf.add_paragraph()
            p3.text = subtext
            p3.font.size = Pt(9.5)
            p3.font.color.rgb = TEXT_MUTED

    # Helper for content boxes
    def add_content_card(slide, left, top, width, height, title, bullets, badge=None):
        shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        shape.fill.solid()
        shape.fill.fore_color.rgb = WHITE
        shape.line.color.rgb = BORDER_COLOR
        shape.line.width = Pt(1.2)
        
        tf = shape.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_right = Inches(0.25)
        tf.margin_top = Inches(0.2)
        
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = DARK_NAVY
        
        for bullet in bullets:
            p_b = tf.add_paragraph()
            p_b.text = "• " + bullet
            p_b.font.size = Pt(10.5)
            p_b.font.color.rgb = TEXT_DARK
            p_b.space_before = Pt(4)

    # ==========================================
    # SLIDE 1: TITLE SLIDE
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s1, is_title=True)
    
    t_box = s1.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.3), Inches(3.2))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    
    p0 = tf1.paragraphs[0]
    p0.text = "AIRTEL SYNC 2026 | ENTERPRISE TRACK A"
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = AIRTEL_RED
    
    p1 = tf1.add_paragraph()
    p1.text = "Project Udyam Digital"
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = DARK_NAVY
    
    p2 = tf1.add_paragraph()
    p2.text = "Making India's 6 Crore+ Small Businesses Go Digital in One Sitting"
    p2.font.size = Pt(18)
    p2.font.color.rgb = TEXT_MUTED
    p2.space_before = Pt(8)
    
    p3 = tf1.add_paragraph()
    p3.text = "End-to-End Digital Acquisition, Instant Smart KYC, AI Advisor & Partner Co-Existence"
    p3.font.size = Pt(12)
    p3.font.italic = True
    p3.font.color.rgb = DARK_NAVY
    p3.space_before = Pt(16)

    # ==========================================
    # SLIDE 2: THE OPPORTUNITY
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s2)
    add_header(s2, "Executive Context & Problem Statement", "The 6 Crore+ MSME Opportunity & Existing Friction", "MSMEs need bundled digital services, but current B2B enterprise sales models are slow, manual and expensive.")
    
    add_metric_card(s2, Inches(0.8), Inches(1.8), Inches(2.7), Inches(1.3), "6 Crore+", "India MSME Market", "Rapidly adopting UPI, CCTV & Cloud", AIRTEL_RED)
    add_metric_card(s2, Inches(3.8), Inches(1.8), Inches(2.7), Inches(1.3), "₹15,000", "Current Blended CAC", "Against ₹6,900 median monthly spend", DARK_NAVY)
    add_metric_card(s2, Inches(6.8), Inches(1.8), Inches(2.7), Inches(1.3), "17.6 Days", "Avg. Time to Activate", "Requires 3-4 customer follow-ups", DARK_NAVY)
    add_metric_card(s2, Inches(9.8), Inches(1.8), Inches(2.7), Inches(1.3), "7.36%", "Funnel Conversion Rate", "368 activations from 5,000 leads", AIRTEL_RED)

    add_content_card(s2, Inches(0.8), Inches(3.3), Inches(5.6), Inches(3.5), "The Customer Friction Today", [
        "Fragmented Purchasing: Kiranas & clinics buy broadband, SIMs, CCTV, POS, and email from 4-5 different unorganized vendors.",
        "Sales Call Friction: Discovery relies on manual field visits; sales executives push quota products rather than customer needs.",
        "Opaque 3-5 Day Quotes: Delivered as static PDFs loaded with technical telecom jargon that business owners cannot parse.",
        "Manual KYC Hassle: Physical paper collection of GSTIN, Udyam, utility bills, and signatory IDs causes major drop-off."
    ])

    add_content_card(s2, Inches(6.8), Inches(3.3), Inches(5.7), Inches(3.5), "The Udyam Digital Paradigm Shift", [
        "One-Sitting Onboarding: Transition from a 17.6-day manual cycle to a 10-minute self-serve or partner-assisted digital journey.",
        "Conversational AI Advisor: Multilingual (Hindi/English) voice & chat guided needs discovery replacing pushy sales pitches.",
        "Instant Smart KYC: Real-time GSTIN/Udyam prefill + automated OCR with 90-day validity checks and DPDP Act 2023 compliance.",
        "Partner Symbiosis: Field force empowered with high-propensity leads and installation tasks, eliminating channel conflict."
    ])

    # ==========================================
    # SLIDE 3: FUNNEL FORENSICS
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s3)
    add_header(s3, "Funnel Forensics & Data Insights", "Where & Why 92.6% of Leads Drop Off (5,000 Lead Analysis)", "Deep analysis of the supplied synthetic leads dataset reveals that friction in quote and scheduling drives the steep drop.")

    add_metric_card(s3, Inches(0.8), Inches(1.8), Inches(2.7), Inches(1.3), "1,200+ Leads", "Process Friction Drop-offs", "No time for visit, quote delay & complexity", AIRTEL_RED)
    add_metric_card(s3, Inches(3.8), Inches(1.8), Inches(2.7), Inches(1.3), "44% Acceptance", "Needs to Quote Accepted", "Steepest funnel cliff in the acquisition cycle", DARK_NAVY)
    add_metric_card(s3, Inches(6.8), Inches(1.8), Inches(2.7), Inches(1.3), "9.6% vs 2.0%", "GSTIN vs Non-GSTIN Conv.", "Leads with GSTIN convert 4.8x higher", GREEN)
    add_metric_card(s3, Inches(9.8), Inches(1.8), Inches(2.7), Inches(1.3), "3 Calls", "Status Chases per Lead", "Avoidable customer support load", DARK_NAVY)

    add_content_card(s3, Inches(0.8), Inches(3.3), Inches(5.6), Inches(3.5), "Drop-Off Root Cause Breakdown", [
        "Unreachable / Scheduling Failure (1,631 leads): 805 unreachable after 3 attempts; 531 owners had no time for visit; 296 visits not scheduled.",
        "Quote Complexity & Delay (385 leads): 206 dropped because 'Quote too complex to understand'; 179 dropped due to quote turnaround latency.",
        "Product & Price Mismatch (621 leads): 414 dropped on price; 207 picked competitor; 280 only wanted a mobile SIM (poor upfront qualification).",
        "Key Takeaway: Over 40% of lost leads are directly addressable through instant digital quoting, self-service, and proactive ETA tracking."
    ])

    add_content_card(s3, Inches(6.8), Inches(3.3), Inches(5.7), Inches(3.5), "Funnel Stage Attrition (smb_leads.csv)", [
        "Stage 1 - Leads Generated: 5,000 (100%)",
        "Stage 2 - Contacted: 3,406 (68.1% of leads) — 1,594 lost before first dialogue",
        "Stage 3 - Needs Assessed: 1,974 (58.0% of contacted) — 1,432 lost in visit coordination",
        "Stage 4 - Quote Accepted: 861 (43.6% of assessed) — 1,113 lost to quote friction",
        "Stage 5 - KYC Complete: 588 (68.3% of accepted) — 273 lost to paperwork hassle",
        "Stage 6 - Activated: 368 (62.6% of KYC) — 220 lost to install delays & dropouts",
        "Core Lever: Digital Advisor & Instant Quote fixes the Stage 3->4 bottleneck!"
    ])

    # ==========================================
    # SLIDE 4: SEGMENT PRIORITIZATION
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s4)
    add_header(s4, "Customer Strategy & Segmentation", "Target Customer Segmentation & Prioritization Matrix", "Balancing conversion velocity (Professional Offices) with market scale (Micro Retail) to maximize blended ROI.")

    add_content_card(s4, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0), "Segment Performance & Priorities", [
        "Priority 1: Professional Offices (Clinics, CA Firms, Coaching)",
        "  • Metrics: 1,247 leads (25% share) | 138 activated | 11.1% conversion rate.",
        "  • Needs: High uptime broadband, cloud email/storage, device endpoint security.",
        "  • Fit: High digital readiness, GSTIN-registered, medium price sensitivity.",
        "Priority 2: Small Multi-Site Businesses (Retail Chains, Restaurants)",
        "  • Metrics: 755 leads (15% share) | 83 activated | 11.0% conversion rate.",
        "  • Needs: Centralized billing, failover backup, SD-WAN, Cloud CCTV across outlets.",
        "  • Fit: High ARPU, urgent need for unified vendor management.",
        "Priority 3: Micro Retail & Services (Kiranas, Salons, Pharmacies)",
        "  • Metrics: 2,709 leads (54% volume) | 110 activated | 4.1% conversion rate.",
        "  • Needs: Ultra-reliable internet for UPI/POS, WhatsApp Business channel.",
        "  • Fit: Massive market pool; needs self-serve low-touch pricing under ₹2,000/mo.",
        "Partner Assisted Pilot: Small Manufacturers (Auto-parts, Textiles)",
        "  • Metrics: 289 leads (5%) | 37 activated | 12.8% conversion rate | 20.5 days SLA.",
        "  • High ARPU leased line + IoT, but requires technical partner on-site feasibility."
    ])

    add_content_card(s4, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0), "Tailored Go-To-Market Bundles", [
        "Micro Retail Starter Pack (~₹1,848 / month):",
        "  • Products: Biz Fibre 100 (P01) + Cloud POS (P19) + WhatsApp API (P15).",
        "  • Value Prop: Never miss a UPI payment; automate customer receipts on WhatsApp.",
        "  • Setup: ₹2,500 one-time | 12-month contract | Instant digital activation.",
        "Professional Office Suite (~₹2,423 / month):",
        "  • Products: Biz Fibre 300 (P02) + Cloud Email/Office (P16) + Endpoint Security (P20).",
        "  • Value Prop: 300 Mbps symmetrical speed + data protection for client records.",
        "  • Setup: ₹0 setup fee | 12-month contract | DigiLocker KYC verified.",
        "Multi-Site Connected Enterprise (~₹5,998+ / month):",
        "  • Products: Biz Fibre 300 (P02) + 4G/5G Failover (P09) + Managed SD-WAN (P10).",
        "  • Value Prop: Seamless branch inter-connectivity with 99.9% uptime SLA.",
        "  • Setup: Scaled per site | 24-month SD-WAN term | Dedicated partner dispatch."
    ])

    # ==========================================
    # SLIDE 5: BUNDLING & PRICING
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s5)
    add_header(s5, "Catalogue Rules & Transparent Pricing", "Product Bundling Architecture & Dynamic Quote Engine", "Grounding recommendations in catalogue constraints, enforcing dependencies and eliminating hidden charges.")

    add_metric_card(s5, Inches(0.8), Inches(1.8), Inches(2.7), Inches(1.3), "25 Products", "Catalogue Portfolio", "Connectivity, Cloud, Security, IoT", DARK_NAVY)
    add_metric_card(s5, Inches(3.8), Inches(1.8), Inches(2.7), Inches(1.3), "100% Rules-Based", "Zero Hallucination", "Strict city tier & employee constraints", GREEN)
    add_metric_card(s5, Inches(6.8), Inches(1.8), Inches(2.7), Inches(1.3), "Real-Time MRC/OTC", "Transparent Checkout", "Clear monthly vs one-time setup split", DARK_NAVY)
    add_metric_card(s5, Inches(9.8), Inches(1.8), Inches(2.7), Inches(1.3), "28% Avg. Savings", "Consolidated Value", "Versus fragmented multi-vendor contracts", AIRTEL_RED)

    add_content_card(s5, Inches(0.8), Inches(3.3), Inches(5.6), Inches(3.5), "Catalogue Dependency & Eligibility Engine", [
        "City Tier Filtering: Restricts Tier 1-exclusive products (e.g. Biz Fibre 1G P03) to eligible geographies.",
        "Size & Facility Constraints: Enforces min_employees and min_sites (e.g. SD-WAN P10 requires >=10 staff & >=3 branches; Cloud Telephony P12 requires >=3 staff).",
        "Base Connectivity Enforcing: Strictly checks 'requires_one_of' rules before allowing add-ons (e.g. Failover P09, Firewall P21, and CCTV P23 require an active broadband/leased line).",
        "GSTIN Prerequisites: Restricts enterprise-grade products (ILL P05/P06, SD-WAN P10, Machine IoT P24) when valid GSTIN is absent."
    ])

    add_content_card(s5, Inches(6.8), Inches(3.3), Inches(5.7), Inches(3.5), "Transparent Digital Billing Experience", [
        "Unit Multiplication: Transparently scales pricing per user (Email P16), per line (SIMs P07/P08), per camera (CCTV P23), and per counter (POS P19).",
        "Contract Tenure Transparency: Clearly displays binding contract terms (1, 3, 6, 12, 24 months) so customers have zero exit surprise.",
        "Interactive Add-on Toggles: Owners can toggle security, backup, or toll-free numbers and watch the bill adjust in real-time.",
        "Unified Bill Guarantee: Single GST invoice, single consolidated payment, single point of enterprise customer care."
    ])

    # ==========================================
    # SLIDE 6: CONVERSATIONAL AI ADVISOR
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s6)
    add_header(s6, "Digital Discovery Experience", "Conversational GenAI Advisor & Multi-Channel Discovery", "Allowing business owners to discover right-sized solutions via natural voice or chat in Hindi and English.")

    add_content_card(s6, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0), "Conversational AI Discovery Architecture", [
        "Bilingual Voice & Text AI:",
        "  • Supports English, Hindi (हिंदी), and Hinglish voice queries via Web Speech API.",
        "  • Example: 'Jaipur me 5 logo ka clinic hai, patient data safe rakhna hai aur tez net chahiye'.",
        "Natural Intent & Entity Extraction:",
        "  • Identifies business type (clinic -> professional office), location tier, staff count, and security priorities without making the user fill tedious dropdowns.",
        "Plain Language Business Justification:",
        "  • Avoids technical jargon like 'CIR 1:1' or 'IPSec tunnel'.",
        "  • Explains: 'Biz Fibre 300 gives your 5 staff uninterrupted video consultations, and Endpoint Security protects your patient records against ransomware.'",
        "Dual Discovery Flow:",
        "  • Conversational mode for interactive exploration + Quick Wizard mode for high-speed automated selection."
    ])

    add_content_card(s6, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0), "WhatsApp Integration (Stretch Goal)", [
        "Familiar WhatsApp Front-End:",
        "  • India's MSME owners live on WhatsApp. Udyam Digital offers an end-to-end interactive journey directly inside WhatsApp.",
        "Step-by-Step WhatsApp Flow:",
        "  1. Inbound greeting: 'Namaste! Main Accel Business Digital Advisor hoon.'",
        "  2. Needs discovery: Quick-reply buttons for business segment, staff count, and internet needs.",
        "  3. Interactive Bundle Card: Shows monthly price, setup fee, and instant customization links.",
        "  4. In-Chat KYC Upload: Snap and upload GST certificate or electricity bill directly in the WhatsApp thread.",
        "  5. Real-Time Status Push: Automated tracking notifications sent to WhatsApp as installation progresses.",
        "Significantly lowers barrier to entry for micro and small enterprises."
    ])

    # ==========================================
    # SLIDE 7: SMART KYC & DPDP ACT 2023
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s7)
    add_header(s7, "Trust, Compliance & Automation", "Smart KYC & DPDP Act 2023 Compliance Framework", "Near-instant verification combining mock registry lookups and automated OCR with privacy by design.")

    add_metric_card(s7, Inches(0.8), Inches(1.8), Inches(2.7), Inches(1.3), "30 Seconds", "Verification Speed", "From 4-5 days paper collection", GREEN)
    add_metric_card(s7, Inches(3.8), Inches(1.8), Inches(2.7), Inches(1.3), "6,257 Records", "Mock Registry DB", "3,534 GSTIN + 2,723 Udyam entries", DARK_NAVY)
    add_metric_card(s7, Inches(6.8), Inches(1.8), Inches(2.7), Inches(1.3), "90-Day Rule", "Address Recency Check", "Validated against 2026-07-15 anchor", DARK_NAVY)
    add_metric_card(s7, Inches(9.8), Inches(1.8), Inches(2.7), Inches(1.3), "100% DPDP", "Privacy Compliant", "Explicit purpose-specific consent", AIRTEL_RED)

    add_content_card(s7, Inches(0.8), Inches(3.3), Inches(5.6), Inches(3.5), "Smart Verification Pipeline", [
        "1. Instant Registry Prefill: Queries mock GSTIN/Udyam database; auto-populates legal name, trade name, constitution, and verifies 'Active' status.",
        "2. Automated Document OCR: RapidOCR ONNX engine extracts text from uploaded certificates, utility bills, and signatory IDs.",
        "3. Automated Anomaly Detection: Catches planted issues (e.g. utility bill older than 90 days from 2026-07-15, cancelled GSTIN status, signatory name mismatch).",
        "4. Smart Exception Routing: Clean applications pass instantly; flagged anomalies are routed seamlessly to field partners for assisted resolution."
    ])

    add_content_card(s7, Inches(6.8), Inches(3.3), Inches(5.7), Inches(3.5), "DPDP Act, 2023 Alignment", [
        "Notice & Purpose Limitation: Explicit affirmative consent obtained solely for Accel Business onboarding; no bundled marketing consent.",
        "Data Minimization: Collects only statutory identifiers necessary to provision service; extracts only relevant fields from documents.",
        "Data Masking: Masked display in UI and logs (e.g. 08YKZXS****1Z0; masked Aadhaar/PAN) to prevent accidental data leaks.",
        "Storage Limitation: 90-day operational retention cap for raw KYC document images; subsequent deletion leaving only cryptographically hashed audit logs."
    ])

    # ==========================================
    # SLIDE 8: CHANNEL PARTNER SYMBIOSIS
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s8)
    add_header(s8, "Channel Strategy & Co-Existence", "Field Force & Channel Partner Symbiosis", "Empowering local partners and sales executives as high-value assisted onboarding and installation champions.")

    add_content_card(s8, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0), "Transforming Channel Friction into Value", [
        "The Traditional Threat: Digital channels often trigger resistance from sales agents and channel partners fearful of losing commissions.",
        "The Udyam Digital Model — Collaborative Assisted Sales:",
        "  • Digital handles cold discovery, qualification, transparent quote generation, and initial KYC prefill.",
        "  • Partners handle high-touch physical touchpoints: on-site fiber feasibility, hardware installation, CPE setup, and exception handling.",
        "Guaranteed Partner Commission Attribution:",
        "  • Every lead generated through a partner link or assigned for local installation receives full commission attribution upon successful activation.",
        "Zero Cold Leads for Sales Executives:",
        "  • Eliminates wasted visits to uninterested leads (which caused 1,300+ dropped leads in the legacy dataset).",
        "  • Focuses field energy purely on qualified, ready-to-activate accounts."
    ])

    add_content_card(s8, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0), "Back-Office Partner Portal (Stretch Goal)", [
        "Dedicated Partner Cockpit (backoffice.html):",
        "  • Real-time visibility into local lead funnel and active installation tasks.",
        "ML-Driven Lead Propensity Scorer:",
        "  • Ranks unclosed leads who dropped out during the self-serve journey.",
        "  • Scoring weights: Has GSTIN (+40%), Professional/Multi-site (+25%), High Spend (+15%), Dropped at Quote (+20%).",
        "  • Delivers prioritized '1-Click Call' lead lists to partner sales reps.",
        "Human-in-the-Loop KYC Exception Queue:",
        "  • Applications with OCR discrepancies (e.g. name variance or outdated bill) are assigned directly to the local partner to collect fresh verification on-site.",
        "SLA Tracking & Dispatch:",
        "  • Real-time engineer dispatch ensuring the 10-day activation commitment is met."
    ])

    # ==========================================
    # SLIDE 9: UNIT ECONOMICS & ROI
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s9)
    add_header(s9, "Financial Model & Business Impact", "Unit Economics, CAC Reduction & Financial Returns", "Transforming acquisition unit economics while unlocking high lifetime value across India's MSME base.")

    add_metric_card(s9, Inches(0.8), Inches(1.8), Inches(2.7), Inches(1.3), "₹12,000", "Projected Blended CAC", "20% reduction from ₹15,000 benchmark", GREEN)
    add_metric_card(s9, Inches(3.8), Inches(1.8), Inches(2.7), Inches(1.3), "10.0%", "Target Conversion Rate", "Up from 7.36% baseline (+36% uplift)", GREEN)
    add_metric_card(s9, Inches(6.8), Inches(1.8), Inches(2.7), Inches(1.3), "10 Days", "Target Activation SLA", "Down from 17.6 days (-43% cycle time)", DARK_NAVY)
    add_metric_card(s9, Inches(9.8), Inches(1.8), Inches(2.7), Inches(1.3), "≤ 1 Call", "Customer Status Chases", "Down from 3.0 calls (-67% support load)", DARK_NAVY)

    add_content_card(s9, Inches(0.8), Inches(3.3), Inches(5.6), Inches(3.5), "Financial Model & Cost Savings", [
        "Baseline Economics (5,000 Leads Quarter):",
        "  • 368 activations @ ₹15,000 CAC = ₹55.2 Lakhs total acquisition expenditure.",
        "  • Median monthly bundle = ₹6,900 (Annualized revenue: ~₹3.05 Crores).",
        "Projected Udyam Digital Economics (5,000 Leads):",
        "  • 10% conversion = 500 activations (+132 incremental customers / quarter).",
        "  • CAC reduced to ₹12,000 = ₹60.0 Lakhs spend for 36% more customers.",
        "  • Effective CAC per incremental customer drops substantially.",
        "  • Incremental Annual Recurring Revenue (ARR): ₹1.09 Crores per quarter.",
        "Support Cost Avoidance: Eliminating 2 calls per lead across 5,000 prospects saves ~10,000 support minutes quarterly."
    ])

    add_content_card(s9, Inches(6.8), Inches(3.3), Inches(5.7), Inches(3.5), "Payback & Customer Lifetime Value (LTV)", [
        "Payback Period: With median bundle of ₹6,900/mo and gross margin ~65%, monthly gross profit is ~₹4,485. CAC payback drops from 3.3 months to 2.6 months.",
        "Churn Mitigation: 6-month churn target maintained at <= 2.5% through right-sized bundling (avoiding push-selling that leads to buyer regret).",
        "NPS Improvement: Proactive ETA tracking and zero bill shock targets raising NPS from 6.9 to >= 8.0.",
        "High Expansion LTV: Micro accounts on Biz Fibre 100 graduate to Cloud Email (P16) and Security (P20) as team size expands."
    ])

    # ==========================================
    # SLIDE 10: PILOT ROADMAP & TARGETS
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    add_slide_bg(s10)
    add_header(s10, "Rollout Strategy & Governance", "8-Week Pilot Roadmap, Target KPIs & Risk Mitigation", "A disciplined phased rollout in select Tier 1/2 clusters to validate hypotheses before nationwide rollout.")

    add_content_card(s10, Inches(0.8), Inches(1.8), Inches(5.6), Inches(5.0), "8-Week Phased Pilot Roadmap", [
        "Phase 1: Pilot Preparation (Weeks 1-2):",
        "  • Finalize API integrations for GSTIN/Udyam lookup & DigiLocker e-sign.",
        "  • Select two pilot city clusters: Jaipur (Tier 2 hub) & Pune (Tier 1 hub).",
        "  • Partner alignment: train 20 local channel partners on assisted back-office.",
        "Phase 2: Closed Beta Launch (Weeks 3-4):",
        "  • Launch with Professional Offices and Micro Retail cohorts via digital inbound.",
        "  • Test voice advisor accuracy in Hindi/English; monitor OCR exception rate.",
        "Phase 3: Multi-Site & Partner Expansion (Weeks 5-6):",
        "  • Roll out multi-site bundle; enable partner propensity callback queue.",
        "  • Measure activation cycle time and customer status chase frequency.",
        "Phase 4: Evaluation & Scale Readiness (Weeks 7-8):",
        "  • Validate conversion rate vs control group; audit DPDP compliance logs.",
        "  • Present pilot metrics to leadership for pan-India commercial rollout."
    ])

    add_content_card(s10, Inches(6.8), Inches(1.8), Inches(5.7), Inches(5.0), "Target KPIs & Risk Mitigation Matrix", [
        "Target Success Metrics (Pilot Hypotheses):",
        "  • Lead-to-Activation: Raise from 7.36% to ≥ 10.0%.",
        "  • Activation Turnaround: Reduce from 17.6 days to ≤ 10 days.",
        "  • Customer Status Inquiries: Reduce from ~3 calls to ≤ 1 call.",
        "  • 6-Month Customer Churn: Maintain at ≤ 2.5%.",
        "  • Customer NPS: Improve from 6.9 baseline to ≥ 8.0.",
        "Risk Mitigation Strategies:",
        "  • OCR / Registry Mismatch: Automated human-in-the-loop fallback to local partner.",
        "  • Consent & DPDP Compliance: Granular affirmative consent, data masking & 90-day retention schedule.",
        "  • Channel Conflict: Guaranteed commission attribution on digital leads.",
        "  • Last-Mile Installation Bottlenecks: Dynamic SLA engine calculates realistic delivery dates based on catalogue install constraints."
    ])

    output_path = os.path.join('submission', 'Project_Udyam_Digital_Business_Case.pptx')
    prs.save(output_path)
    print(f"Presentation saved successfully to: {output_path}")

if __name__ == '__main__':
    create_deck()
