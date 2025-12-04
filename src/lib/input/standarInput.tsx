import React, { useState, useEffect } from 'react';

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
    errorMessage?: string;
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
    errorMessage = 'Este campo es obligatorio',
}) => {
    const [touched, setTouched] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (touched) {
            setHasError(required && !value.trim());
        }
    }, [value, touched, required]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleBlur = () => {
        setTouched(true);
        if (required) {
            setHasError(!value.trim());
        }
    };

    const inputClasses = `h-[50px] w-full border rounded-2xl shadow-inner px-6 bg-[#f1f1f1] text-foreground outline-none transition-all duration-200 
        focus:ring-2 focus:ring-[#5AC7E1] focus:bg-white 
        disabled:opacity-50 disabled:cursor-not-allowed 
        placeholder:text-gray-400
        ${hasError ? 'border-red-500 focus:ring-red-200' : 'border-none focus:ring-2 focus:ring-[#5AC7E1]'}`;

    return (
        <div className="w-full">
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                maxLength={maxLength}
                className={inputClasses}
                aria-invalid={hasError ? 'true' : 'false'}
                aria-describedby={`${id}-error`}
            />
            {hasError && (
                <p id={`${id}-error`} className="mt-1 text-sm text-red-500 pl-2">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default StandarInput;