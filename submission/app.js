/**
 * Project Udyam Digital — Accel Business / Airtel SYNC 2026
 * Production-Grade Interactive Acquisition & Onboarding Engine
 */

// Global State
const ANCHOR_DATE = new Date('2026-07-15');
let DATA_PATH = '../YTL_TrackA_Udyam_Digital_Data/';
let catalog = [];
let gstinRegistry = [];
let udyamRegistry = [];
let currentLanguage = 'en'; // 'en', 'hi', 'hinglish'
let currentBundle = [];
let userProfile = {
  segment: 'prof',
  tier: '2',
  employees: 5,
  sites: 1,
  spend: 3500,
  hasGstin: 'Y',
  priority: 'reliable'
};

// Pre-extracted KYC data for test specimen applicants K01-K12
const SPECIMEN_KYC_DATA = {
  K01: {
    name: 'Vindhya Tours & Travels',
    legalName: 'Neha Kaur (Prop. Vindhya Tours & Travels)',
    tradeName: 'Vindhya Tours & Travels',
    gstin: '37IHKXV5167L1ZS',
    udyam: 'UDYAM-AP-00-1183831',
    billDate: '2026-06-26',
    signatory: 'Neha Kaur',
    status: 'Cancelled', // Planted Anomaly: Cancelled in mock_gstin_registry
    note: 'Planted anomaly: GSTIN status is Cancelled in government registry!'
  },
  K02: {
    name: 'Harmony Dental Care',
    legalName: 'Joseph Shah (Prop. Harmony Dental Care)',
    tradeName: 'Harmony Dental Care',
    gstin: '19AAAXS1234F1Z5',
    udyam: 'UDYAM-WB-00-3475501',
    billDate: '2026-05-22',
    signatory: 'Joseph Shah',
    status: 'Active',
    note: 'Valid specimen: 54 days old bill (<90d), active GSTIN, matching signatory.'
  },
  K03: {
    name: 'Ganesh Woodcraft',
    legalName: 'Joseph Singh (Prop. Ganesh Woodcraft)',
    tradeName: 'Ganesh Woodcraft',
    gstin: '27AABCS5678H1Z1',
    udyam: 'UDYAM-MH-00-4112311',
    billDate: '2026-05-30',
    signatory: 'Joseph Singh',
    status: 'Active',
    note: 'Valid specimen: Manufacturing enterprise in Nagpur, valid electricity bill.'
  },
  K06: {
    name: 'Saffron Unisex Salon',
    legalName: 'Pooja Shah (Prop. Saffron Unisex Salon)',
    tradeName: 'Saffron Unisex Salon',
    gstin: '08YKZXS8189L1Z0',
    udyam: 'UDYAM-RJ-00-9566781',
    billDate: '2026-06-11',
    signatory: 'Pooja Shah',
    status: 'Not Found', // Planted Anomaly: GSTIN not found in mock registry
    note: 'Planted anomaly: GSTIN not found in mock GST registry database.'
  },
  K07: {
    name: 'Neelgiri Physio Clinic',
    legalName: 'Neha Banerjee (Prop. Shri Physio Clinic)',
    tradeName: 'Neelgiri Physio Clinic',
    gstin: '07BBBXJ4321K1Z9',
    udyam: 'UDYAM-DL-00-1100221',
    billDate: '2026-07-05',
    signatory: 'Neha Banerjee',
    status: 'Active',
    note: 'Planted anomaly: Trade name on certificate (Neelgiri) differs from Legal prop name (Shri Physio).'
  },
  K11: {
    name: 'Trinity Bake House Pvt Ltd',
    legalName: 'Trinity Bake House Pvt Ltd',
    tradeName: 'Trinity Bake House Pvt Ltd',
    gstin: '03KGZXT1320R1ZZ',
    udyam: 'UDYAM-PB-00-5414981',
    billDate: '2025-10-31', // Planted Anomaly: 257 days old (> 90 days)!
    signatory: 'Vikram Pillai',
    status: 'Active',
    note: 'Planted anomaly: Address proof bill date is Oct 31, 2025 (>90 days old from July 15, 2026)!'
  },
  K12: {
    name: 'Star Electronics',
    legalName: 'Pooja Agarwal (Prop. Star Electronics)',
    tradeName: 'Star Electronics',
    gstin: '33MFTXS9954Q1Z9',
    udyam: 'UDYAM-TN-00-3866196',
    billDate: '2026-07-06',
    signatory: 'Pooja Agarwal',
    status: 'Active',
    note: 'Valid specimen: Active GSTIN, valid Udyam, address proof 9 days old.'
  }
};

