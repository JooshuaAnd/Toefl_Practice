"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface SelectedPackage {
  packageId: string;
  packageName: string;
  price: string;
}

interface PackageContextType {
  selectedPackage: SelectedPackage | null;
  selectPackage: (pkg: SelectedPackage) => void;
  clearPackage: () => void;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export const PackageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("toefl_selected_package");
    if (stored) {
      setSelectedPackage(JSON.parse(stored));
    }
  }, []);

  const selectPackage = useCallback((pkg: SelectedPackage) => {
    localStorage.setItem("toefl_selected_package", JSON.stringify(pkg));
    setSelectedPackage(pkg);
  }, []);

  const clearPackage = useCallback(() => {
    localStorage.removeItem("toefl_selected_package");
    setSelectedPackage(null);
  }, []);

  return (
    <PackageContext.Provider value={{ selectedPackage, selectPackage, clearPackage }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = (): PackageContextType => {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error("usePackage must be used within a PackageProvider");
  }
  return context;
};

export default usePackage;
