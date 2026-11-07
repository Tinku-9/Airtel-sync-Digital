/**
 * Project Udyam Digital — Accel Business / Airtel SYNC 2026
 * Partner & Sales Back-Office Cockpit Logic
 */

let DATA_PATH = '../YTL_TrackA_Udyam_Digital_Data/';
let allLeads = [];

document.addEventListener('DOMContentLoaded', () => {
  loadLeadsData();
  initFilters();
});

async function loadLeadsData() {
  try {
    let text = await fetchCsvFile('smb_leads.csv');
    allLeads = parseCsv(text);
    processAndRenderLeads();
  } catch (err) {
    console.warn("Retrying leads path...", err);
    DATA_PATH = './YTL_TrackA_Udyam_Digital_Data/';
    try {
      let text = await fetchCsvFile('smb_leads.csv');
      allLeads = parseCsv(text);
      processAndRenderLeads();
    } catch (e2) {
      console.error("Failed to load leads data:", e2);
      renderMockLeads();
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

function calculatePropensityScore(lead) {
  let score = 30; // base score

  // 1. GSTIN Presence (+25 pts)
  if (lead.has_gstin === 'Y') score += 25;

  // 2. High-converting segments (+15 to +20 pts)
  if (lead.segment === 'Professional offices') score += 20;
  else if (lead.segment === 'Small multi-site businesses') score += 20;
  else if (lead.segment === 'Small manufacturers') score += 15;
  else score += 5;

  // 3. Process-Friction Drop Reasons (+20 pts) -> High intent leads!
  let r = lead.drop_reason || '';
  if (/no time for a visit/i.test(r)) score += 20;
  else if (/quote too complex/i.test(r)) score += 20;
  else if (/quote delay|too long/i.test(r)) score += 20;
  else if (/visit not scheduled/i.test(r)) score += 15;
  else if (/unreachable/i.test(r)) score -= 10;
  else if (/locked in|wrong number/i.test(r)) score -= 25;

  // 4. Current Telecom Spend (+10 pts)
  let spend = parseFloat(lead.monthly_telecom_spend_inr || 0);
  if (spend >= 3000) score += 10;

  // 5. Stage reached (Deeper in funnel = higher propensity)
  if (lead.stage_reached === 'Quote accepted') score += 15;
  else if (lead.stage_reached === 'Needs assessed') score += 10;

  return Math.min(99, Math.max(15, score));
}

function processAndRenderLeads() {
  if (!allLeads.length) return;

  // Compute stats
  let total = allLeads.length;
  let activated = allLeads.filter(l => l.outcome === 'Activated').length;
  let convRate = ((activated / total) * 100).toFixed(2);

  document.getElementById('kpi-total-leads').textContent = total.toLocaleString();
  document.getElementById('kpi-conv-rate').textContent = `${convRate}%`;

  // Filter dropped leads that reached Needs Assessed or Quote Accepted
  let candidates = allLeads.filter(l => 
    l.outcome === 'Dropped' && 
    (l.stage_reached === 'Needs assessed' || l.stage_reached === 'Quote accepted' || /no time|quote|visit/i.test(l.drop_reason))
  );

  // Score candidates
  candidates.forEach(l => {
    l.propensityScore = calculatePropensityScore(l);
  });

  // Sort descending by propensity score
  candidates.sort((a, b) => b.propensityScore - a.propensityScore);

  window.scoredLeads = candidates;
  renderTable(candidates.slice(0, 50));
}

function renderTable(leads) {
  const tbody = document.getElementById('callback-leads-tbody');
  if (!tbody) return;

  tbody.innerHTML = leads.map(l => {
    let scoreClass = l.propensityScore >= 75 ? 'score-high' : l.propensityScore >= 55 ? 'score-med' : 'score-low';
    let scoreLabel = l.propensityScore >= 75 ? 'HIGH' : l.propensityScore >= 55 ? 'MED' : 'LOW';

    return `
      <tr>
        <td><code>${l.lead_id}</code></td>
        <td><strong>${escapeHtml(l.business_name)}</strong><br><small style="color: #64748B;">${escapeHtml(l.contact_name)} (${l.contact_role})</small></td>
        <td>${l.segment}</td>
        <td>${l.city} (${l.city_tier === '1' ? 'Tier 1' : 'Tier 2'})</td>
        <td><small style="color: #DC2626;">${escapeHtml(l.drop_reason)}</small></td>
        <td><span class="score-badge ${scoreClass}">${l.propensityScore} (${scoreLabel})</span></td>
        <td><button class="action-call-btn" onclick="triggerPartnerCall('${l.lead_id}', '${escapeHtml(l.business_name)}')">1-Click Call</button></td>
      </tr>
    `;
  }).join('');
}

function initFilters() {
  const segFilter = document.getElementById('filter-segment');
  const scoreFilter = document.getElementById('filter-score');

  function applyFilters() {
    let list = window.scoredLeads || [];
    let seg = segFilter.value;
    let sc = scoreFilter.value;

    let filtered = list.filter(l => {
      if (seg !== 'all' && l.segment !== seg) return false;
      if (sc === 'high' && l.propensityScore < 75) return false;
      if (sc === 'med' && (l.propensityScore < 50 || l.propensityScore >= 75)) return false;
      return true;
    });

    renderTable(filtered.slice(0, 50));
  }

  segFilter.addEventListener('change', applyFilters);
  scoreFilter.addEventListener('change', applyFilters);
}

window.triggerPartnerCall = function(leadId, businessName) {
  alert(`[1-Click Callback Initiated]\nLead: ${leadId} (${businessName})\nAction: Direct phone call dispatched to Jaipur Partner executive with tailored digital quote pre-loaded!`);
};

function renderMockLeads() {
  let mockList = [
    { lead_id: 'L00142', business_name: 'Apex Diagnostic Centre', contact_name: 'Dr. Ramesh Gupta', contact_role: 'Director', segment: 'Professional offices', city: 'Jaipur', city_tier: '2', drop_reason: 'Owner had no time for a visit', propensityScore: 92 },
    { lead_id: 'L00398', business_name: 'Symphony CA Associates', contact_name: 'Anita Verma', contact_role: 'Partner', segment: 'Professional offices', city: 'Pune', city_tier: '1', drop_reason: 'Quote too complex to understand', propensityScore: 89 },
    { lead_id: 'L00721', business_name: 'Chopsticks Retail Chain (3 Outlets)', contact_name: 'Vikas Roy', contact_role: 'Owner', segment: 'Small multi-site businesses', city: 'Lucknow', city_tier: '2', drop_reason: 'Quote delay / took too long', propensityScore: 86 },
    { lead_id: 'L01284', business_name: 'Sharma Sweets & Kirana', contact_name: 'Mohan Sharma', contact_role: 'Proprietor', segment: 'Micro retail & services', city: 'Indore', city_tier: '2', drop_reason: 'Owner had no time for a visit', propensityScore: 78 }
  ];
  window.scoredLeads = mockList;
  renderTable(mockList);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
