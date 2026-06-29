import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 selection:bg-brand-light/30 selection:text-brand-dark">
      {/* Background Glow Container */}
      <div className="bg-glow-container">
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />
        <div className="bg-glow-3" />
        <div className="bg-grid-overlay" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
};
export default MainLayout;
