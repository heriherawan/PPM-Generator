
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PpmForm from './components/PpmForm';
import PpmResult from './components/PpmResult';
import Loader from './components/Loader';
import { PpmFormData, PpmResultData } from './types';
import { generatePpm } from './services/geminiService';
import { MATA_PELAJARAN_OPTIONS, DPL_OPTIONS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'result'>('form');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PpmFormData>({
    sekolah: 'SMP Islamic Centre Muhammadiyah Cipanas',
    namaGuru: '',
    mataPelajaran: MATA_PELAJARAN_OPTIONS[0],
    kelasSemester: '',
    alokasiWaktu: '',
    initialContext: '',
    dpl: [],
  });
  const [resultData, setResultData] = useState<PpmResultData | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!formData.namaGuru || !formData.kelasSemester || !formData.alokasiWaktu || !formData.initialContext || formData.dpl.length === 0) {
      setError('Harap isi semua kolom yang wajib diisi.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await generatePpm(formData);
      setResultData(result);
      setView('result');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Gagal menghasilkan PPM. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const handleBackToForm = () => {
    setView('form');
    setResultData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {isLoading && <Loader />}
        {error && !isLoading && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}
        {view === 'form' && !isLoading && (
          <PpmForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleGenerate}
          />
        )}
        {view === 'result' && resultData && !isLoading && (
          <PpmResult 
            data={resultData} 
            formData={formData}
            onBack={handleBackToForm} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
