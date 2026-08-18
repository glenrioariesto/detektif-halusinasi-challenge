# Dokumentasi Rumus & Formula Perhitungan Evaluasi

Dokumen ini menjelaskan spesifikasi matematis kalkulasi skor, indeks akurasi, dan penentuan pangkat detektif pada game **Detektif Halusinasi KA**.

---

## 1. Komposisi Target Soal (10 Kasus / 13 Target)

Permainan terdiri dari 10 level investigasi dengan total **13 target anomali valid**:

| No | Tipe Kasus | Judul Kasus | Jumlah Target | Keterangan Target |
|---|---|---|:---:|---|
| 01 | **Citra (Gambar)** | Anomali Jari Roti | 1 | Jari keenam melayang |
| 02 | **Dokumen (Teks)** | Kurir Waterloo | 1 | Napoleon WhatsApp di era 1815 |
| 03 | **Citra (Gambar)** | Reklame Distorsi Kota | 1 | Tulisan neon meleleh (*gibberish*) |
| 04 | **Dokumen (Teks)** | Misi Apollo 11 | 1 | Selfie Instagram di Bulan tahun 1969 |
| 05 | **Citra (Gambar)** | Kacamata Refleksi Ganjil | 2 | Refleksi kacamata kiri & kanan |
| 06 | **Dokumen (Teks)** | Teori Gravitasi Newton | 1 | Newton searching Google tahun 1687 |
| 07 | **Citra (Gambar)** | Kucing Berwajah Dua | 2 | Kumis melayang & telinga ketiga |
| 08 | **Dokumen (Teks)** | Candi Borobudur | 1 | Borobudur dicor semen instan abad ke-8 |
| 09 | **Citra (Gambar)** | Refleksi Danau Terbalik | 2 | Perahu tanpa bayangan & pohon asimetris |
| 10 | **Dokumen (Teks)** | Fotosintesis Tanaman | 1 | Tanaman menghasilkan gas elpiji LPG |
| **Total** | **10 Kasus** | - | **13 Target** | **8 Titik Citra + 5 Kalimat Teks** |

---

## 2. Formula Kalkulasi Akurasi (Skala 60% – 100%)

Sistem menggunakan **Rasio Presisi Nyata** yang diskalakan dengan batas nilai minimum (*floor*) **60%**, sehingga pemain yang sering melakukan kesalahan klik (*miss-click*) tetap memperoleh apresiasi penyelesaian kasus minimal 60%.

### **Rumus Matematis:**

$$\text{Presisi} = \frac{T}{T + M}$$

$$\text{Akurasi (\%)} = \max\left(60,\, \min\left(100,\, \operatorname{round}\left(60 + 40 \times \text{Presisi}\right)\right)\right)$$

**Variabel:**
* $T$ = Total target valid yang harus dipecahkan ($T = 13$)
* $M$ = Total kesalahan klik / meleset yang dilakukan pengguna ($M \ge 0$)

---

## 3. Tabel Simulasi Skor Berdasarkan Jumlah Meleset

| Total Meleset ($M$) | Perhitungan Formula | Skor Akurasi | Kategori Pangkat |
|:---:|:---|:---:|---|
| **0** *(Nir-kesalahan)* | $60 + 40 \times (13 / 13) = 60 + 40.00$ | **100%** | 👑 Mata Dewa (Detektif Legendaris) |
| **1** | $60 + 40 \times (13 / 14) = 60 + 37.14$ | **97%** | 🔍 Detektif Halusinasi Senior |
| **2** | $60 + 40 \times (13 / 15) = 60 + 34.67$ | **95%** | 🔍 Detektif Halusinasi Senior |
| **3** | $60 + 40 \times (13 / 16) = 60 + 32.50$ | **93%** | 🔍 Detektif Halusinasi Senior |
| **4** | $60 + 40 \times (13 / 17) = 60 + 30.59$ | **91%** | 🔍 Detektif Halusinasi Senior |
| **5** | $60 + 40 \times (13 / 18) = 60 + 28.89$ | **89%** | 🕵️ Penyelidik Siber Madya |
| **7** | $60 + 40 \times (13 / 20) = 60 + 26.00$ | **86%** | 🕵️ Penyelidik Siber Madya |
| **10** | $60 + 40 \times (13 / 23) = 60 + 22.61$ | **83%** | 🕵️ Penyelidik Siber Madya |
| **12** | $60 + 40 \times (13 / 25) = 60 + 20.80$ | **81%** | 🕵️ Penyelidik Siber Madya |
| **15** | $60 + 40 \times (13 / 28) = 60 + 18.57$ | **79%** | 📋 Penyelidik Siber Magang |
| **20** | $60 + 40 \times (13 / 33) = 60 + 15.76$ | **76%** | 📋 Penyelidik Siber Magang |
| **25** | $60 + 40 \times (13 / 38) = 60 + 13.68$ | **74%** | 📋 Penyelidik Siber Magang |
| **30** | $60 + 40 \times (13 / 43) = 60 + 12.09$ | **72%** | 📋 Penyelidik Siber Magang |
| **40** | $60 + 40 \times (13 / 53) = 60 + 9.81$ | **70%** | 📋 Penyelidik Siber Magang |
| **> 50** *(Spam klik)* | $60 + 40 \times (13 / (13 + M)) \to 60$ | **60%** *(Floor)* | 🌫️ Piksel Kabur (Detektif Amatir) |

---

## 4. Matriks Pangkat Detektif

| Rentang Akurasi | Pangkat | Deskripsi Evaluasi |
|:---:|---|---|
| **100%** | 👑 **Mata Dewa (Detektif Legendaris)** | Sempurna! Anda berhasil mengungkap semua anomali citra dan teks dengan presisi 100% tanpa satu pun salah klik. |
| **90% – 99%** | 🔍 **Detektif Halusinasi Senior** | Sangat tajam! Anda sanggup membedakan rekayasa KA dengan akurasi tinggi dan minim kesalahan. |
| **80% – 89%** | 🕵️ **Penyelidik Siber Madya** | Cukup jeli! Anda mampu memecahkan kasus meski sempat terkecoh beberapa kali oleh detail palsu. |
| **70% – 79%** | 📋 **Penyelidik Siber Magang** | Kejelian Anda cukup baik, namun masih sering terkecoh oleh detail kecil rekayasa KA dan butuh banyak percobaan. |
| **60% – 69%** | 🌫️ **Piksel Kabur (Detektif Amatir)** | Anda masih perlu melatih kejelian mata dan lebih kritis dalam mengamati detail citra dan teks digital sebelum memutuskan. |

---

## 5. Implementasi Kode Sumber (TypeScript)

```typescript
// Perhitungan akurasi di ResultPage.tsx
const totalTargets = levels.reduce((acc, lvl) => {
  if (lvl.type === 'image') {
    return acc + (lvl.hotspots ? lvl.hotspots.length : (lvl.hotspot ? 1 : 1));
  }
  return acc + 1;
}, 0); // 13 Target

const misses = Math.max(0, totalMisses || 0);
const precision = totalTargets / (totalTargets + misses);
const accuracy = misses === 0 ? 100 : Math.min(100, Math.max(60, Math.round(60 + 40 * precision)));
const rank = getRank(accuracy);
```
