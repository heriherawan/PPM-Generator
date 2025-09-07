
import React from 'react';
import type { PpmFormData } from '../types';
import { MATA_PELAJARAN_OPTIONS, DPL_OPTIONS } from '../constants';
import Card from './Card';
import InputField from './InputField';
import SelectField from './SelectField';
import TextareaField from './TextareaField';
import CheckboxGroup from './CheckboxGroup';
import Button from './Button';
import { SparklesIcon } from './icons/SparklesIcon';

interface PpmFormProps {
  formData: PpmFormData;
  setFormData: React.Dispatch<React.SetStateAction<PpmFormData>>;
  onSubmit: () => void;
}

const PpmForm: React.FC<PpmFormProps> = ({ formData, setFormData, onSubmit }) => {
  
  const handleChange = <T,>(field: keyof PpmFormData, value: T) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDplChange = (checkedItems: string[]) => {
    setFormData(prev => ({ ...prev, dpl: checkedItems }));
  };

  return (
    <div className="space-y-6">
      <Card title="Informasi Umum">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Sekolah"
            id="sekolah"
            value={formData.sekolah}
            onChange={e => handleChange('sekolah', e.target.value)}
            disabled
          />
          <InputField
            label="Nama Guru"
            id="namaGuru"
            value={formData.namaGuru}
            onChange={e => handleChange('namaGuru', e.target.value)}
            placeholder="Contoh: Budi Santoso"
            required
          />
          <SelectField
            label="Mata Pelajaran"
            id="mataPelajaran"
            value={formData.mataPelajaran}
            onChange={e => handleChange('mataPelajaran', e.target.value)}
            options={MATA_PELAJARAN_OPTIONS}
            required
          />
          <InputField
            label="Kelas / Semester"
            id="kelasSemester"
            value={formData.kelasSemester}
            onChange={e => handleChange('kelasSemester', e.target.value)}
            placeholder="Contoh: VII / Ganjil"
            required
          />
          <InputField
            label="Alokasi Waktu"
            id="alokasiWaktu"
            value={formData.alokasiWaktu}
            onChange={e => handleChange('alokasiWaktu', e.target.value)}
            placeholder="Contoh: 2 Pertemuan (4 x 40 Menit)"
            required
          />
        </div>
      </Card>
      
      <Card title="Konteks Pembelajaran">
        <TextareaField
            label="Topik Utama / Konteks / Keterampilan"
            id="initialContext"
            value={formData.initialContext}
            onChange={e => handleChange('initialContext', e.target.value)}
            placeholder="Tuliskan topik utama, konteks, atau keterampilan yang ingin diajarkan. AI akan menggunakan ini untuk mengisi detail rencana pembelajaran. Contoh: 'Membuat Teks Prosedur tentang Resep Makanan Lokal' atau 'Memahami Konsep Energi Terbarukan melalui Proyek Sederhana'."
            rows={4}
            required
        />
      </Card>
      
      <Card title="Dimensi Profil Lulusan (DPL)">
         <CheckboxGroup
            label="Pilih 2-3 dimensi yang relevan dengan pembelajaran Anda"
            options={DPL_OPTIONS}
            selectedOptions={formData.dpl}
            onChange={handleDplChange}
            required
         />
      </Card>
      
      <div className="flex justify-end pt-4">
        <Button onClick={onSubmit} size="lg">
          <SparklesIcon className="w-5 h-5 mr-2" />
          Generate PPM
        </Button>
      </div>
    </div>
  );
};

export default PpmForm;