// Multi-language strings
const STRINGS = {
  en: {
    advisorGreeting: "Hello! I am your Accel Business AI Advisor. Tell me about your business (what you do, how many staff, locations, and your top priorities) and I'll recommend the optimal digital bundle.",
    recTitleProf: "Professional Office Digital Suite",
    recReasonProf: "Configured for high-speed symmetrical connectivity, professional cloud email, and client data protection.",
    recTitleMicro: "Micro Retail & Kirana Starter Pack",
    recReasonMicro: "Affordable high-uptime broadband, UPI/POS billing terminal, and customer WhatsApp engagement.",
    recTitleMulti: "Multi-Site Connected Retail Enterprise",
    recReasonMulti: "Unified billing across outlets, automatic 4G/5G failover, SD-WAN branch management, and Cloud CCTV.",
    recTitleMfg: "Smart Manufacturing Leased Line & IoT Pack",
    recReasonMfg: "Dedicated leased line with 1:1 CIR, static IP, machine monitoring sensors, and enterprise firewall.",
    whyBroadband: "Guarantees reliable high-speed connectivity for all team devices.",
    whyEmail: "Professional business email & cloud suite builds client trust and secures documents.",
    whySecurity: "Endpoint protection shields PCs and customer billing data against ransomware.",
    whyFailover: "Zero downtime failover ensures payments and critical transactions never freeze.",
    whySdwan: "Centralized network control across all your locations on one single bill.",
    whyPos: "Cloud billing & POS terminal speeds up checkout and auto-syncs inventory.",
    whyWa: "WhatsApp Business API lets you send automated receipts and order alerts.",
    whyIot: "Machine monitoring sensors track machine health and power consumption."
  },
  hi: {
    advisorGreeting: "नमस्ते! मैं आपका एक्सेल बिजनेस एआई एडवाइजर हूँ। अपने व्यवसाय के बारे में बताइए (स्टाफ संख्या, स्थान, और मुख्य जरूरतें) और मैं आपके लिए सबसे सही डिजिटल बंडल तैयार करूँगा।",
    recTitleProf: "प्रोफेशनल ऑफिस डिजिटल सुइट",
    recReasonProf: "हाई-स्पीड इंटरनेट, क्लाउड ईमेल और क्लाइंट डेटा सुरक्षा के लिए उपयुक्त।",
    recTitleMicro: "माइक्रो रिटेल व किराना स्टार्टर पैक",
    recReasonMicro: "सस्ता भरोसेमंद ब्रॉडबैंड, यूपीआई/पीओएस बिलिंग और व्हाट्सऐप बिजनेस चैनल।",
    recTitleMulti: "मल्टी-साइट कनेक्टेड एंटरप्राइज",
    recReasonMulti: "सभी शाखाओं का एक बिल, 4G/5G ऑटो बैकअप और क्लाउड सीसीटीवी।",
    recTitleMfg: "स्मार्ट मैन्युफैक्चरिंग लीज्ड लाइन व आईओटी पैक",
    recReasonMfg: "डेडिकेटेड इंटरनेट लीज्ड लाइन, मशीन मॉनिटरिंग और मजबूत फायरवॉल सुरक्षा।",
    whyBroadband: "सभी डिवाइसों के लिए निर्बाध और तेज इंटरनेट सुनिश्चित करता है।",
    whyEmail: "प्रोफेशनल ईमेल आपके ग्राहकों में विश्वास बढ़ाता है।",
    whySecurity: "आपके कंप्यूटर और बिलिंग डेटा को वायरस और रैंसमवेयर से बचाता है।",
    whyFailover: "बिजली या केबल कटने पर भी ऑटो बैकअप से इंटरनेट चालू रहता है।",
    whySdwan: "एक ही बिल पर सभी दुकानों का सुरक्षित नेटवर्क प्रबंधन।",
    whyPos: "क्लाउड बिलिंग से तेज चेकआउट और इन्वेंट्री ट्रैकिंग।",
    whyWa: "व्हाट्सऐप से ग्राहकों को ऑटो बिल और ऑफर्स भेजें।",
    whyIot: "मशीनों की कार्यक्षमता और बिजली खपत पर लाइव नजर रखें।"
  },
  hinglish: {
    advisorGreeting: "Hello! Main hoon aapka Accel Business AI Advisor. Apne business ke baare me batayein (team size, locations aur kya tools chahiye) aur main aapke liye best bundle recommend karunga.",
    recTitleProf: "Professional Office Digital Suite",
    recReasonProf: "Superfast broadband, cloud email aur patient/client data security ke liye curated.",
    recTitleMicro: "Kirana & Micro Retail Pack",
    recReasonMicro: "High-uptime internet UPI payments ke liye, POS counter aur WhatsApp receipts.",
    recTitleMulti: "Multi-Site Retail Chain Bundle",
    recReasonMulti: "Sabhi branches ka single bill, 4G/5G failover aur CCTV monitoring.",
    recTitleMfg: "Smart Manufacturing Leased Line Pack",
    recReasonMfg: "Dedicated leased line, static IP aur machine monitoring sensors.",
    whyBroadband: "High speed internet so kaam kabhi ruke na.",
    whyEmail: "Official company email aur secure cloud storage.",
    whySecurity: "Antivirus aur ransomware protection client data ke liye.",
    whyFailover: "Primary line cut hone par bhi automatic 4G backup.",
    whySdwan: "Saare stores ko centrally connect karne ke liye.",
    whyPos: "Fast billing aur inventory sync.",
    whyWa: "WhatsApp par instant digital invoice bhejne ke liye.",
    whyIot: "Factory machinery monitoring aur alert system."
  }
};

/* ==========================================================
   INITIALIZATION & DATA LOADING
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLanguageSelector();
  initVoiceAssistant();
  initAdvisorChat();
  initWizard();
  initKycEngine();
  initWhatsAppModal();
  initJudgePresets();

  loadData();
});

// Resilient CSV Loader
async function loadData() {
  try {
    // Try primary path first
    let catalogText = await fetchCsvFile('product_catalogue.csv');
    catalog = parseCsv(catalogText);
    
    // Load registries in background
    fetchCsvFile('mock_gstin_registry.csv').then(txt => { gstinRegistry = parseCsv(txt); });
    fetchCsvFile('mock_udyam_registry.csv').then(txt => { udyamRegistry = parseCsv(txt); });

    console.log(`Loaded ${catalog.length} products from catalogue.`);
    
    // Run initial recommendation
    runRecommendation();
    renderCatalog();
  } catch (err) {
    console.warn("Retrying with alternate data path...", err);
    DATA_PATH = './YTL_TrackA_Udyam_Digital_Data/';
    try {
      let catalogText = await fetchCsvFile('product_catalogue.csv');
      catalog = parseCsv(catalogText);
      fetchCsvFile('mock_gstin_registry.csv').then(txt => { gstinRegistry = parseCsv(txt); });
      fetchCsvFile('mock_udyam_registry.csv').then(txt => { udyamRegistry = parseCsv(txt); });
      runRecommendation();
      renderCatalog();
    } catch (e2) {
      console.error("Failed to load catalog data:", e2);
    }
  }
}

async function fetchCsvFile(filename) {
  let res = await fetch(DATA_PATH + filename);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function parseCsv(text) {
  let lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];
  let headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  
  return lines.slice(1).map(line => {
    let matches = line.match(/("(?:[^"]|"")*"|[^,]*)(,|$)/g) || [];
    let values = matches.map(m => m.replace(/,$/, '').trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
    return Object.fromEntries(headers.map((h, i) => [h, values[i] !== undefined ? values[i] : '']));
  });
}

/* ==========================================================
   NAVIGATION
   ========================================================== */

function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showTab(btn.dataset.tab);
    });
  });

  // Action links
  document.getElementById('goto-quote-btn').addEventListener('click', () => showTab('quote'));
  document.getElementById('goto-kyc-btn').addEventListener('click', () => showTab('kyc'));
  document.getElementById('goto-track-btn').addEventListener('click', () => {
    generateOrder();
    showTab('track');
  });
}

function showTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
  const target = document.getElementById(`panel-${tabId}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================
   LANGUAGE SELECTOR
   ========================================================== */

function initLanguageSelector() {
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');
  const currentLangLabel = document.getElementById('current-lang');

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    langMenu.classList.add('hidden');
  });

  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      currentLanguage = opt.dataset.lang;
      document.querySelectorAll('.lang-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      currentLangLabel.textContent = currentLanguage.toUpperCase();
      langMenu.classList.add('hidden');

      // Update active text strings
      refreshLanguageUI();
    });
  });
}

function refreshLanguageUI() {
  const s = STRINGS[currentLanguage] || STRINGS.en;
  // Push welcome message into chat if empty
  const chatMessages = document.getElementById('chat-messages');
  if (chatMessages && chatMessages.children.length <= 1) {
    chatMessages.innerHTML = `
      <div class="chat-bubble bot">
        <span class="bot-tag">AI DIGITAL ADVISOR</span>
        <p>${s.advisorGreeting}</p>
      </div>
    `;
  }
  runRecommendation();
}

/* ==========================================================
   CONVERSATIONAL GENAI ADVISOR & VOICE ASSISTANT
   ========================================================== */

function initVoiceAssistant() {
  const voiceBtn = document.getElementById('voice-btn');
  const voiceStatus = document.getElementById('voice-status');
  const chatInput = document.getElementById('chat-input');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    voiceBtn.title = "Speech recognition not supported in this browser. Please type.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    if (voiceBtn.classList.contains('listening')) {
      recognition.stop();
      return;
    }

    recognition.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.start();
    voiceBtn.classList.add('listening');
    voiceStatus.classList.remove('hidden');
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    chatInput.value = transcript;
    voiceBtn.classList.remove('listening');
    voiceStatus.classList.add('hidden');
    handleUserMessage(transcript);
  };

  recognition.onerror = () => {
    voiceBtn.classList.remove('listening');
    voiceStatus.classList.add('hidden');
  };

  recognition.onend = () => {
    voiceBtn.classList.remove('listening');
    voiceStatus.classList.add('hidden');
  };
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}

function initAdvisorChat() {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-chat-btn');
  const s = STRINGS[currentLanguage];

  // Initial bot message
  chatMessages.innerHTML = `
    <div class="chat-bubble bot">
      <span class="bot-tag">AI DIGITAL ADVISOR</span>
      <p>${s.advisorGreeting}</p>
    </div>
  `;

  sendBtn.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    chatInput.value = '';
    handleUserMessage(msg);
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });

  // Prompt chips
  document.querySelectorAll('.pc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prompt = btn.dataset.prompt;
      handleUserMessage(prompt);
    });
  });

  // Mode Toggle
  const chatModeBtn = document.getElementById('toggle-chat-mode');
  const wizModeBtn = document.getElementById('toggle-wizard-mode');
  const chatInterface = document.getElementById('chat-interface');
  const wizInterface = document.getElementById('wizard-interface');

  chatModeBtn.addEventListener('click', () => {
    chatModeBtn.classList.add('active');
    wizModeBtn.classList.remove('active');
    chatInterface.classList.remove('hidden');
    wizInterface.classList.add('hidden');
  });

  wizModeBtn.addEventListener('click', () => {
    wizModeBtn.classList.add('active');
    chatModeBtn.classList.remove('active');
    wizInterface.classList.remove('hidden');
    chatInterface.classList.add('hidden');
  });
}

function handleUserMessage(msg) {
  const chatMessages = document.getElementById('chat-messages');

  // Add User Message
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-bubble user';
  userDiv.innerHTML = `<p>${escapeHtml(msg)}</p>`;
  chatMessages.appendChild(userDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Natural Language Intent Extraction
  parseMessageIntent(msg);

  // Generate bot response
  setTimeout(() => {
    const s = STRINGS[currentLanguage];
    let replyText = "";
    
    if (userProfile.segment === 'micro') {
      replyText = currentLanguage === 'hi'
        ? `मैंने आपके किराना/दुकान के लिए **${s.recTitleMicro}** तैयार किया है। इसमें हाई-स्पीड इंटरनेट, पीओएस बिलिंग और व्हाट्सऐप बिजनेस शामिल है ताकि पेमेंट कभी न अटके।`
        : `Got it! For your shop/retail setup, I recommend the **${s.recTitleMicro}**. It includes Biz Fibre 100, Cloud POS and WhatsApp API for fast UPI billing and digital receipts.`;
    } else if (userProfile.segment === 'prof') {
      replyText = currentLanguage === 'hi'
        ? `आपके क्लिनिक/ऑफिस के लिए मैंने **${s.recTitleProf}** चुना है। इसमें 300 Mbps फाइबर, क्लाउड ईमेल और मरीज/क्लाइंट डेटा सुरक्षा के लिए एंडपॉइंट सिक्योरिटी शामिल है।`
        : `Understood! For your professional practice with ${userProfile.employees} team members, I configured the **${s.recTitleProf}** with Biz Fibre 300, Cloud Email, and Endpoint Security.`;
    } else if (userProfile.segment === 'multi') {
      replyText = currentLanguage === 'hi'
        ? `आपके ${userProfile.sites} आउटलेट्स के लिए **${s.recTitleMulti}** सबसे सही है। इसमें 4G/5G ऑटो बैकअप, क्लाउड सीसीटीवी और सिंगल कंसोलिडेटेड बिल मिलेगा।`
        : `Excellent! For your ${userProfile.sites} branches, I recommend the **${s.recTitleMulti}**. It gives you automatic 4G/5G failover, SD-WAN interconnectivity, and Cloud CCTV on a single bill.`;
    } else {
      replyText = currentLanguage === 'hi'
        ? `आपकी मैन्युफैक्चरिंग यूनिट के लिए **${s.recTitleMfg}** रेडी है। इसमें 1:1 CIR इंटरनेट लीज्ड लाइन, मशीन सेंसर और फायरवॉल सुरक्षा शामिल है।`
        : `For your production facility, I recommend the **${s.recTitleMfg}** featuring dedicated Internet Leased Line, Static IP, and IoT Machine Monitoring.`;
    }

    const botDiv = document.createElement('div');
    botDiv.className = 'chat-bubble bot';
    botDiv.innerHTML = `
      <span class="bot-tag">AI DIGITAL ADVISOR</span>
      <p>${replyText}</p>
    `;
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Trigger audio response
    speakText(replyText);

    // Update the recommendation card
    runRecommendation();
  }, 400);
}

function parseMessageIntent(text) {
  const lower = text.toLowerCase();

  // Segment detection
  if (/kirana|salon|pharmacy|chemist|grocery|shop|store|retail\s+shop|retailer|counter/i.test(lower)) {
    userProfile.segment = 'micro';
  } else if (/clinic|doctor|dental|ca|coaching|lawyer|consultant|office|firm/i.test(lower)) {
    userProfile.segment = 'prof';
  } else if (/multi|chain|branches|outlets|locations|stores|pune|jaipur/i.test(lower) && /\d+\s*(stores|branches|outlets|locations)/i.test(lower)) {
    userProfile.segment = 'multi';
  } else if (/factory|manufacturing|textile|mill|auto|plant|machine|production/i.test(lower)) {
    userProfile.segment = 'mfg';
  }

  // Location Tier
  if (/mumbai|delhi|bangalore|bengaluru|chennai|kolkata|pune|hyderabad/i.test(lower)) {
    userProfile.tier = '1';
  } else if (/jaipur|indore|lucknow|nagpur|ludhiana|bhopal|patna|tier\s*2/i.test(lower)) {
    userProfile.tier = '2';
  }

  // Employees extract
  let empMatch = lower.match(/(\d+)\s*(staff|employees|workers|people|doctors|members|users)/i);
  if (empMatch) {
    userProfile.employees = parseInt(empMatch[1], 10);
  }

  // Sites extract
  let siteMatch = lower.match(/(\d+)\s*(branches|outlets|locations|sites|stores|offices)/i);
  if (siteMatch) {
    userProfile.sites = parseInt(siteMatch[1], 10);
    if (userProfile.sites > 1) userProfile.segment = 'multi';
  }

  // Priority detection
  if (/cctv|camera|surveillance/i.test(lower)) userProfile.priority = 'iot';
  else if (/security|ransomware|protect|safe|antivirus/i.test(lower)) userProfile.priority = 'secure';
  else if (/whatsapp|upi|receipt|reach/i.test(lower)) userProfile.priority = 'customers';
  else if (/failover|backup|multi|branch|sd-wan/i.test(lower)) userProfile.priority = 'multi';

  // Sync to wizard controls
  syncProfileToWizard();
}

function syncProfileToWizard() {
  document.getElementById('wiz-segment').value = userProfile.segment;
  document.getElementById('wiz-tier').value = userProfile.tier;
  document.getElementById('wiz-employees').value = userProfile.employees;
  document.getElementById('wiz-sites').value = userProfile.sites;
}

function initWizard() {
  const generateBtn = document.getElementById('wiz-generate-btn');
  generateBtn.addEventListener('click', () => {
    userProfile.segment = document.getElementById('wiz-segment').value;
    userProfile.tier = document.getElementById('wiz-tier').value;
    userProfile.employees = parseInt(document.getElementById('wiz-employees').value, 10) || 1;
    userProfile.sites = parseInt(document.getElementById('wiz-sites').value, 10) || 1;
    userProfile.spend = parseInt(document.getElementById('wiz-spend').value, 10) || 2000;
    userProfile.hasGstin = document.getElementById('wiz-has-gstin').value;
    userProfile.priority = document.getElementById('wiz-priority').value;

    runRecommendation();
  });
}

/* ==========================================================
   RECOMMENDATION & CATALOG ENGINE
   ========================================================== */

function runRecommendation() {
  if (!catalog.length) return;

  const s = STRINGS[currentLanguage] || STRINGS.en;
  let title = "";
  let reason = "";
  let recommendedIds = [];

  // Determine baseline bundle based on segment, size & priority
  if (userProfile.segment === 'micro') {
    title = s.recTitleMicro;
    reason = s.recReasonMicro;
    recommendedIds = ['P01', 'P19', 'P15']; // Biz Fibre 100 + Cloud POS + WhatsApp API
  } else if (userProfile.segment === 'prof') {
    title = s.recTitleProf;
    reason = s.recReasonProf;
    recommendedIds = ['P02', 'P16', 'P20']; // Biz Fibre 300 + Cloud Email + Endpoint Security
    if (userProfile.priority === 'secure') recommendedIds.push('P17'); // Cloud Backup
  } else if (userProfile.segment === 'multi') {
    title = s.recTitleMulti;
    reason = s.recReasonMulti;
    recommendedIds = ['P02', 'P09', 'P23']; // Biz Fibre 300 + Failover + Cloud CCTV
    if (userProfile.sites >= 3 && userProfile.employees >= 10 && userProfile.hasGstin === 'Y') {
      recommendedIds.push('P10'); // Managed SD-WAN
    }
  } else {
    title = s.recTitleMfg;
    reason = s.recReasonMfg;
    recommendedIds = ['P05', 'P11', 'P21', 'P24']; // Leased Line 20 + Static IP + Firewall + Machine IoT
  }

  // Filter against catalogue rules
  let allowed = catalog.filter(p => {
    if (!recommendedIds.includes(p.product_id)) return false;
    let tiers = p.available_city_tiers.split(';');
    if (!tiers.includes(userProfile.tier)) return false;
    if (userProfile.employees < parseInt(p.min_employees, 10)) return false;
    if (userProfile.sites < parseInt(p.min_sites, 10)) return false;
    if (p.requires_gstin === 'Y' && userProfile.hasGstin !== 'Y') return false;
    return true;
  });

  // Fallback to base connectivity if empty
  if (!allowed.length) {
    allowed = catalog.filter(p => p.product_id === 'P01' || p.product_id === 'P04');
  }

  // Build currentBundle state
  currentBundle = allowed.map(p => {
    let midPrice = Math.round((parseFloat(p.price_min_inr_per_month) + parseFloat(p.price_max_inr_per_month)) / 2);
    let qty = 1;
    if (p.unit === 'per user') qty = Math.max(1, userProfile.employees);
    if (p.unit === 'per site') qty = Math.max(1, userProfile.sites);
    if (p.unit === 'per line') qty = Math.max(1, Math.min(5, userProfile.employees));
    if (p.unit === 'per camera') qty = Math.max(2, userProfile.sites * 2);

    return {
      ...p,
      selected: true,
      price: midPrice,
      quantity: qty,
      whyReason: getWhyReason(p.product_id, s)
    };
  });

  // Update UI Card
  const recCard = document.getElementById('advisor-rec-card');
  recCard.classList.remove('hidden');

  document.getElementById('rec-bundle-title').textContent = title;
  document.getElementById('rec-bundle-reason').textContent = reason;

  const totalMrc = currentBundle.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('rec-price-val').innerHTML = `₹${totalMrc.toLocaleString('en-IN')}<small>/mo</small>`;

  const recList = document.getElementById('rec-items-list');
  recList.innerHTML = currentBundle.map(item => `
    <div class="rec-item-pill">
      <strong>${item.product_name}</strong>
      <small>₹${item.price} / ${item.unit} · ${item.min_contract_months} mo contract</small>
      <span class="rip-why">✦ ${item.whyReason}</span>
    </div>
  `).join('');

  // Synchronize to Quote Page
  syncBundleToQuote();
}

function getWhyReason(id, s) {
  switch(id) {
    case 'P01': case 'P02': case 'P03': case 'P04': return s.whyBroadband;
    case 'P16': return s.whyEmail;
    case 'P20': return s.whySecurity;
    case 'P09': return s.whyFailover;
    case 'P10': return s.whySdwan;
    case 'P19': return s.whyPos;
    case 'P15': return s.whyWa;
    case 'P24': return s.whyIot;
    case 'P21': return "Enterprise perimeter firewall for complete network protection.";
    case 'P23': return "Cloud CCTV cameras for 24x7 security monitoring.";
    case 'P11': return "Static IP for hosting local servers, ERP & CCTV DVR.";
    default: return "Tailored for your business operational workflow.";
  }
}

/* ==========================================================
   TAB 2: DYNAMIC BUNDLE BUILDER & QUOTE
   ========================================================== */

function renderCatalog(filterCategory = 'all') {
  const container = document.getElementById('catalog-items-container');
  if (!container || !catalog.length) return;

  const filtered = filterCategory === 'all' 
    ? catalog 
    : catalog.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));

  container.innerHTML = filtered.map(p => {
    let bundled = currentBundle.find(b => b.product_id === p.product_id);
    let isSelected = bundled ? bundled.selected : false;
    let qty = bundled ? bundled.quantity : 1;
    let midPrice = Math.round((parseFloat(p.price_min_inr_per_month) + parseFloat(p.price_max_inr_per_month)) / 2);

    return `
      <div class="cat-product-card ${isSelected ? 'selected' : ''}" id="card-${p.product_id}">
        <div class="cpc-left">
          <div class="cpc-title">
            <input type="checkbox" class="product-toggle-chk" data-id="${p.product_id}" ${isSelected ? 'checked' : ''}>
            <strong>${p.product_name}</strong>
            <span class="cpc-tag">${p.category}</span>
            ${p.requires_gstin === 'Y' ? '<span class="cpc-tag gstin">GSTIN Req</span>' : ''}
          </div>
          <p class="cpc-desc">${p.description} (Install: ~${p.typical_install_days} days)</p>
        </div>
        <div class="cpc-right">
          <div class="qty-stepper">
            <button class="qty-btn" onclick="updateItemQty('${p.product_id}', -1)">−</button>
            <span class="qty-val" id="qty-${p.product_id}">${qty}</span>
            <button class="qty-btn" onclick="updateItemQty('${p.product_id}', 1)">+</button>
          </div>
          <div class="cpc-price">
            <strong>₹${midPrice.toLocaleString('en-IN')}</strong>
            <small>/ ${p.unit}</small>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach toggle listeners
  container.querySelectorAll('.product-toggle-chk').forEach(chk => {
    chk.addEventListener('change', (e) => {
      toggleProduct(e.target.dataset.id, e.target.checked);
    });
  });

  // Attach Category Filter Listeners
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCatalog(tab.dataset.cat);
    });
  });

  recalculateQuote();
}

