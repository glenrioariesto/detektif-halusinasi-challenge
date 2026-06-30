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
    title: "Kurir Waterloo",
    category: "Sejarah Dunia",
    type: "text",
    description: "AI membuat ringkasan pertempuran terkenal dalam sejarah Eropa di bawah ini. Namun, ada satu bagian kalimat yang mengalami halusinasi anakronisme fakta (ketidaksesuaian era teknologi). Klik kalimat/kata yang salah!",
    clue: "Baca bagian taktik koordinasi pasukan Napoleon Bonaparte. Adakah teknologi modern yang mustahil ada di tahun 1815?",
    textSegments: [
      "Napoleon Bonaparte adalah kaisar Prancis yang terkenal memimpin banyak pertempuran besar di Eropa. ",
      "Pada Perang Waterloo yang terjadi di tahun 1815, ia membagikan koordinat taktis tempur kepada jenderalnya menggunakan ",
      "pesan instan WhatsApp di handphone miliknya",
      " guna mengoordinasikan manuver pasukan berkuda secara cepat, yang sayangnya gagal akibat jaringan sinyal yang buruk di pedesaan Belgia."
    ],
    correctSegmentIndex: 2,
    explanation: "WhatsApp dan ponsel belum ada di awal abad ke-19! Perang Waterloo terjadi pada tahun 1815, sedangkan telepon baru dipatenkan oleh Graham Bell tahun 1876, dan WhatsApp baru diluncurkan tahun 2009. Pada masa itu, koordinasi perang dilakukan lewat kurir penunggang kuda pembawa surat fisik."
  },
  {
    id: 3,
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
    id: 4,
    title: "Radiasi Freezer",
    category: "Sains & Fisika",
    type: "text",
    description: "AI menjelaskan bahaya menyimpan buah tertentu di dalam lemari es secara ilmiah. Namun, penjelasan ini mengandung hoaks sains yang tidak berdasar. Klik kalimat/frasa yang memuat halusinasi ilmiah tersebut!",
    clue: "Periksa penjelasan mengenai senyawa kimia atau bahaya ekstrem yang dikaitkan dengan temperatur freezer.",
    textSegments: [
      "Pisang adalah buah organik yang kaya akan potasium dan vitamin penting bagi metabolisme tubuh. ",
      "Namun, paparan udara dingin kulkas dapat memicu ",
      "reaksi berantai nuklir plutonium",
      " di dalam daging pisang sehingga buah ini berisiko meledak secara spontan jika disimpan terlalu dekat dengan kompartemen freezer."
    ],
    correctSegmentIndex: 2,
    explanation: "Pisang tidak mengandung plutonium, dan kulkas tidak dapat memicu reaksi fusi nuklir! Pisang memang memiliki isotop alami Potasium-40 yang memancarkan radiasi sangat lemah, namun ini sepenuhnya aman dikonsumsi. Plutonium sendiri merupakan unsur radioaktif sintetis berat untuk bahan bakar nuklir, bukan buah-buahan."
  },
  {
    id: 5,
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
    id: 6,
    title: "Serangga Konstruksi",
    category: "Zoologi & Biologi",
    type: "text",
    description: "Sebuah ringkasan biologi mengenai serangga eksotis di bawah ini mengandung satu kesalahan deskripsi habitat/pola makan hewan yang mustahil. Cari dan klik bagian teks yang memuat kesalahan biologi tersebut!",
    clue: "Perhatikan makanan dari spesies kumbang hutan Amazon ini. Apakah logis bagi makhluk hidup organik?",
    textSegments: [
      "Kumbang tanduk dikenal sebagai salah satu serangga terkuat di dunia jika dibandingkan dengan rasio ukuran tubuhnya. ",
      "Spesies langka yang mendiami pedalaman hutan hujan Amazon ini terbiasa memakan ",
      "lapisan baja pada rel kereta api lokal",
      " guna menyerap zat besi padat untuk mengeraskan cangkang luar (eksoskeleton) mereka dari serangan predator."
    ],
    correctSegmentIndex: 2,
    explanation: "Makhluk hidup organik tidak memakan besi baja! Serangga pemakan kayu/logam hanya memakan serat selulosa kayu atau mineral terlarut di tanah secara kimiawi. Baja rel kereta api tidak bisa dicerna atau dikunyah oleh mandibula serangga manapun."
  },
  {
    id: 7,
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
    id: 8,
    title: "Aritmatika Sesat",
    category: "Matematika & Logika",
    type: "text",
    description: "AI mencoba memberikan solusi dari soal matematika sederhana menggunakan kaidah matematika. Namun, penyelesaian akhirnya salah total akibat halusinasi perhitungan logika. Klik bagian teks yang salah!",
    clue: "Hitung manual persamaan `3 + 3 x 3` dengan kaidah matematika yang benar (kalian didahulukan). Berapa hasilnya?",
    textSegments: [
      "Dalam urutan operasi matematika standar internasional (PEMDAS/Kabataku), perkalian harus didahulukan daripada penjumlahan. ",
      "Oleh karena itu, penyelesaian logis yang tepat dari persamaan aritmatika `3 + 3 x 3` adalah menghasilkan nilai ",
      "sama dengan 18",
      " sesuai dengan pembaruan aturan prioritas operasional komputer modern."
    ],
    correctSegmentIndex: 2,
    explanation: "Persamaan `3 + 3 x 3` menghasilkan 12, bukan 18! Berdasarkan prioritas operasi, Anda harus mengalikan terlebih dahulu: `3 x 3 = 9`, kemudian menambahkan: `3 + 9 = 12`. AI melakukan halusinasi logika karena menghitung pertambahan terlebih dahulu `(3 + 3) x 3 = 18`."
  },
  {
    id: 9,
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
  },
  {
    id: 10,
    title: "Siaran Gajah Mada",
    category: "Budaya & Kebudayaan",
    type: "text",
    description: "Ringkasan sejarah Nusantara di bawah ini memuat hoax teknologi anakronisme yang sangat mencolok pada era keemasan Majapahit. Klik pada kalimat yang memuat halusinasi sejarah tersebut!",
    clue: "Temukan teknologi penyiaran digital modern yang diklaim digunakan oleh Patih Gajah Mada pada abad ke-14.",
    textSegments: [
      "Kerajaan Majapahit berhasil menyatukan wilayah Nusantara di bawah kepemimpinan Raja Hayam Wuruk. ",
      "Mahapatih Gajah Mada mengikrarkan persatuan tersebut dalam Sumpah Palapa yang legendaris, yang disiarkannya secara langsung lewat ",
      "fitur streaming YouTube Live",
      " dari pendopo agung Trowulan agar dideklarasikan secara serentak ke seluruh adipati daerah taklukan."
    ],
    correctSegmentIndex: 2,
    explanation: "YouTube Live baru diluncurkan tahun 2011! Kerajaan Majapahit berdiri pada abad ke-14 (1293–1527 M). Pada zaman tersebut, sumpah dideklarasikan secara lisan di hadapan sidang istana dan disebarkan ke daerah lain melalui prasasti tembaga, kurir berkuda, atau utusan armada laut."
  }
];
