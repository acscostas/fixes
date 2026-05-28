import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IAzzas Studio",
  description: "Geração de imagens de moda com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} h-full`}>
      <body className="h-full bg-background antialiased">
        <NuqsAdapter>
          {children}
          <Toaster position="bottom-center" richColors />
        </NuqsAdapter>
      </body>
    </html>
  );
}
