"use client";

import { motion } from "framer-motion";
import { TrendingDown, Shield, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Reducción de Costos",
    description:
      "Optimización del consumo energético con reducción de costos operativos.",
  },
  {
    icon: Shield,
    title: "Mayor Seguridad",
    description:
      "Eliminación de riesgos eléctricos y cumplimiento de normativas de seguridad.",
  },
  {
    icon: CheckCircle2,
    title: "Confiabilidad",
    description:
      "Sistema eléctrico estable con mayor disponibilidad operativa.",
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 mb-2">
            Resultados
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-accent-cyan rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-primary-100 rounded-full mb-6">
                <benefit.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-dark-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
