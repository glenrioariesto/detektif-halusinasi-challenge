/**
 * Detektif Halusinasi Challenge - Kunci Jawaban Lengkap (Level 1 - 10)
 * Menemukan Anomali Gambar & Halusinasi Teks / Fakta Buatan AI
 * 
 * 🌐 Live URL Demo: https://glenrioariesto.github.io/detektif-halusinasi-challenge/
 * 📂 Repository: https://github.com/glenrioariesto/detektif-halusinasi-challenge
 */

export interface ImageAnomalyAnswer {
  type: 'image';
  levelId: number;
  title: string;
  category: string;
  liveUrl: string;
  anomalyName: string;
  hotspotCoordinates: { x: number; y: number; radius?: number };
  explanation: string;
}

export interface TextHallucinationAnswer {
  type: 'text';
  levelId: number;
  title: string;
  category: string;
  liveUrl: string;
  correctSegmentIndex: number;
  errorSentence: string;
  hallucinationReason: string;
  explanation: string;
}

export type HalusinasiAnswer = ImageAnomalyAnswer | TextHallucinationAnswer;

export const detektifHalusinasiAnswers: HalusinasiAnswer[] = [
  {
    type: 'image',
    levelId: 1,
    title: 'Anomali Jari Roti',
    category: 'Anatomi Tubuh',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    anomalyName: 'Jari Keenam Melayang',
    hotspotCoordinates: { x: 55, y: 28, radius: 12 },
    explanation: 'Generator AI gagal memetakan jumlah jari manusia. Di sela jari tangan kanan yang mencengkeram roti, terdapat jari kelingking ganda atau jari keenam yang tumbuh melayang tidak wajar.'
  },
  {
    type: 'text',
    levelId: 2,
    title: 'Kurir Waterloo',
    category: 'Sejarah Dunia',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    correctSegmentIndex: 3,
    errorSentence: 'Guna mempercepat pengiriman komando tempur ke lini belakang jenderalnya, Napoleon menggunakan aplikasi WhatsApp di smartphone miliknya.',
    hallucinationReason: 'Anakronisme Sejarah & Teknologi Modern',
    explanation: 'Perang Waterloo terjadi pada tahun 1815, sedangkan telepon baru dipatenkan 1876 dan WhatsApp baru diluncurkan 2009. Pada era Napoleon, komunikasi perang menggunakan kurir berkuda pembawa surat fisik.'
  },
  {
    type: 'image',
    levelId: 3,
    title: 'Reklame Distorsi Kota',
    category: 'Tulisan & Huruf',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    anomalyName: 'Neon Huruf Acak (Gibberish)',
    hotspotCoordinates: { x: 62, y: 33, radius: 12 },
    explanation: 'Generator AI kesulitan menggambar karakter teks huruf Latin secara presisi. Neon di bagian tengah-atas berisi simbol-simbol aneh mirip huruf yang meleleh dan tidak dapat dieja.'
  },
  {
    type: 'text',
    levelId: 4,
    title: 'Radiasi Freezer',
    category: 'Sains & Fisika',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    correctSegmentIndex: 1,
    errorSentence: 'Namun, menaruh buah pisang segar di dalam kompartemen pembeku justru memicu reaksi berantai fusi nuklir plutonium yang sangat berbahaya.',
    hallucinationReason: 'Hoaks Reaksi Fusi Nuklir & Zat Kimia',
    explanation: 'Pisang tidak mengandung plutonium dan kulkas pembeku tidak bisa memicu fusi nuklir! Pisang hanya memiliki isotop alami Kalium-40 berkadar radiasi sangat rendah yang aman dikonsumsi manusia.'
  },
  {
    type: 'image',
    levelId: 5,
    title: 'Kacamata Refleksi Ganda',
    category: 'Fisika & Optik',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    anomalyName: 'Pantulan Lensa Tidak Sinkron',
    hotspotCoordinates: { x: 44, y: 43, radius: 12 },
    explanation: 'Menurut hukum optik cermin, kedua lensa kacamata hitam yang sejajar harus memantulkan pemandangan depan yang sama. Di sini, lensa kiri memantulkan siluet gedung kota, sedangkan lensa kanan memantulkan awan cerah.'
  },
  {
    type: 'text',
    levelId: 6,
    title: 'Serangga Konstruksi',
    category: 'Zoologi & Biologi',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    correctSegmentIndex: 4,
    errorSentence: 'Menariknya, spesies ini juga gemar mengunyah lapisan baja rel kereta api trans-Amazon untuk memperkuat cangkang luar mereka.',
    hallucinationReason: 'Kesalahan Biologi & Makanan Makhluk Hidup',
    explanation: 'Makhluk hidup organik tidak memakan besi baja! Serangga hanya mengonsumsi serat selulosa atau mineral tanah terlarut. Baja rel kereta api tidak bisa dicerna atau dikunyah oleh rahang serangga manapun.'
  },
  {
    type: 'image',
    levelId: 7,
    title: 'Moncong Kucing Aneh',
    category: 'Anatomi Hewan',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    anomalyName: 'Kumis Melayang Pipi Atas',
    hotspotCoordinates: { x: 34, y: 13, radius: 10 },
    explanation: 'Kumis kucing (vibrissae) secara alami hanya tumbuh dari bantalan bibir atas di samping hidung dan di atas alis mata. AI menggambar sekelompok kumis melayang yang keluar acak dari pipi bagian atas.'
  },
  {
    type: 'text',
    levelId: 8,
    title: 'Aritmatika Sesat',
    category: 'Matematika & Logika',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    correctSegmentIndex: 2,
    errorSentence: 'Oleh karena itu, penyelesaian logis yang tepat dari persamaan aritmatika `3 + 3 x 3` adalah menghasilkan nilai 18.',
    hallucinationReason: 'Kesalahan Urutan Operasi (Kabataku / PEMDAS)',
    explanation: 'Operasi perkalian wajib didahulukan: 3 + (3 x 3) = 3 + 9 = 12, bukan 18! AI mengalami halusinasi logika karena menghitung pertambahan terlebih dahulu (3 + 3) x 3 = 18.'
  },
  {
    type: 'image',
    levelId: 9,
    title: 'Danau Cermin Awan',
    category: 'Geometri Alam',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    anomalyName: 'Puncak Gunung Refleksi Berbeda',
    hotspotCoordinates: { x: 51, y: 75, radius: 15 },
    explanation: 'Air danau yang tenang bertindak sebagai cermin datar yang harus memantulkan bentuk gunung secara simetris. Pada gambar, puncak gunung di bayangan air berbentuk terbelah dua yang tidak cocok dengan gunung aslinya di daratan.'
  },
  {
    type: 'text',
    levelId: 10,
    title: 'Siaran Gajah Mada',
    category: 'Budaya & Kebudayaan',
    liveUrl: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
    correctSegmentIndex: 3,
    errorSentence: 'Agar janji suci ini didengar seluruh rakyat, Patih Gajah Mada menyiarkannya secara langsung lewat fitur streaming YouTube Live.',
    hallucinationReason: 'Anakronisme Sejarah Kerajaan Nusantara',
    explanation: 'Kerajaan Majapahit berdiri pada abad ke-14 (1293–1527 M), sedangkan YouTube Live baru ada tahun 2011! Deklarasi Sumpah Palapa diumumkan secara lisan dan disebarkan lewat prasasti tembaga, kurir berkuda, atau armada laut.'
  }
];

export const projectMeta = {
  title: 'Detektif Halusinasi Challenge',
  url: 'https://glenrioariesto.github.io/detektif-halusinasi-challenge/',
  github: 'https://github.com/glenrioariesto/detektif-halusinasi-challenge'
};
