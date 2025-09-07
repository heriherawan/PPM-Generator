
import React from 'react';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4">
         <div className="bg-teal-500 p-2 rounded-lg text-white">
            <DocumentTextIcon className="w-8 h-8" />
         </div>
        <div>
            <h1 className="text-2xl font-bold text-teal-600">PPM Generator</h1>
            <p className="text-slate-500">ICM CIPANAS</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
