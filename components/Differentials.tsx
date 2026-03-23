"use client";

import { motion } from "framer-motion";
import { Target, Award, FileCheck, Shield } from "lucide-react";

const differentials = [
  {
    icon: Target,
    title: "Enfoque Integral",
    description:
      "Análisis completo de su sistema eléctrico considerando todos los aspectos técnicos y operativos.",
  },
  {
    icon: Award,
    title: "Profesional Matriculado",
    description:
      "Ingeniería firmada por profesional habilitado, garantizando calidad y respaldo legal.",
  },
  {
    icon: FileCheck,
    title: "Documentación Técnica",
    description:
      "Entrega de planos, memorias y documentación técnica completa y actualizada.",
  },
  {
    icon: Shield,
    title: "Seguridad",
    description:
      "Cumplimiento total de normativas y estándares de seguridad vigentes.",
  },
];

export default function Differentials() {
  return (
    <section className="py-24 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2">
            Por qué elegir ISEI
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-accent-cyan rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, index) => (
            <motion.div
              key={diff.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-accent-cyan/50 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-accent-cyan/20 rounded-xl mb-4">
                <diff.icon className="w-6 h-6 text-accent-cyan" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {diff.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {diff.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
