import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});


export const metadata: Metadata = {
  title: "Marcel Portofolio",
  description: "Marcelino Portofolio Universitas Gadjah Mada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={poppins.variable}
      >
        {children}
      </body>
    </html>
  );
}
