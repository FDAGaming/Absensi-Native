// --- api.js ---
const BASE_URL = "https://script.google.com/macros/s/AKfycbx85Sb45S4bQ4b_NQVxdizFIWJdah8A-Rqs8nrasFN_6PvLW7lcu7gqzDlSaVzpEC4mjw/exec";

// 1. UTILITAS DOM & FORMATTING
const $ = id => document.getElementById(id);
const _v = id => $(id) ? $(id).value.trim() : "";
function showAlert(id, msg, type = "err") {
  const el = $(id); if (!el) return; el.textContent = msg; el.className = `alert show a-${type}`;
  if (type !== "info") setTimeout(() => { if(el) el.className = "alert"; }, 6000);
}
function setSpin(id, on) { const el = $(id); if (el) el.innerHTML = on ? '<span class="spinner"></span> ' : ""; }
function fmtDt(ts) { try { return ts ? new Date(ts).toLocaleString("id-ID", { dateStyle:"short", timeStyle:"short" }) : "-"; } catch { return ts; } }
function fmtTime(ts) { try { return ts ? new Date(ts).toLocaleTimeString("id-ID", { hour:"2-digit", minute:"2-digit", second:"2-digit" }) : "-"; } catch { return ts; } }

// 2. OTENTIKASI & HTTP REQUEST
function getSession() { try { return JSON.parse(sessionStorage.getItem("ps") || "{}"); } catch(e) { return {}; } }
function logout() { sessionStorage.removeItem("ps"); window.location.href = "index.html"; }

async function api(path, data = {}) {
  const S = getSession();
  const body = { path, ...data };
  if (S.token) body.auth_token = S.token;
  try {
    const r = await fetch(BASE_URL, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "text/plain" } });
    return JSON.parse(await r.text());
  } catch(e) { return { ok: false, error: "Koneksi gagal: " + e.message }; }
}

function checkAuth(allowedRole) {
  const S = getSession();
  if(!S.token || S.role !== allowedRole) { alert("Akses Ditolak!"); window.location.href = "index.html"; }
  window.addEventListener("DOMContentLoaded", () => {
    $("nav-user").style.display = "flex";
    $("nav-name").textContent = S.name;
    $("nav-chip").textContent = S.role.toUpperCase();
    $("nav-chip").className = "role-pill rp-" + S.role;
  });
  return S;
}

// 3. KONFIGURASI LEAFLET MAPS
const MAPS = {}, TILE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", ATTR = '© OSM', DEF_C = [-7.2575, 112.7521];
function mkIcon(c,s=28){return L.divIcon({className:"",html:`<div style="background:${c};width:${s}px;height:${s}px;border-radius:50%;border:3px solid #fff;box-shadow:0 3px 12px rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;font-size:${s*.36}px">📍</div>`,iconSize:[s,s],iconAnchor:[s/2,s/2],popupAnchor:[0,-s/2]})}
function mkDot(c){return L.divIcon({className:"",html:`<div style="background:${c};width:9px;height:9px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2)"></div>`,iconSize:[9,9],iconAnchor:[4,4]})}
const IC_IND=mkIcon("#4361ee"), IC_GRN=mkIcon("#06d6a0",26), IC_RED=mkIcon("#ef233c",26), IC_PUR=mkIcon("#7b2d8b");
function initMap(id, c=DEF_C, z=15) { if (MAPS[id]) { MAPS[id].invalidateSize(); return MAPS[id]; } const m = L.map(id).setView(c, z); L.tileLayer(TILE, { attribution:ATTR, maxZoom:19 }).addTo(m); MAPS[id] = m; return m; }

// 4. GENERATOR QR CODE CANVAS (Paste utuh fungsi panjang Anda ke sini)
function renderQRCanvas(container, text, size) {
    /* ... PASTE ISI FUNGSI renderQRCanvas() DARI KODE SPA ANDA KE SINI ... */
    // (Dipotong agar rapi, Anda sudah memiliki kode murninya di versi SPA)
}