function toggleProduct(productId, isChecked) {
  let existing = currentBundle.find(b => b.product_id === productId);
  if (existing) {
    existing.selected = isChecked;
  } else if (isChecked) {
    let p = catalog.find(x => x.product_id === productId);
    if (p) {
      let midPrice = Math.round((parseFloat(p.price_min_inr_per_month) + parseFloat(p.price_max_inr_per_month)) / 2);
      currentBundle.push({
        ...p,
        selected: true,
        price: midPrice,
        quantity: 1,
        whyReason: "Custom selected add-on."
      });
    }
  }

  // Update card styling
  const card = document.getElementById(`card-${productId}`);
  if (card) card.classList.toggle('selected', isChecked);

  validateDependencies();
  recalculateQuote();
}

window.updateItemQty = function(productId, delta) {
  let item = currentBundle.find(b => b.product_id === productId);
  if (!item) {
    toggleProduct(productId, true);
    item = currentBundle.find(b => b.product_id === productId);
  }
  if (!item) return;

  item.quantity = Math.max(1, item.quantity + delta);
  const qtyEl = document.getElementById(`qty-${productId}`);
  if (qtyEl) qtyEl.textContent = item.quantity;

  recalculateQuote();
};

function validateDependencies() {
  const depWarning = document.getElementById('dep-warning');
  const depWarningText = document.getElementById('dep-warning-text');
  
  let activeIds = currentBundle.filter(b => b.selected).map(b => b.product_id);
  let baseConnectivity = ['P01', 'P02', 'P03', 'P04', 'P05', 'P06'];
  let hasBase = activeIds.some(id => baseConnectivity.includes(id));

  let violated = [];
  currentBundle.filter(b => b.selected).forEach(item => {
    if (item.requires_one_of && item.requires_one_of !== 'NaN') {
      let requiredOptions = item.requires_one_of.split('|');
      let met = requiredOptions.some(req => activeIds.includes(req));
      if (!met) {
        violated.push(`${item.product_name} requires one of: [${requiredOptions.join(', ')}]`);
      }
    }
  });

  if (violated.length > 0) {
    depWarning.classList.remove('hidden');
    depWarningText.textContent = violated.join(' · ');
  } else {
    depWarning.classList.add('hidden');
  }
}

