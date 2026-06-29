import React from "react";

interface GlassOrbProps {
  className?: string;
}

export const GlassOrb: React.FC<GlassOrbProps> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center overflow-visible select-none pointer-events-none ${className}`}>
      {/* Back glow behind the video */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-light/20 to-brand-main/30 blur-3xl rounded-full scale-75 opacity-70 animate-pulse-glow" />
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain mix-blend-screen scale-125 transition-all duration-700"
        style={{
          filter: "hue-rotate(-55deg) saturate(250%) brightness(1.2) contrast(1.1)",
        }}
      >
        <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
export default GlassOrb;
