
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white mt-4 text-lg">AI sedang menyusun rencana pembelajaran...</p>
    </div>
  );
};

export default Loader;
