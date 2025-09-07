
import React from 'react';

interface CheckboxOption {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  label: string;
  options: CheckboxOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
  required?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selectedOptions, onChange, required }) => {
  
  const handleCheckboxChange = (optionId: string) => {
    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    onChange(newSelection);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {options.map(option => (
          <div key={option.id} className="flex items-center">
            <input
              id={option.id}
              type="checkbox"
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleCheckboxChange(option.id)}
              className="h-4 w-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
            />
            <label htmlFor={option.id} className="ml-3 text-sm text-slate-700">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
