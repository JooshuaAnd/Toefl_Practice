import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ label, id, className = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <label htmlFor={id} className="text-xs font-semibold text-slate-500 font-inter tracking-wide">
        {label}
      </label>
      <div className="relative w-full">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className={`w-full pl-4 pr-11 py-3 rounded-[14px] bg-white/40 border border-white/40 backdrop-blur-md text-slate-800 placeholder-black/45 outline-none font-inter text-sm transition-all duration-200 focus:border-brand-main focus:bg-white/60 focus:ring-4 focus:ring-brand-light/10 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};
export default PasswordInput;
