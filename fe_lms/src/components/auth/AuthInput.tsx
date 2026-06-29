import React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ label, id, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-xs font-semibold text-slate-500 font-inter tracking-wide">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-3 rounded-[14px] bg-white/40 border border-white/40 backdrop-blur-md text-slate-800 placeholder-black/45 outline-none font-inter text-sm transition-all duration-200 focus:border-brand-main focus:bg-white/60 focus:ring-4 focus:ring-brand-light/10 ${className}`}
        {...props}
      />
    </div>
  );
};
export default AuthInput;
