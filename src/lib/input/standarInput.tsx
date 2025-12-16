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
    name?: string;
    maxLength?: number;
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
                                                       maxLength,
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
            maxLength={maxLength}
            className="h-[50px] w-full border rounded-2xl shadow-inner px-6 bg-[#f1f1f1] text-foreground border-none outline-none transition-all duration-200 focus:ring-2 focus:ring-[#5AC7E1] focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400"
        />
    );
};

export default StandarInput;