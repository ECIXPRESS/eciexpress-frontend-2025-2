import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const StandardInput = ({ id, value, onChange, placeholder = '', type = 'text', disabled = false, required = false, name, maxLength, errorMessage = 'Este campo es obligatorio', }) => {
    const [touched, setTouched] = useState(false);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        console.log(`Campo ${id}: value="${value}", touched=${touched}, required=${required}`);
        if (touched) {
            setHasError(required && !value);
        }
    }, [value, touched, required]);
    const handleChange = (e) => {
        onChange(e.target.value);
        if (touched && required && !e.target.value) {
            setHasError(true);
        }
        else if (touched && hasError && e.target.value) {
            setHasError(false);
        }
    };
    const handleBlur = () => {
        setTouched(true);
        if (required) {
            setHasError(!value);
        }
    };
    const inputClasses = `h-[50px] w-full border rounded-2xl shadow-inner px-6 bg-[#f1f1f1] text-foreground outline-none transition-all duration-200 
        focus:ring-2 focus:ring-[#5AC7E1] focus:bg-white 
        disabled:opacity-50 disabled:cursor-not-allowed 
        placeholder:text-gray-400
        ${hasError ? 'border-red-500 focus:ring-red-200' : 'border-none focus:ring-2 focus:ring-[#5AC7E1]'}`;
    return (_jsxs("div", { className: "w-full", children: [_jsx("input", { id: id, name: name, type: type, value: value, onChange: handleChange, onBlur: handleBlur, placeholder: placeholder, disabled: disabled, required: required, maxLength: maxLength, className: inputClasses, "aria-invalid": hasError ? 'true' : 'false', "aria-describedby": `${id}-error` }), hasError && (_jsx("p", { id: `${id}-error`, className: "mt-1 text-sm text-red-500 pl-2", children: errorMessage }))] }));
};
export default StandardInput;
