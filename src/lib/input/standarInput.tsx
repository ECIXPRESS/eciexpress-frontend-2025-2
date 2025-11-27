import React from 'react';

interface StandarInputProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'password' | 'email';
    className?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string; // Añadimos la prop name
}

const StandarInput: React.FC<StandarInputProps> = ({
                                                       id,
                                                       value,
                                                       onChange,
                                                       placeholder = '',
                                                       type = 'text',
                                                       disabled = false,
                                                       required = false,
                                                       name,
                                                   }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className="h-[60px] w-full border rounded-lg shadow-inner px-4 bg-[#f1f1f1] font-semibold text-neutral-800 border-none outline-none transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400"
        />
    );
};

export default StandarInput;