import type { Metadata } from "next";
import "../styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { PackageProvider } from "@/hooks/usePackage";

export const metadata: Metadata = {
  title: "TOEFL Prep - Prepare for TOEFL More Effectively",
  description: "Belajar TOEFL melalui materi, latihan soal, simulasi, dan sertifikasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AuthProvider>
          <PackageProvider>
            {children}
          </PackageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