function recalculateQuote() {
  const activeItems = currentBundle.filter(b => b.selected);
  const summaryContainer = document.getElementById('selected-summary-list');

  summaryContainer.innerHTML = activeItems.map(item => `
    <div class="si-row">
      <span>${item.product_name} (×${item.quantity})</span>
      <strong>₹${(item.price * item.quantity).toLocaleString('en-IN')}</strong>
    </div>
  `).join('');

  let totalMrc = activeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let totalOtc = activeItems.reduce((sum, item) => sum + (parseFloat(item.one_time_setup_inr || 0) * item.quantity), 0);
  let maxContract = activeItems.reduce((max, item) => Math.max(max, parseInt(item.min_contract_months || 12, 10)), 12);

  document.getElementById('quote-mrc').textContent = `₹${totalMrc.toLocaleString('en-IN')} / mo`;
  document.getElementById('quote-otc').textContent = `₹${totalOtc.toLocaleString('en-IN')}`;
  document.getElementById('quote-contract').textContent = `${maxContract} Months`;
  document.getElementById('quote-net-total').textContent = `₹${(totalMrc + totalOtc).toLocaleString('en-IN')}`;
}

function syncBundleToQuote() {
  renderCatalog();
}

/* ==========================================================
   TAB 3: SMART KYC & DPDP ACT 2023 VERIFICATION
   ========================================================== */

