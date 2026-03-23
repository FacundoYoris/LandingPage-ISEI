import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isei-ingenieria.com"),
  title: {
    default: "ISEI Ingeniería | Sistemas Eléctricos Industriales",
    template: "%s | ISEI Ingeniería",
  },
  description:
    "Diagnóstico, diseño y ejecución de sistemas eléctricos industriales. Especialistas en media y baja tensión. Ingeniería firmada por profesional matriculado.",
  keywords: [
    "ingeniería eléctrica industrial",
    "sistemas eléctricos",
    "media tensión",
    "baja tensión",
    "tableros eléctricos",
    "diagnóstico eléctrico",
    "termografía",
    "ingeniería matriculada",
    "Santa Fe",
  ],
  authors: [{ name: "ISEI Ingeniería" }],
  creator: "ISEI Ingeniería",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://isei-ingenieria.com",
    siteName: "ISEI Ingeniería",
    title: "ISEI Ingeniería | Sistemas Eléctricos Industriales",
    description:
      "Diagnóstico, diseño y ejecución de sistemas eléctricos industriales. Especialistas en media y baja tensión.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISEI Ingeniería | Sistemas Eléctricos Industriales",
    description:
      "Diagnóstico, diseño y ejecución de sistemas eléctricos industriales.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={plusJakarta.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "ISEI Ingeniería",
              description:
                "Diagnóstico, diseño y ejecución de sistemas eléctricos industriales en media y baja tensión.",
              url: "https://isei-ingenieria.com",
              telephone: "+54 9 3496 540061",
              email: "isei.ingelectrica@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Santa Fe",
                addressCountry: "AR",
              },
              areaServed: "Santa Fe, Argentina",
              serviceType: [
                "Sistemas Eléctricos Industriales",
                "Media Tensión",
                "Baja Tensión",
                "Tableros Eléctricos",
                "Termografía",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
