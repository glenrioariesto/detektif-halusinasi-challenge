# Detektif Halusinasi Citra KA: Temukan Anomali Rekayasa (Gambar)

**Detektif Halusinasi Citra KA** adalah game investigasi interaktif yang menguji ketelitian visual dan kemampuan berpikir kritis (literasi informasi) pemain terhadap konten gambar buatan Kecerdasan Artifisial (KA / AI). Pemain ditantang untuk mencari kecacatan fisik gambar AI langsung pada gambar (seperti jari tangan ganda, bayangan tidak sinkron, atau distorsi geometri optik).

## 🚀 Fitur Permainan

1. **Investigasi Citra Gambar (Spot the Anomaly):**
   * Pemain ditantang untuk mencari kecacatan fisik gambar AI menggunakan kaca pembesar interaktif berkekuatan 2.5x.
   * Pemain harus mengklik langsung titik koordinat anomali di dalam gambar.
   * Clicks yang berhasil (Hit) memicu scanner crosshair berwarna hijau yang memancarkan pendaran pulsa.
   * Clicks yang salah (Miss) memicu riak radar merah serta getaran target yang menandakan peringatan salah arah penyelidikan.

2. **Indeks Akurasi & Pangkat:**
   * Di akhir investigasi, pemain dievaluasi berdasarkan skor keberhasilan menyelesaikan 5 tingkatan investigasi gambar.
   * Pemain dianugerahi pangkat kredibilitas (mulai dari *Piksel Kabur* hingga *Mata Dewa (Detektif Legendaris)*).

## 🛠️ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS v4
- **Ikon**: Lucide React
- **Audio**: Web Audio API Synthesizer (Tanpa file eksternal)

## 📁 Struktur Direktori Proyek

```text
detektif-halusinasi-challenge/
├── assets/
│   └── logo-pusbuk.webp         # Logo Pusat Perbukuan Kemendikbudristek
├── src/
│   ├── components/
│   │   ├── InteractiveImage.tsx # Kanvas pencarian anomali gambar dengan lensa zoom
│   │   └── PortraitWarning.tsx  # Peringatan kunci orientasi lanskap mobile
│   ├── data/
│   │   └── questions.ts         # Data 5 tingkatan investigasi gambar
│   ├── hooks/
│   │   └── useGameState.ts      # Logika state game (skor, klik koordinat)
│   ├── pages/
│   │   ├── splash/
│   │   │   └── SplashPage.tsx   # Halaman muka dossier misi penyelidikan
│   │   ├── arena/
│   │   │   └── ArenaPage.tsx    # Arena pengerjaan kasus (citra gambar)
│   │   └── result/
│   │       └── ResultPage.tsx   # Laporan evaluasi hasil dan rekapitulasi temuan
│   ├── utils/
│   │   └── audio.ts             # Efek suara retro digital internal
│   ├── App.tsx                  # Switcher perutean halaman
│   ├── index.css                # Desain visual neon dark cyberpunk
│   ├── main.tsx                 # Mounting React root
│   └── types.ts                 # Definisi tipe data TypeScript
├── index.html                   # HTML Entry Point
├── package.json                 # Pengaturan script & dependensi
├── tsconfig.json                # Konfigurasi TypeScript
├── vite.config.ts               # Konfigurasi bundler Vite
└── README.md                    # Dokumentasi panduan proyek
```

## ⚙️ Cara Menjalankan Project

### Prerequisites
Pastikan **Node.js** terinstal di perangkat Anda.

### 1. Masuk ke Direktori Project
```bash
cd detektif-halusinasi-challenge
```

### 2. Instal Dependensi
```bash
npm install
```

### 3. Jalankan Server Dev Lokal
```bash
npm run dev
```
Setelah dijalankan, buka alamat server yang tertera di terminal (biasanya `http://localhost:3000`) pada browser pilihan Anda.

### 4. Build untuk Produksi
```bash
npm run build
```
Aset terkompilasi yang dioptimasi akan tersimpan di dalam folder `dist/`.