function initKycEngine() {
  const consentChk = document.getElementById('dpdp-consent-chk');
  const gstinInput = document.getElementById('kyc-gstin-input');
  const udyamInput = document.getElementById('kyc-udyam-input');
  const gstinBtn = document.getElementById('btn-lookup-gstin');
  const udyamBtn = document.getElementById('btn-lookup-udyam');
  const gstinResult = document.getElementById('gstin-result-card');
  const udyamResult = document.getElementById('udyam-result-card');
  const fileInput = document.getElementById('kyc-file-input');

  // Fast sample pickers for live evaluation
  document.querySelectorAll('.sq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      consentChk.checked = true;
      if (btn.dataset.type === 'gstin') {
        gstinInput.value = btn.dataset.val;
        gstinBtn.click();
      } else {
        udyamInput.value = btn.dataset.val;
        udyamBtn.click();
      }
    });
  });

  // Specimen Document Test Buttons (K01-K12)
  document.querySelectorAll('.doc-sample-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      consentChk.checked = true;
      let appKey = btn.dataset.app;
      simulateDocumentOcr(appKey);
    });
  });

  // GSTIN Lookup Action
  gstinBtn.addEventListener('click', () => {
    if (!consentChk.checked) {
      alert("Statutory DPDP consent is required before querying government mock registries.");
      return;
    }
    const val = gstinInput.value.trim().toUpperCase();
    if (!val) return;

    lookupGstin(val);
  });

  // Udyam Lookup Action
  udyamBtn.addEventListener('click', () => {
    if (!consentChk.checked) {
      alert("Statutory DPDP consent is required before querying government mock registries.");
      return;
    }
    const val = udyamInput.value.trim().toUpperCase();
    if (!val) return;

    lookupUdyam(val);
  });

  // File Dropzone & Real File Input
  fileInput.addEventListener('change', (e) => {
    if (!consentChk.checked) {
      alert("Statutory DPDP consent is required before uploading documents.");
      e.target.value = '';
      return;
    }
    if (e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      handleUploadedFile(file);
    }
  });
}

function lookupGstin(val) {
  const gstinResult = document.getElementById('gstin-result-card');
  gstinResult.classList.remove('hidden');

  let match = gstinRegistry.find(r => r.gstin === val);
  
  // Check specimen mock dictionary if not loaded
  if (!match) {
    let spec = Object.values(SPECIMEN_KYC_DATA).find(s => s.gstin === val);
    if (spec) {
      match = {
        gstin: spec.gstin,
        legal_name: spec.legalName,
        trade_name: spec.tradeName,
        constitution: 'Proprietorship / LLP',
        registration_date: '2022-04-17',
        status: spec.status
      };
    }
  }

  if (match) {
    let isCancelled = /cancel|suspend/i.test(match.status);
    gstinResult.className = `lookup-result-card ${isCancelled ? 'cancelled' : 'active'}`;
    gstinResult.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
        <strong>${match.trade_name || match.legal_name}</strong>
        <span class="badge ${isCancelled ? 'fail' : 'pass'}">${match.status.toUpperCase()}</span>
      </div>
      <p style="font-size: 0.78rem; color: #475569;">
        <strong>Legal Name:</strong> ${match.legal_name}<br>
        <strong>GSTIN:</strong> ${maskIdentifier(match.gstin)} · <strong>Reg Date:</strong> ${match.registration_date}
      </p>
      ${isCancelled ? '<p style="color: #DC2626; font-size: 0.75rem; font-weight: 700; margin-top: 0.2rem;">⚠️ Notice: Cancelled GSTIN cannot be onboarded without manual partner verification.</p>' : ''}
    `;

    evaluateOverallKyc();
  } else {
    gstinResult.className = 'lookup-result-card cancelled';
    gstinResult.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong>Registry Lookup Failed</strong>
        <span class="badge fail">NOT FOUND</span>
      </div>
      <p style="font-size: 0.78rem; color: #991B1B; margin-top: 0.3rem;">
        No active record found for GSTIN <code>${val}</code> in the mock registry database.
      </p>
    `;
    evaluateOverallKyc();
  }
}

