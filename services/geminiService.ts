
import { GoogleGenAI, Type } from "@google/genai";
import type { PpmFormData, PpmResultData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    identifikasi: {
      type: Type.OBJECT,
      properties: {
        pesertaDidik: { type: Type.STRING, description: "Deskripsi kesiapan peserta didik, minat, latar belakang, dan kebutuhan belajar mereka." },
        materiPelajaran: { type: Type.STRING, description: "Analisis materi pelajaran, relevansinya, tingkat kesulitan, dan integrasi nilai/karakter." },
        dimensiProfilLulusan: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
    },
    desainPembelajaran: {
      type: Type.OBJECT,
      properties: {
        capaianPembelajaran: { type: Type.STRING, description: "Capaian pembelajaran yang relevan sesuai fase (misal Fase D untuk SMP)." },
        lintasDisiplinIlmu: { type: Type.STRING, description: "Disiplin ilmu atau mata pelajaran lain yang relevan dan terintegrasi." },
        tujuanPembelajaran: { type: Type.STRING, description: "Tujuan pembelajaran yang spesifik, terukur, dan jelas." },
        topikPembelajaran: { type: Type.STRING, description: "Topik utama pembelajaran yang dibahas." },
        praktikPedagogis: { type: Type.STRING, description: "Model, strategi, atau metode pembelajaran yang digunakan (e.g., Project-Based Learning, Inquiry-Based Learning)." },
        kemitraanPembelajaran: { type: Type.STRING, description: "Pihak yang diajak berkolaborasi (guru lain, orang tua, komunitas, profesional)." },
        lingkunganPembelajaran: { type: Type.STRING, description: "Deskripsi lingkungan belajar fisik, virtual, dan budaya yang mendukung." },
        pemanfaatanDigital: { type: Type.STRING, description: "Cara pemanfaatan teknologi digital (LMS, forum online, sumber digital)." },
      },
    },
    pengalamanBelajar: {
      type: Type.OBJECT,
      properties: {
        awal: { type: Type.STRING, description: "Kegiatan pembuka: orientasi, apersepsi, dan motivasi." },
        inti: {
          type: Type.OBJECT,
          properties: {
            memahami: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Langkah-langkah konkret agar siswa memahami materi." },
            mengaplikasi: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Aktivitas di mana siswa mengaplikasikan pengetahuan." },
            merefleksi: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Kegiatan untuk merefleksikan proses dan hasil belajar." },
          },
        },
        penutup: { type: Type.STRING, description: "Kegiatan penutup: umpan balik, kesimpulan, dan rencana tindak lanjut." },
      },
    },
    asesmen: {
      type: Type.OBJECT,
      properties: {
        awal: { type: Type.STRING, description: "Asesmen diagnostik di awal pembelajaran." },
        proses: { type: Type.STRING, description: "Asesmen formatif selama proses pembelajaran." },
        akhir: { type: Type.STRING, description: "Asesmen sumatif di akhir pembelajaran." },
        metode: { type: Type.STRING, description: "Penjelasan metode asesmen yang digunakan (assessment as, for, and of learning)." },
      },
    },
     rubrikPenilaian: {
      type: Type.OBJECT,
      properties: {
        tujuanPembelajaran: { type: Type.STRING, description: "Tujuan pembelajaran spesifik yang dinilai oleh rubrik ini." },
        indikator: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              indikator: { type: Type.STRING },
              baruMemulai: { type: Type.STRING },
              berkembang: { type: Type.STRING },
              cakap: { type: Type.STRING },
              mahir: { type: Type.STRING },
            }
          }
        }
      }
    }
  },
};

export const generatePpm = async (formData: PpmFormData): Promise<PpmResultData> => {
  const prompt = `
Anda adalah seorang ahli perancang kurikulum dan pedagogi untuk sekolah menengah di Indonesia, yang secara spesifik membantu guru di SMP Islamic Centre Muhammadiyah Cipanas. Tugas Anda adalah membuat "Perencanaan Pembelajaran Mendalam" (PPM) yang lengkap, detail, dan berkualitas tinggi berdasarkan informasi yang diberikan oleh guru. Pastikan semua bagian terisi secara logis, kontekstual, dan sesuai dengan prinsip-prinsip Kurikulum Merdeka.

**Informasi dari Guru:**
- Sekolah: ${formData.sekolah}
- Nama Guru: ${formData.namaGuru}
- Mata Pelajaran: ${formData.mataPelajaran}
- Kelas/Semester: ${formData.kelasSemester}
- Alokasi Waktu: ${formData.alokasiWaktu}
- Dimensi Profil Lulusan (DPL) yang Dipilih: ${formData.dpl.join(', ')}
- Konteks/Topik/Keterampilan Awal: ${formData.initialContext}

**Tugas Anda:**
Berdasarkan informasi di atas, hasilkan konten untuk setiap bagian dari PPM. Buatlah konten yang kaya, mendalam, dan praktis untuk diimplementasikan di kelas. Fokus pada pembelajaran yang berpusat pada siswa, bermakna, dan mengintegrasikan nilai-nilai Islam dan Kemuhammadiyahan secara implisit.

Hasilkan output dalam format JSON yang valid sesuai dengan skema yang telah ditentukan.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as PpmResultData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate PPM from AI. The model may have returned an invalid format.");
  }
};
