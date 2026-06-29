import React from "react";
import { Building2, User } from "lucide-react";

interface AccountTypeCardProps {
  type: "company" | "individual";
  selected: boolean;
  onClick: () => void;
}

export const AccountTypeCard: React.FC<AccountTypeCardProps> = ({ type, selected, onClick }) => {
  const isCompany = type === "company";

  return (
    <div
      onClick={onClick}
      className={`relative p-8 rounded-[24px] backdrop-blur-[30px] border transition-all duration-300 cursor-pointer flex flex-col items-center text-center space-y-4 hover:scale-[1.02] ${
        selected
          ? "border-brand-main bg-white/70 shadow-[0_12px_40px_rgba(49,154,255,0.2)] ring-1 ring-brand-main/30"
          : "border-white/20 bg-white/30 hover:bg-white/40 shadow-[0_8px_32px_rgba(31,38,135,0.15)]"
      }`}
    >
      <div
        className={`p-4 rounded-2xl transition-all duration-300 ${
          selected
            ? "bg-brand-main text-white"
            : "bg-white/50 text-brand-dark"
        }`}
      >
        {isCompany ? <Building2 className="h-7 w-7" /> : <User className="h-7 w-7" />}
      </div>
      <div>
        <h3 className="font-fustat text-xl font-bold text-slate-800">
          {isCompany ? "Company" : "Individual"}
        </h3>
        <p className="font-inter text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
          {isCompany
            ? "Register your institution, organization, or training center."
            : "Start your personal TOEFL learning journey."}
        </p>
      </div>

      {/* Decorative active selection indicator */}
      {selected && (
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-main" />
      )}
    </div>
  );
};
export default AccountTypeCard;
