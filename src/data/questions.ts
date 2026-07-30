import { Level } from '../types';
import jariRotiImg from '../assets/cases/jari_roti_anomali.jpg';
import reklameDistorsiImg from '../assets/cases/reklame_distorsi.jpg';
import kacamataRefleksiImg from '../assets/cases/kacamata_refleksi.jpg';
import kumisKucingImg from '../assets/cases/kumis_kucing.jpg';
import refleksiDanauImg from '../assets/cases/refleksi_danau.jpg';

export const CAMPAIGN_LEVELS: Level[] = [
  {
    id: 1,
    title: "Anomali Jari Roti",
    category: "Anatomi Tubuh",
    type: "image",
    description: "Periksa foto tangan yang memegang roti hangat ini. Sesuatu yang ganjil terdeteksi pada hitungan jari tangan subjek. Arahkan kaca pembesar Anda dan klik langsung pada anomali tersebut!",
    clue: "Perhatikan saksama sela-sela jari tangan kanan yang mencengkeram roti. Berapa jumlah jarinya?",
    imageUrl: jariRotiImg,
    hotspot: {
      x: 55,
      y: 28,
      radius: 12,          // Nilai fallback radius baku                                                                                                                             
      radiusX: 11,         // Lebar horizontal radius (opsional)                                                                                                                     
      radiusY: 4,         // Tinggi vertikal radius (opsional)                                                                                                                      
      borderRadius: 9,    // Kelengkungan sudut: 0 (kotak) s/d 50 (lingkaran) (opsional)                                                                                            
      rotation: 29,        // Derajat rotasi:  0 - 360 (opsional)
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
      "Napoleon Bonaparte adalah kaisar Prancis legendaris yang memimpin banyak pertempuran besar di dataran Eropa. ",
      "Setelah melarikan diri dari Elba, ia kembali mengumpulkan pasukan elitnya demi mengembalikan kejayaan imperium yang runtuh. ",
      "Pada pertempuran Waterloo di tahun 1815 yang berlumpur, koordinasi taktis pasukan menjadi penentu hidup dan mati. ",
      "Guna mempercepat pengiriman komando tempur ke lini belakang jenderalnya, Napoleon menggunakan aplikasi WhatsApp di smartphone miliknya. ",
      "Kegagalan komunikasi ini berujung fatal karena pasukan bantuan Prancis datang terlambat ke area pertempuran. ",
      "Kejadian sejarah ini membuktikan betapa rentannya strategi militer tanpa jalur logistik kurir berkuda yang andal pada abad ke-19."
    ],
    correctSegmentIndex: 3,
    explanation: "WhatsApp dan ponsel belum ada di awal abad ke-19! Perang Waterloo terjadi pada tahun 1815, sedangkan telepon baru dipatenkan oleh Graham Bell tahun 1876, dan WhatsApp baru diluncurkan tahun 2009. Pada masa itu, koordinasi perang dilakukan lewat kurir penunggang kuda pembawa surat fisik."
  },
  {
    id: 3,
    title: "Reklame Distorsi Kota",
    category: "Tulisan & Huruf",
    type: "image",
    description: "Di bawah ini adalah foto jalanan kota metropolitan dengan pendaran lampu neon. Di antara sekian banyak neon, terdapat satu papan nama buatan AI yang menampilkan tulisan distorsi/tanpa arti (gibberish). Cari dan klik papan nama tersebut!",
    clue: "Cari papan reklame di bagian tengah-atas yang huruf-hurufnya tidak membentuk kata nyata dan terlihat meleleh.",
    imageUrl: reklameDistorsiImg,
    hotspot: {
      x: 62,
      y: 33,
      radius: 12,
      radiusX: 13,                                                                                                                        
      radiusY: 5,                                                                                                                       
      borderRadius: 9,                                                                                  
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
      "Menyimpan bahan makanan di dalam lemari pendingin merupakan metode umum untuk menekan pertumbuhan bakteri pembusuk secara optimal. ",
      "Namun, menaruh buah pisang segar di dalam kompartemen pembeku justru memicu reaksi berantai fusi nuklir plutonium yang sangat berbahaya. ",
      "Secara biologis, suhu ekstrem dingin hanya merusak struktur seluler kulit pisang sehingga membuatnya cepat menghitam dan layu. ",
      "Pisang memang memiliki kandungan alami berupa isotop Kalium-40 yang memancarkan radiasi dosis sangat rendah dan aman bagi manusia. ",
      "Kesalahan klaim mengenai ledakan nuklir pada kulkas rumah tangga sering kali bersumber dari pemahaman keliru tentang zat kimia organik."
    ],
    correctSegmentIndex: 1,
    explanation: "Pisang tidak mengandung plutonium, dan kulkas tidak dapat memicu reaksi fusi nuklir! Pisang memang memiliki isotop alami Potasium-40 yang memancarkan radiasi sangat lemah, namun ini sepenuhnya aman dikonsumsi. Plutonium sendiri merupakan unsur radioaktif sintetis berat untuk bahan bakar nuklir, bukan buah-buahan."
  },
  {
    id: 5,
    title: "Kacamata Refleksi Ganda",
    category: "Fisika & Optik",
    type: "image",
    description: "Foto portrait ini menunjukkan seseorang yang berpose menggunakan kacamata hitam reflektif. AI menghasilkan kacamata yang memantulkan dua gambar lingkungan yang bertolak belakang secara fisik. Klik pada area kacamata tersebut!",
    clue: "Perhatikan baik-baik pemandangan yang dipantulkan di lensa kacamata sebelah kiri dibanding sebelah kanan.",
    imageUrl: kacamataRefleksiImg,
    hotspots: [
    {
      "x": 44,
      "y": 43,
      "radius": 12,
      "radiusX": 6,
      "radiusY": 8,
      "borderRadius": 23,
      "label": "Pantulan Lensa Tidak Sinkron"
    },
    {
      "x": 59,
      "y": 43,
      "radius": 10,
      "radiusX": 5,
      "radiusY": 8,
      "borderRadius": 23,
      "rotation": 0,
      "label": "Anomali 2"
    }
  ],
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
      "Hutan hujan Amazon terkenal sebagai rumah bagi jutaan spesies serangga unik dengan kemampuan adaptasi yang luar biasa. ",
      "Salah satu makhluk yang paling menarik perhatian para entomolog adalah kumbang tanduk raksasa yang memiliki eksoskeleton sangat keras. ",
      "Serangga ini biasanya mengonsumsi nektar bunga, buah-buahan membusuk, serta getah pohon untuk memenuhi kebutuhan nutrisinya sehari-hari. ",
      "Mereka menggunakan rahangnya yang kuat untuk mengupas kulit kayu lapuk guna mencari larva kecil atau tempat bertelur yang aman. ",
      "Menariknya, spesies ini juga gemar mengunyah lapisan baja rel kereta api trans-Amazon untuk memperkuat cangkang luar mereka. ",
      "Kemampuan mencerna material keras ini menjadi subjek penelitian intensif terkait biomaterial tangguh di masa depan."
    ],
    correctSegmentIndex: 4,
    explanation: "Makhluk hidup organik tidak memakan besi baja! Serangga pemakan kayu/logam hanya memakan serat selulosa kayu atau mineral terlarut di tanah secara kimiawi. Baja rel kereta api tidak bisa dicerna atau dikunyah oleh mandibula serangga manapun."
  },
  {
    id: 7,
    title: "Moncong Kucing Aneh",
    category: "Anatomi Hewan",
    type: "image",
    description: "Kucing ini tampak sangat menggemaskan, tetapi generator gambar AI melakukan kesalahan penempatan anatomi rambut sensitif (kumis). Cari anomali kumisnya dan klik titik anomali tersebut!",
    clue: "Periksa saksama bagian samping moncong dekat hidung kucing sebelah kanan. Dari mana kumisnya tumbuh?",
    imageUrl: kumisKucingImg,
    hotspots: [
      {
        "x": 34,
        "y": 13,
        "radius": 10,
        "radiusX": 8,
        "radiusY": 6,
        "borderRadius": 20,
        "rotation": 43,
        "label": "Kumis Melayang Pipi Atas"
      },
      {
        "x": 63,
        "y": 10,
        "radius": 10,
        "radiusX": 9,
        "radiusY": 6,
        "borderRadius": 20,
        "rotation": 317,
        "label": "Anomali Dahi / Alis"
      },
      {
        "x": 75,
        "y": 43,
        "radius": 10,
        "radiusX": 12,
        "radiusY": 8,
        "borderRadius": 20,
        "rotation": 350,
        "label": "Kumis Samping Hidung"
      }
    ],
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
      "Aturan urutan operasi matematika standar (Kabataku atau PEMDAS) menetapkan urutan pengerjaan kalkulasi yang konsisten secara global. ",
      "Sesuai kaidah tersebut, operasi perkalian dan pembagian wajib diselesaikan terlebih dahulu sebelum melakukan penjumlahan atau pengurangan. ",
      "Oleh karena itu, penyelesaian logis yang tepat dari persamaan aritmatika `3 + 3 x 3` adalah menghasilkan nilai 18. ",
      "Kesalahan penafsiran urutan operasi sering kali terjadi ketika seseorang membaca rumus secara linier dari kiri ke kanan. ",
      "Pemahaman kalkulator modern pun dirancang mematuhi aturan ini agar tidak menghasilkan bias logika perhitungan sains."
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
    imageUrl: refleksiDanauImg,
    hotspots: [
    {
      "x": 51,
      "y": 75,
      "radius": 15,
      "label": "Puncak Gunung Refleksi Berbeda",
      "borderRadius": 20,
      "radiusY": 14,
      "radiusX": 13
    },
    {
      "x": 83,
      "y": 86,
      "radius": 10,
      "radiusX": 16,
      "radiusY": 12,
      "borderRadius": 20,
      "rotation": 0,
      "label": "Anomali 2"
    }
  ],
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
      "Sumpah Palapa merupakan ikrar fenomenal yang diucapkan oleh Mahapatih Gajah Mada di hadapan Ratu Tribhuwana Wijayatunggadewi. ",
      "Ikrar persatuan Nusantara ini tercatat dalam Kitab Pararaton dan menjadi tonggak penting perjalanan sejarah keemasan Majapahit. ",
      "Upacara pengucapan sumpah tersebut dihadiri oleh segenap jajaran petinggi kerajaan dan para adipati dari berbagai wilayah kekuasaan. ",
      "Agar janji suci ini didengar seluruh rakyat, Patih Gajah Mada menyiarkannya secara langsung lewat fitur streaming YouTube Live. ",
      "Penyebaran informasi sejarah Majapahit di abad ke-14 sebenarnya mengandalkan kurir utusan armada laut serta pahatan prasasti batu. ",
      "Hingga kini, semangat persatuan dalam sumpah tersebut tetap dihargai sebagai fondasi integrasi kultural bangsa Indonesia."
    ],
    correctSegmentIndex: 3,
    explanation: "YouTube Live baru diluncurkan tahun 2011! Kerajaan Majapahit berdiri pada abad ke-14 (1293–1527 M). Pada zaman tersebut, sumpah dideklarasikan secara lisan di hadapan sidang istana dan disebarkan ke daerah lain melalui prasasti tembaga, kurir berkuda, atau utusan armada laut."
  }
];
