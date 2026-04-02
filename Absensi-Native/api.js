// api.js

// Ganti dengan Deployment ID dari backend GAS Anda
const BASE_URL = "https://script.google.com/macros/s/AKfycbzSJupz-MFlNvlqIFxvvwtAHG0jZvISacnMU6a8YPBOJNkW2d6NB1PNIW-Ja9j1borpJA/exec";

/**
 * Fungsi pembungkus terpusat untuk memanggil API GAS
 * @param {string} path - Routing endpoint (misal: 'auth/login')
 * @param {object} payloadData - Data body (tanpa perlu menyertakan path atau auth_token)
 */
async function apiCall(path, payloadData = {}) {
    // 1. Siapkan payload dasar dan injeksi path routing
    const payload = { 
        ...payloadData, 
        path: path 
    };

    // 2. Injeksi token otomatis (Kecuali untuk endpoint publik)
    if (path !== "auth/login" && path !== "auth/register") {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            console.warn("Kritikal: Token tidak ditemukan. Harap login ulang.");
            return { ok: false, error: "unauthorized: token tidak ditemukan di perangkat" };
        }
        payload.auth_token = token;
    }

    try {
        // 3. Panggil API secara POST tanpa Content-Type (Solusi menghindari CORS GAS)
        const response = await fetch(BASE_URL, {
            method: "POST",
            // PENTING: Jangan tambahkan headers: { 'Content-Type': 'application/json' }
            // GAS otomatis memparsing body berupa teks murni.
            body: JSON.stringify(payload)
        });

        // 4. Keamanan Parsing: Ambil sebagai text dulu untuk mencegah error JSON.parse()
        const textResponse = await response.text();
        
        try {
            const jsonResponse = JSON.parse(textResponse);
            return jsonResponse;
        } catch (parseError) {
            console.error("Respon server bukan JSON yang valid:", textResponse);
            return { ok: false, error: "server_error: Gagal memparsing respon dari server." };
        }

    } catch (networkError) {
        console.error("Masalah Jaringan atau CORS:", networkError);
        return { ok: false, error: "network_error: Gagal terhubung ke server. Cek koneksi atau URL." };
    }
}