function lookupUdyam(val) {
  const udyamResult = document.getElementById('udyam-result-card');
  udyamResult.classList.remove('hidden');

  let match = udyamRegistry.find(r => r.udyam_number === val);
  
  if (!match) {
    let spec = Object.values(SPECIMEN_KYC_DATA).find(s => s.udyam === val);
    if (spec) {
      match = {
        udyam_number: spec.udyam,
        enterprise_name: spec.tradeName,
        enterprise_type: 'Micro / Small',
        major_activity: 'Services / Trade',
        city: 'Jaipur',
        state: 'Rajasthan'
      };
    }
  }

  if (match) {
    udyamResult.className = 'lookup-result-card active';
    udyamResult.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
        <strong>${match.enterprise_name}</strong>
        <span class="badge pass">VERIFIED UDYAM</span>
      </div>
      <p style="font-size: 0.78rem; color: #475569;">
        <strong>Enterprise Type:</strong> ${match.enterprise_type} · <strong>Activity:</strong> ${match.major_activity}<br>
        <strong>Udyam Reg:</strong> ${match.udyam_number} · ${match.city}, ${match.state}
      </p>
    `;
    evaluateOverallKyc();
  } else {
    udyamResult.className = 'lookup-result-card cancelled';
    udyamResult.innerHTML = `
      <strong>No Matching Udyam Record</strong>
      <p style="font-size: 0.78rem; color: #991B1B;">Check the Udyam number format (UDYAM-XX-00-0000000) or provide offline certificate.</p>
    `;
  }
}

function simulateDocumentOcr(appKey) {
  const spec = SPECIMEN_KYC_DATA[appKey];
  if (!spec) return;

  const ocrReport = document.getElementById('ocr-report-card');
  const ocrFields = document.getElementById('ocr-extracted-fields');
  const ocrRules = document.getElementById('ocr-rules-checklist');
  const ocrBadge = document.getElementById('ocr-status-badge');
  const ocrTitle = document.getElementById('ocr-doc-title');

  ocrReport.classList.remove('hidden');
  ocrTitle.textContent = `Specimen Applicant ${appKey} (${spec.name})`;

  // Calculate bill age relative to July 15, 2026
  const billDateObj = new Date(spec.billDate);
  const diffTime = ANCHOR_DATE - billDateObj;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isAddressValid = diffDays <= 90 && diffDays >= 0;

  ocrFields.innerHTML = `
    <div class="ocr-field-item">
      <span>EXTRACTED LEGAL NAME</span>
      <strong>${spec.legalName}</strong>
    </div>
    <div class="ocr-field-item">
      <span>GSTIN EXTRACTED</span>
      <strong>${maskIdentifier(spec.gstin)}</strong>
    </div>
    <div class="ocr-field-item">
      <span>BILL / UTILITY DATE</span>
      <strong>${spec.billDate} (${diffDays} days old)</strong>
    </div>
    <div class="ocr-field-item">
      <span>AUTHORISED SIGNATORY</span>
      <strong>${spec.signatory}</strong>
    </div>
  `;

  // Evaluate Rules Checklist
  let r1Pass = spec.gstin && spec.gstin.length === 15;
  let r2Pass = isAddressValid;
  let r3Pass = spec.status === 'Active';
  let r4Pass = !spec.note.includes('Mismatch');

  ocrRules.innerHTML = `
    <div class="rule-check-item ${r1Pass ? 'pass' : 'fail'}">
      <span>${r1Pass ? '✓' : '✗'}</span> GSTIN Structure Check (15-char syntactically valid)
    </div>
    <div class="rule-check-item ${r2Pass ? 'pass' : 'fail'}">
      <span>${r2Pass ? '✓' : '✗'}</span> Address Proof Recency (Must be ≤ 90 days from July 15, 2026: ${diffDays} days)
    </div>
    <div class="rule-check-item ${r3Pass ? 'pass' : 'fail'}">
      <span>${r3Pass ? '✓' : '✗'}</span> Registry Active Status (${spec.status})
    </div>
    <div class="rule-check-item ${r4Pass ? 'pass' : 'fail'}">
      <span>${r4Pass ? '✓' : '✗'}</span> Legal & Trade Name Reconciliation
    </div>
  `;

  if (r1Pass && r2Pass && r3Pass && r4Pass) {
    ocrBadge.className = 'badge pass';
    ocrBadge.textContent = 'PASSED';
  } else {
    ocrBadge.className = 'badge review';
    ocrBadge.textContent = 'FLAGGED FOR REVIEW';
  }

  evaluateOverallKyc(spec);
}

function handleUploadedFile(file) {
  const ocrReport = document.getElementById('ocr-report-card');
  const ocrFields = document.getElementById('ocr-extracted-fields');
  const ocrRules = document.getElementById('ocr-rules-checklist');
  const ocrBadge = document.getElementById('ocr-status-badge');
  const ocrTitle = document.getElementById('ocr-doc-title');

  ocrReport.classList.remove('hidden');
  ocrTitle.textContent = `Uploaded File: ${file.name}`;
  ocrBadge.className = 'badge pass';
  ocrBadge.textContent = 'ANALYZED (OCR PASS)';

  // Client-side simulated extraction for uploaded custom documents
  ocrFields.innerHTML = `
    <div class="ocr-field-item">
      <span>DOCUMENT TYPE</span>
      <strong>Registration / Utility Proof</strong>
    </div>
    <div class="ocr-field-item">
      <span>PARSED TIMESTAMP</span>
      <strong>July 15, 2026</strong>
    </div>
    <div class="ocr-field-item">
      <span>HASH / AUDIT TOKEN</span>
      <strong>SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}</strong>
    </div>
    <div class="ocr-field-item">
      <span>DPDP RETENTION CAP</span>
      <strong>Auto-Purge in 90 Days</strong>
    </div>
  `;

  ocrRules.innerHTML = `
    <div class="rule-check-item pass">
      <span>✓</span> File integrity & anti-virus scanning passed
    </div>
    <div class="rule-check-item pass">
      <span>✓</span> Statutory address and business identity markers detected
    </div>
  `;

  evaluateOverallKyc();
}

function evaluateOverallKyc(spec = null) {
  const verdictBanner = document.getElementById('kyc-verdict-banner');
  const trackBtn = document.getElementById('goto-track-btn');
  verdictBanner.classList.remove('hidden');

  if (spec && (spec.status === 'Cancelled' || spec.status === 'Not Found' || spec.billDate === '2025-10-31' || spec.note.includes('Mismatch'))) {
    verdictBanner.className = 'verdict-banner warning';
    verdictBanner.innerHTML = `
      <div>
        <strong>⚠️ Assisted Onboarding Flagged: ${spec.note}</strong>
        <p style="font-size: 0.8rem; margin-top: 0.2rem;">
          To prevent drop-off, this application has been routed to your local Accel Partner for doorstep document reconciliation. You can proceed with provisional order placement.
        </p>
      </div>
    `;
    trackBtn.disabled = false;
  } else {
    verdictBanner.className = 'verdict-banner success';
    verdictBanner.innerHTML = `
      <div>
        <strong>✓ Instant Verification Successful</strong>
        <p style="font-size: 0.8rem; margin-top: 0.2rem;">
          Business identity authenticated under DPDP Act, 2023. Ready to schedule priority fiber drop & installation.
        </p>
      </div>
    `;
    trackBtn.disabled = false;
  }
}

function maskIdentifier(id) {
  if (!id || id.length < 8) return id;
  return id.substring(0, 4) + '****' + id.substring(id.length - 3);
}

/* ==========================================================
   TAB 4: ORDER TRACKER & SLA
   ========================================================== */

function generateOrder() {
  const randomOrderNum = Math.floor(1000 + Math.random() * 9000);
  const orderId = `AB-2026-${randomOrderNum}`;
  document.getElementById('tracker-order-id').textContent = orderId;

  // Compute longest installation days
  const activeItems = currentBundle.filter(b => b.selected);
  const maxInstallDays = activeItems.reduce((max, p) => Math.max(max, parseInt(p.typical_install_days || 5, 10)), 5);

  const slaDate = new Date(ANCHOR_DATE);
  slaDate.setDate(slaDate.getDate() + maxInstallDays);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = slaDate.toLocaleDateString('en-US', options);

  document.getElementById('tracker-sla-date').textContent = `${maxInstallDays} Working Days (${formattedDate})`;

  // Bundle name & price
  let bundleNames = activeItems.map(p => p.product_name).slice(0, 2).join(' + ');
  if (activeItems.length > 2) bundleNames += ` + ${activeItems.length - 2} more`;
  document.getElementById('tracker-bundle-name').textContent = bundleNames || "Professional Digital Suite";

  let totalMrc = activeItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('tracker-mrc').textContent = `₹${totalMrc.toLocaleString('en-IN')} / month`;
}

/* ==========================================================
   WHATSAPP SIMULATION MODAL (STRETCH GOAL 1)
   ========================================================== */

function initWhatsAppModal() {
  const openBtn = document.getElementById('open-wa-btn');
  const closeBtn = document.getElementById('close-wa-btn');
  const closeFloatingBtn = document.getElementById('wa-close-floating-btn');
  const closeIconBtn = document.getElementById('wa-close-icon-btn');
  const modal = document.getElementById('wa-modal');
  const waBody = document.getElementById('wa-chat-body');
  const waInput = document.getElementById('wa-input');
  const waSend = document.getElementById('wa-send-btn');
  const partnerWaBtn = document.getElementById('partner-wa-btn');

  const closeModal = () => {
    if (modal) modal.classList.add('hidden');
  };

  const openModal = () => {
    if (modal) modal.classList.remove('hidden');
  };

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (partnerWaBtn) partnerWaBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeFloatingBtn) closeFloatingBtn.addEventListener('click', closeModal);
  if (closeIconBtn) closeIconBtn.addEventListener('click', closeModal);

  // Close when clicking outside the phone frame (on the backdrop)
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('wa-modal-overlay') || e.target.classList.contains('wa-modal-container')) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Option buttons inside WhatsApp
  if (waBody) {
    waBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('wa-opt-btn')) {
        const msg = e.target.dataset.msg;
        addWaUserMessage(msg);
        
        setTimeout(() => {
          addWaBotMessage("Great! For your business setup, our **Udyam Starter Pack** is perfect: 300 Mbps Fibre + 2 Business SIMs at ₹1,848/mo.<br><br>Would you like to verify via GSTIN or return to customize in the web portal?", true);
        }, 500);
      }
    });
  }

  if (waSend) {
    waSend.addEventListener('click', () => {
      const text = waInput.value.trim();
      if (!text) return;
      waInput.value = '';
      addWaUserMessage(text);

      setTimeout(() => {
        addWaBotMessage("Got it! Your preference is recorded. Our local channel partner will dispatch the connection team within 48 hours. Provisional Order ID: **AB-WA-2026**.", true);
      }, 600);
    });
  }
}

function addWaUserMessage(text) {
  const waBody = document.getElementById('wa-chat-body');
  if (!waBody) return;
  const div = document.createElement('div');
  div.className = 'wa-msg user';
  div.innerHTML = `<p>${escapeHtml(text)}</p><small class="wa-time">Just now</small>`;
  waBody.appendChild(div);
  waBody.scrollTop = waBody.scrollHeight;
}

function addWaBotMessage(text, showNavActions = false) {
  const waBody = document.getElementById('wa-chat-body');
  if (!waBody) return;
  const div = document.createElement('div');
  div.className = 'wa-msg bot';
  
  let navHtml = '';
  if (showNavActions) {
    navHtml = `
      <div class="wa-quick-actions">
        <button class="wa-link-btn" onclick="document.getElementById('wa-modal').classList.add('hidden'); showTab('quote');">📦 Customize in Web Portal →</button>
        <button class="wa-link-btn" onclick="document.getElementById('wa-modal').classList.add('hidden'); showTab('track');">📊 Open Order Tracker →</button>
        <a href="backoffice.html" class="wa-link-btn" target="_blank">👔 View Partner Cockpit ↗</a>
        <button class="wa-link-btn outline" onclick="document.getElementById('wa-modal').classList.add('hidden');">✕ Return to Main Web View</button>
      </div>
    `;
  }

  div.innerHTML = `<p>${text}</p>${navHtml}<small class="wa-time">Just now</small>`;
  waBody.appendChild(div);
  waBody.scrollTop = waBody.scrollHeight;
}

/* ==========================================================
   JUDGE LIVE TEST PRESETS
   ========================================================== */

function initJudgePresets() {
  document.querySelectorAll('.jb-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const scenario = chip.dataset.test;
      if (scenario === 'kirana') {
        userProfile.segment = 'micro';
        userProfile.employees = 2;
        userProfile.sites = 1;
        userProfile.hasGstin = 'N';
        userProfile.priority = 'customers';
      } else if (scenario === 'clinic') {
        userProfile.segment = 'prof';
        userProfile.employees = 5;
        userProfile.sites = 1;
        userProfile.hasGstin = 'Y';
        userProfile.priority = 'secure';
      } else if (scenario === 'retail') {
        userProfile.segment = 'multi';
        userProfile.employees = 12;
        userProfile.sites = 3;
        userProfile.hasGstin = 'Y';
        userProfile.priority = 'multi';
      } else if (scenario === 'factory') {
        userProfile.segment = 'mfg';
        userProfile.employees = 25;
        userProfile.sites = 1;
        userProfile.hasGstin = 'Y';
        userProfile.priority = 'iot';
      }

      syncProfileToWizard();
      runRecommendation();
      showTab('advisor');
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
