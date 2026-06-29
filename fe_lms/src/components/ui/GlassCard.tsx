import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", as: Tag = "div" }) => {
  return (
    <Tag className={`glass-card rounded-3xl hover:translate-y-0 ${className}`}>
      {children}
    </Tag>
  );
};
export default GlassCard;
