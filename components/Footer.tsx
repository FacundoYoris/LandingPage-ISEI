"use client";

import Link from "next/link";
import { Zap, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "#problematicas", label: "Problemáticas" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#metodo", label: "Método" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-primary-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg">ISEI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Ingeniería especializada en sistemas eléctricos industriales.
              Soluciones técnicas adaptadas a cada industria.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Enlaces</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                <span>3496 540061 / 3496 460546</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                <span>isei.ingelectrica@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-accent-cyan flex-shrink-0" />
                <span>Santa Fe, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ISEI Ingeniería.
          </p>
        </div>
      </div>
    </footer>
  );
}
