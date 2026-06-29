import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-xs font-semibold text-slate-500 font-inter tracking-wide">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-[14px] bg-white/40 border border-white/40 backdrop-blur-md text-slate-800 placeholder:text-black/40 outline-none font-inter text-sm transition-all duration-200 focus:border-brand-main focus:bg-white/60 focus:ring-4 focus:ring-brand-light/10 ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] text-red-500 font-medium mt-0.5">{error}</p>}
    </div>
  );
};
export default Input;
