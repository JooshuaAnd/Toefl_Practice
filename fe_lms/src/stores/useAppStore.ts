"use client";

import { create } from "zustand";

export type AccountRole = "individual" | "company";

export interface PackageOption {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface Subscription {
  packageName: string;
  role: AccountRole;
  startDate: string;
  expiryDate: string;
  status: "active" | "expired" | "cancelled";
  price: string;
  period: string;
  features: string[];
}

export interface CurrentUser {
  id: string;
  role: AccountRole;
  name: string;
  email: string;
  companyName?: string;
  picName?: string;
  phone?: string;
}

const INDIVIDUAL_PACKAGES: PackageOption[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$19",
    period: "/month",
    features: [
      "10 materi pembelajaran",
      "100 soal latihan",
      "1 simulasi TOEFL",
      "Skor prediksi dasar",
      "Dukungan email",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "$39",
    period: "/month",
    features: [
      "20 materi pembelajaran",
      "300 soal latihan",
      "3 simulasi TOEFL",
      "Analitik skor lanjutan",
      "Dukungan prioritas",
      "Dashboard progres",
    ],
    popular: true,
  },
  {
    id: "gold",
    name: "Gold",
    price: "$59",
    period: "/month",
    features: [
      "Semua materi pembelajaran",
      "1.000+ soal latihan",
      "10 simulasi TOEFL",
      "Sertifikat kelulusan",
      "Penilaian esai AI",
      "Sesi tutor 1-on-1",
    ],
  },
];

const COMPANY_PACKAGES: PackageOption[] = [
  {
    id: "small",
    name: "Company Small",
    price: "$99",
    period: "/month",
    features: [
      "Hingga 10 peserta",
      "Semua materi pembelajaran",
      "500 soal latihan",
      "5 simulasi TOEFL per peserta",
      "Dashboard admin",
      "Laporan progres",
    ],
  },
  {
    id: "medium",
    name: "Company Medium",
    price: "$199",
    period: "/month",
    features: [
      "Hingga 30 peserta",
      "Semua materi pembelajaran",
      "1.000+ soal latihan",
      "10 simulasi TOEFL per peserta",
      "Dashboard admin",
      "Laporan progres real-time",
      "Pembuat tes kustom",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$499",
    period: "/month",
    features: [
      "Peserta tidak terbatas",
      "Semua materi pembelajaran",
      "Soal latihan tidak terbatas",
      "Simulasi tidak terbatas",
      "Dashboard admin",
      "Laporan progres real-time",
      "Pembuat tes kustom",
      "Dedicated account manager",
      "API akses",
    ],
  },
];

function loadFromLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored);
  } catch {}
  return fallback;
}

function saveToLocalStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

interface AppState {
  selectedRole: AccountRole | null;
  selectedPackage: PackageOption | null;
  currentUser: CurrentUser | null;
  subscription: Subscription | null;
  setSelectedRole: (role: AccountRole) => void;
  setSelectedPackage: (pkg: PackageOption) => void;
  setCurrentUser: (user: CurrentUser) => void;
  setSubscription: (sub: Subscription) => void;
  clearAll: () => void;
  getPackages: () => PackageOption[];
  getIndividualPackages: () => PackageOption[];
  getCompanyPackages: () => PackageOption[];
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedRole: loadFromLocalStorage<AccountRole | null>("linguedu_selectedRole", null),
  selectedPackage: loadFromLocalStorage<PackageOption | null>("linguedu_selectedPackage", null),
  currentUser: loadFromLocalStorage<CurrentUser | null>("linguedu_currentUser", null),
  subscription: loadFromLocalStorage<Subscription | null>("linguedu_subscription", null),

  setSelectedRole: (role) => {
    saveToLocalStorage("linguedu_selectedRole", role);
    set({ selectedRole: role });
  },

  setSelectedPackage: (pkg) => {
    saveToLocalStorage("linguedu_selectedPackage", pkg);
    set({ selectedPackage: pkg });
  },

  setCurrentUser: (user) => {
    saveToLocalStorage("linguedu_currentUser", user);
    saveToLocalStorage("linguedu_user", {
      name: user.name,
      email: user.email,
      accountType: user.role,
      role: user.role,
      ...(user.companyName ? { institution: user.companyName } : {}),
    });
    set({ currentUser: user });
  },

  setSubscription: (sub) => {
    saveToLocalStorage("linguedu_subscription", sub);
    set({ subscription: sub });
  },

  clearAll: () => {
    if (typeof window !== "undefined") {
      ["linguedu_selectedRole", "linguedu_selectedPackage", "linguedu_currentUser", "linguedu_subscription"].forEach((k) => localStorage.removeItem(k));
    }
    set({ selectedRole: null, selectedPackage: null, currentUser: null, subscription: null });
  },

  getPackages: () => {
    const role = get().selectedRole;
    return role === "company" ? COMPANY_PACKAGES : INDIVIDUAL_PACKAGES;
  },

  getIndividualPackages: () => INDIVIDUAL_PACKAGES,
  getCompanyPackages: () => COMPANY_PACKAGES,
}));
