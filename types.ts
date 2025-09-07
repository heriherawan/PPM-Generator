
export interface PpmFormData {
  sekolah: string;
  namaGuru: string;
  mataPelajaran: string;
  kelasSemester: string;
  alokasiWaktu: string;
  initialContext: string;
  dpl: string[];
}

export interface RubrikIndikator {
  indikator: string;
  baruMemulai: string;
  berkembang: string;
  cakap: string;
  mahir: string;
}

export interface PpmResultData {
  identifikasi: {
    pesertaDidik: string;
    materiPelajaran: string;
    dimensiProfilLulusan: string[];
  };
  desainPembelajaran: {
    capaianPembelajaran: string;
    lintasDisiplinIlmu: string;
    tujuanPembelajaran: string;
    topikPembelajaran: string;
    praktikPedagogis: string;
    kemitraanPembelajaran: string;
    lingkunganPembelajaran: string;
    pemanfaatanDigital: string;
  };
  pengalamanBelajar: {
    awal: string;
    inti: {
      memahami: string[];
      mengaplikasi: string[];
      merefleksi: string[];
    };
    penutup: string;
  };
  asesmen: {
    awal: string;
    proses: string;
    akhir: string;
    metode: string;
  };
  rubrikPenilaian: {
    tujuanPembelajaran: string;
    indikator: RubrikIndikator[];
  };
}
