import { Level } from '../types';

export const CAMPAIGN_LEVELS: Level[] = [
  {
    id: 1,
    title: "Anomali Jari Roti",
    category: "Anatomi Tubuh",
    type: "image",
    description: "Periksa foto tangan yang memegang roti hangat ini. Sesuatu yang ganjil terdeteksi pada hitungan jari tangan subjek. Arahkan kaca pembesar Anda dan klik langsung pada anomali tersebut!",
    clue: "Perhatikan saksama sela-sela jari tangan kanan yang mencengkeram roti. Berapa jumlah jarinya?",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80",
    hotspot: {
      x: 55,
      y: 65,
      radius: 12,
      label: "Jari Keenam Melayang"
    },
    explanation: "Anda menemukan anomali! Generator gambar Kecerdasan Artifisial (KA) sering kali gagal memetakan jumlah jari manusia. Di area yang Anda klik, terlihat jelas adanya jari kelingking ganda atau jari keenam yang tumbuh tidak wajar di sela-sela lipatan kulit, pertanda kuat bahwa gambar ini buatan KA."
  },
  {
    id: 2,
    title: "Reklame Distorsi Kota",
    category: "Tulisan & Huruf",
    type: "image",
    description: "Di bawah ini adalah foto jalanan kota metropolitan dengan pendaran lampu neon. Di antara sekian banyak neon, terdapat satu papan nama buatan AI yang menampilkan tulisan distorsi/tanpa arti (gibberish). Cari dan klik papan nama tersebut!",
    clue: "Cari papan reklame di bagian tengah-atas yang huruf-hurufnya tidak membentuk kata nyata dan terlihat meleleh.",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    hotspot: {
      x: 65,
      y: 35,
      radius: 10,
      label: "Neon Huruf Acak (Gibberish)"
    },
    explanation: "Tepat sekali! Generator KA kesulitan menggambar karakter teks huruf Latin secara presisi. Jika Anda perhatikan di area yang di-klik, neon tersebut berisi simbol-simbol aneh mirip huruf yang meleleh dan tidak dapat dieja menjadi kata bermakna apa pun."
  },
  {
    id: 3,
    title: "Kacamata Refleksi Ganda",
    category: "Fisika & Optik",
    type: "image",
    description: "Foto portrait ini menunjukkan seseorang yang berpose menggunakan kacamata hitam reflektif. AI menghasilkan kacamata yang memantulkan dua gambar lingkungan yang bertolak belakang secara fisik. Klik pada area kacamata tersebut!",
    clue: "Perhatikan baik-baik pemandangan yang dipantulkan di lensa kacamata sebelah kiri dibanding sebelah kanan.",
    imageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d?w=800&auto=format&fit=crop&q=80",
    hotspot: {
      x: 50,
      y: 48,
      radius: 10,
      label: "Pantulan Lensa Tidak Sinkron"
    },
    explanation: "Luar biasa, Anda jeli! Menurut hukum optik cermin, kedua lensa kacamata hitam yang sejajar harus memantulkan lingkungan depan yang relatif sama. Di gambar ini, lensa kanan memantulkan gumpalan awan cerah, sedangkan lensa kiri memantulkan garis-garis siluet gedung tinggi perkotaan."
  },
  {
    id: 4,
    title: "Moncong Kucing Aneh",
    category: "Anatomi Hewan",
    type: "image",
    description: "Kucing ini tampak sangat menggemaskan, tetapi generator gambar AI melakukan kesalahan penempatan anatomi rambut sensitif (kumis). Cari anomali kumisnya dan klik titik anomali tersebut!",
    clue: "Periksa saksama bagian samping moncong dekat hidung kucing sebelah kanan. Dari mana kumisnya tumbuh?",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&auto=format&fit=crop&q=80",
    hotspot: {
      x: 35,
      y: 55,
      radius: 12,
      label: "Kumis Tumbuh di Pipi Atas"
    },
    explanation: "Analisis tepat! Kumis kucing (vibrissae) secara alami tumbuh eksklusif dari bantalan bibir atas di samping hidung dan di atas alis mata. Di sini, AI menggambar sekelompok kumis melayang yang tumbuh keluar secara acak dari pipi bagian atas kucing."
  },
  {
    id: 5,
    title: "Danau Cermin Awan",
    category: "Geometri Alam",
    type: "image",
    description: "Lanskap gunung bersalju yang indah ini memantulkan bayangannya di permukaan air danau yang jernih. Namun, bayangan refleksi puncak gunung melanggar geometri optik alam. Klik pada area refleksi gunung di air tersebut!",
    clue: "Bandingkan bentuk puncak gunung yang ada di daratan atas dengan puncak gunung yang terbentuk di refleksi air bawah.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    hotspot: {
      x: 50,
      y: 75,
      radius: 15,
      label: "Puncak Gunung Refleksi Berbeda"
    },
    explanation: "Hebat, penyelidikan Anda berhasil! Air danau yang tenang bertindak sebagai cermin datar di mana pantulan objek harus simetris sempurna. Pada gambar ini, puncak gunung di bayangan air memiliki bentuk terbelah ganda yang berbeda drastis dengan bentuk puncak gunung nyata di atasnya."
  }
];
