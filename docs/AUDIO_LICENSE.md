# Lisensi & Atribusi Aset Audio (Audio License & Attribution)

Dokumen ini mencatat lisensi, atribusi, dan asal-usul (*provenance*) aset audio musik latar (*backsound*) yang digunakan di dalam aplikasi **Detektif Halusinasi KA**.

---

## 1. Informasi Musik Latar (Background Music)

* **Judul Lagu**: *Placid Ambient*
* **Komposer / Pembuat**: MusicLFiles (Mauro Colangelo)
* **File Lokal**: `src/assets/backsound.mp3`
* **Format Asli**: Ogg Vorbis / MP3 Transcode (2 menit 21 detik)
* **Sumber Repositori**: [Wikimedia Commons - File:Placid Ambient by MusicLFiles.ogg](https://commons.wikimedia.org/wiki/File:Placid_Ambient_by_MusicLFiles.ogg)
* **Sumber Asli**: [Filmmusic.io](https://filmmusic.io/)

---

## 2. Ketentuan Lisensi (License Terms)

Aset audio ini dilisensikan di bawah:
### **Creative Commons Attribution 4.0 International (CC BY 4.0)**
Teks Lisensi Lengkap: [https://creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/)

### Hak Penggunaan:
* **Berbagi (Share)** — Menyalin dan menyebarluaskan materi dalam format atau media apa pun.
* **Mengadaptasi (Adapt)** — Menggubah, mengubah, dan membuat materi turunan untuk tujuan apa pun, termasuk tujuan komersial maupun non-komersial/edukasi.

### Kewajiban / Syarat:
* **Atribusi (Attribution)** — Memberikan penghargaan yang sesuai (*credit*), menyertakan tautan ke lisensi, dan mengindikasikan apakah ada perubahan yang dibuat.

---

## 3. Format Teks Atribusi Resmi

```text
"Placid Ambient" by MusicLFiles (https://commons.wikimedia.org/wiki/File:Placid_Ambient_by_MusicLFiles.ogg)
Licensed under Creative Commons: By Attribution 4.0 International
https://creativecommons.org/licenses/by/4.0/
```

---

## 4. Efek Suara (Sound Effects Synthesizer)

* **Deskripsi**: Efek suara interaksi (klik tombol, keberhasilan membuka anomali, peringatan salah klik, dan kenaikan level).
* **Teknologi**: Dihasilkan secara langsung (*procedural synthesis*) menggunakan browser **Web Audio API** (`OscillatorNode` & `GainNode`) pada [`src/utils/audio.ts`](../src/utils/audio.ts).
* **Lisensi**: Bebas Royalti / Public Domain (Dibuat secara internal).
