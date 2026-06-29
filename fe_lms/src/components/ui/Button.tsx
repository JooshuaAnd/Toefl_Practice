import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const base = "font-semibold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "glass-button-primary text-white shadow-lg shadow-brand-main/20 hover:shadow-xl hover:shadow-brand-main/30",
    secondary: "glass-button text-slate-700 border border-slate-200",
    ghost: "text-slate-600 hover:text-brand-dark hover:bg-slate-50/50",
  };
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};
export default Button;
