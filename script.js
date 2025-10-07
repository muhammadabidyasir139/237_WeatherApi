const API_KEY = "13c646f3661f451abae20558250710";

document.getElementById("getCuaca").addEventListener("click", getCuaca);

function getCuaca() {
  const input = document.getElementById("lokasiInput").value.trim();
  const errorEl = document.getElementById("errorMessage");
  const resultEl = document.getElementById("result");

  errorEl.style.display = "none";
  resultEl.style.display = "none";

  if (!input) {
    errorEl.textContent = "⚠️ Silakan masukkan lokasi!";
    errorEl.style.display = "block";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
    input
  )}&aqi=no`;

  $.ajax({
    url: url,
    method: "GET",
    success: function (data) {
      // Isi data
      document.getElementById("namaKota").textContent =
        data.location.name || "–";
      document.getElementById("negara").textContent =
        data.location.country || "–";
      document.getElementById("provinsi").textContent =
        data.location.region || "–";
      document.getElementById("latitude").textContent =
        data.location.lat || "–";
      document.getElementById("longitude").textContent =
        data.location.lon || "–";
      document.getElementById("suhu").textContent = data.current.temp_c || "–";
      document.getElementById("kelembaban").textContent =
        data.current.humidity || "–";

      resultEl.style.display = "block";
    },
    error: function (xhr, status, error) {
      let msg = "❌ Gagal mengambil data cuaca.";
      if (xhr.status === 400) {
        msg = "📍 Lokasi tidak ditemukan. Coba nama kota yang valid.";
      } else if (xhr.status === 401 || xhr.status === 403) {
        msg = "🔑 API Key tidak valid. Periksa kunci API Anda.";
      }
      errorEl.textContent = msg;
      errorEl.style.display = "block";
    },
  });
}
