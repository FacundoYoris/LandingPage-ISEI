"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Enfoque técnico integral adaptado a cada tipo de industria",
  "Ingeniería firmada por profesional matriculado",
  "Equipamiento certificado",
  "Cumplimiento estricto de normativas y estándares de seguridad",
  "Documentación técnica clara",
  "Planificación orientada a la continuidad operativa",
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/campo.jpeg"
                alt="Técnico de ISEI trabajando en instalación eléctrica"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 mb-2">
              Sobre nosotros
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-accent-cyan rounded-full mb-6" />
            <p className="text-gray-600 mb-6 leading-relaxed">
              Somos una empresa especializada en el diagnóstico, diseño y ejecución
              de sistemas eléctricos industriales. Nuestro enfoque técnico integral
              nos permite ofrecer soluciones adaptadas a las necesidades específicas
              de cada tipo de industria.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Contamos con ingeniería firmada por profesional matriculado, garantizando
              el cumplimiento de todas las normativas y estándares de seguridad vigentes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-accent-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
