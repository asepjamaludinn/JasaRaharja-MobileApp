export interface EducationMaterial {
  id: number;
  title: string;
  description: string;
  videoId: string;
  thumbnailSrc: string;
  points: number;
}

export const educationMaterials: EducationMaterial[] = [
  {
    id: 1,
    title: "Pentingnya Keselamatan Berkendara",
    description:
      "Saat berkendara, penting sekali untuk mengutamakan keselamatan diri sendiri dan penumpang. Pengemudi harus selalu fokus dan konsentrasi, karena jika tidak, kendaraan akan sulit dikendalikan dan berpotensi menyebabkan kecelakaan. Selain itu, patuhi rambu lalu lintas dan batas kecepatan yang berlaku. Jangan pernah mengemudi dalam pengaruh alkohol atau obat-obatan, karena ini sangat berbahaya. Pastikan kendaraan dalam kondisi baik dengan melakukan pemeriksaan rutin pada rem, ban, lampu, dan klakson. Gunakan sabuk pengaman atau helm dengan benar, karena ini adalah perlindungan utama saat terjadi benturan. Terakhir, selalu jaga jarak aman dengan kendaraan lain dan hindari penggunaan ponsel saat mengemudi. Dengan mempraktikkan kebiasaan berkendara yang aman, kita dapat mengurangi risiko kecelakaan dan melindungi diri serta orang lain di jalan.",
    videoId: "I4DwaaYx9X4",
    thumbnailSrc: "https://img.youtube.com/vi/I4DwaaYx9X4/hqdefault.jpg",
    points: 25,
  },
  {
    id: 2,
    title: "TETAP TAAT! Karena Jalan Dekat, Belum Tentu Selamat",
    description:
      "Video ini menekankan pentingnya kepatuhan terhadap aturan lalu lintas dan keselamatan berkendara, bahkan untuk perjalanan jarak dekat. Seringkali, kecelakaan terjadi karena kelalaian atau anggapan bahwa jarak yang pendek tidak memerlukan kewaspadaan ekstra. Pesan utama adalah untuk selalu waspada, mematuhi rambu, dan menggunakan perlengkapan keselamatan, tidak peduli seberapa dekat tujuan Anda. Keselamatan adalah prioritas utama di setiap perjalanan.",
    videoId: "ot1QsUYtapo",
    thumbnailSrc: "https://img.youtube.com/vi/ot1QsUYtapo/hqdefault.jpg",
    points: 25,
  },
];
