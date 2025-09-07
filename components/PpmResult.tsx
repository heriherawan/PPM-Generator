
import React from 'react';
import type { PpmFormData, PpmResultData } from '../types';
import Button from './Button';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { PrinterIcon } from './icons/PrinterIcon';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6 break-inside-avoid">
    <h3 className="text-lg font-bold text-teal-700 border-b-2 border-teal-200 pb-2 mb-3">{title}</h3>
    <div className="prose prose-sm max-w-none text-slate-700">{children}</div>
  </div>
);

const PpmResult: React.FC<{ data: PpmResultData; formData: PpmFormData; onBack: () => void; }> = ({ data, formData, onBack }) => {

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div>
       <style>
        {`
          @media print {
            body {
              background-color: white;
            }
            .no-print {
              display: none !important;
            }
            #printable-area {
              box-shadow: none;
              border: none;
              padding: 0;
            }
            h2, h3, h4 {
                color: black !important;
            }
          }
        `}
      </style>
      <div className="flex justify-between items-center mb-6 no-print">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Kembali ke Form
        </Button>
        <Button onClick={handlePrint} variant="primary">
          <PrinterIcon className="w-5 h-5 mr-2" />
          Cetak atau Simpan PDF
        </Button>
      </div>

      <div id="printable-area" className="bg-white p-8 md:p-12 rounded-lg shadow-lg border border-slate-200">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">PERENCANAAN PEMBELAJARAN MENDALAM</h1>
        </header>

        <table className="w-full text-left mb-8 border-collapse">
          <tbody>
            <tr className="border-b"><td className="font-semibold p-2 w-1/4">Sekolah</td><td className="p-2">: {formData.sekolah}</td></tr>
            <tr className="border-b"><td className="font-semibold p-2">Nama Guru</td><td className="p-2">: {formData.namaGuru}</td></tr>
            <tr className="border-b"><td className="font-semibold p-2">Mata Pelajaran</td><td className="p-2">: {formData.mataPelajaran}</td></tr>
            <tr className="border-b"><td className="font-semibold p-2">Kelas/Semester</td><td className="p-2">: {formData.kelasSemester}</td></tr>
            <tr><td className="font-semibold p-2">Alokasi Waktu</td><td className="p-2">: {formData.alokasiWaktu}</td></tr>
          </tbody>
        </table>

        <h2 className="text-xl font-bold text-teal-800 bg-teal-50 p-3 rounded-md mb-4 mt-8">IDENTIFIKASI</h2>
        <Section title="Peserta Didik"><p>{data.identifikasi.pesertaDidik}</p></Section>
        <Section title="Materi Pelajaran"><p>{data.identifikasi.materiPelajaran}</p></Section>
        <Section title="Dimensi Profil Lulusan (DPL)">
          <ul className="list-disc pl-5">
            {data.identifikasi.dimensiProfilLulusan.map((dpl, i) => <li key={i}>{dpl}</li>)}
          </ul>
        </Section>
        
        <h2 className="text-xl font-bold text-teal-800 bg-teal-50 p-3 rounded-md mb-4 mt-8">DESAIN PEMBELAJARAN</h2>
        <Section title="Capaian Pembelajaran"><p>{data.desainPembelajaran.capaianPembelajaran}</p></Section>
        <Section title="Lintas Disiplin Ilmu"><p>{data.desainPembelajaran.lintasDisiplinIlmu}</p></Section>
        <Section title="Tujuan Pembelajaran"><p>{data.desainPembelajaran.tujuanPembelajaran}</p></Section>
        <Section title="Topik Pembelajaran"><p>{data.desainPembelajaran.topikPembelajaran}</p></Section>
        <Section title="Praktik Pedagogis"><p>{data.desainPembelajaran.praktikPedagogis}</p></Section>
        <Section title="Kemitraan Pembelajaran"><p>{data.desainPembelajaran.kemitraanPembelajaran}</p></Section>
        <Section title="Lingkungan Pembelajaran"><p>{data.desainPembelajaran.lingkunganPembelajaran}</p></Section>
        <Section title="Pemanfaatan Digital"><p>{data.desainPembelajaran.pemanfaatanDigital}</p></Section>

        <h2 className="text-xl font-bold text-teal-800 bg-teal-50 p-3 rounded-md mb-4 mt-8">PENGALAMAN BELAJAR</h2>
        <Section title="Awal"><p>{data.pengalamanBelajar.awal}</p></Section>
        <Section title="Inti">
            <h4 className="font-semibold text-slate-800 mt-4 mb-2">Memahami</h4>
            <ol className="list-decimal pl-5 space-y-1">{data.pengalamanBelajar.inti.memahami.map((item, i) => <li key={`memahami-${i}`}>{item}</li>)}</ol>
            <h4 className="font-semibold text-slate-800 mt-4 mb-2">Mengaplikasi</h4>
            <ol className="list-decimal pl-5 space-y-1">{data.pengalamanBelajar.inti.mengaplikasi.map((item, i) => <li key={`mengaplikasi-${i}`}>{item}</li>)}</ol>
            <h4 className="font-semibold text-slate-800 mt-4 mb-2">Merefleksi</h4>
            <ol className="list-decimal pl-5 space-y-1">{data.pengalamanBelajar.inti.merefleksi.map((item, i) => <li key={`merefleksi-${i}`}>{item}</li>)}</ol>
        </Section>
        <Section title="Penutup"><p>{data.pengalamanBelajar.penutup}</p></Section>
        
        <h2 className="text-xl font-bold text-teal-800 bg-teal-50 p-3 rounded-md mb-4 mt-8">ASESMEN</h2>
        <Section title="Asesmen Awal"><p>{data.asesmen.awal}</p></Section>
        <Section title="Asesmen Proses"><p>{data.asesmen.proses}</p></Section>
        <Section title="Asesmen Akhir"><p>{data.asesmen.akhir}</p></Section>
        <Section title="Metode Asesmen"><p>{data.asesmen.metode}</p></Section>

        <h2 className="text-xl font-bold text-teal-800 bg-teal-50 p-3 rounded-md mb-4 mt-8">RUBRIK PENILAIAN</h2>
        <p className="mb-4 text-slate-600"><strong>Tujuan Pembelajaran:</strong> {data.rubrikPenilaian.tujuanPembelajaran}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="border p-2 font-semibold">Indikator</th>
                <th className="border p-2 font-semibold">Baru Memulai</th>
                <th className="border p-2 font-semibold">Berkembang</th>
                <th className="border p-2 font-semibold">Cakap</th>
                <th className="border p-2 font-semibold">Mahir</th>
              </tr>
            </thead>
            <tbody>
              {data.rubrikPenilaian.indikator.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="border p-2 font-medium">{item.indikator}</td>
                  <td className="border p-2">{item.baruMemulai}</td>
                  <td className="border p-2">{item.berkembang}</td>
                  <td className="border p-2">{item.cakap}</td>
                  <td className="border p-2">{item.mahir}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PpmResult;
