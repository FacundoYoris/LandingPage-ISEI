"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";

const problematicas = [
  {
    title: "Tableros sin documentación actualizada",
    description: "Planos y esquemas unifilares faltantes o desactualizados que no reflejan la realidad de la instalación.",
  },
  {
    title: "Ampliaciones sin rediseño estructural",
    description: "Modificaciones realizadas sin una planificación integral del sistema eléctrico.",
  },
  {
    title: "Penalizaciones por bajo factor de potencia",
    description: "Excedentes en el consumo reactivo que generan cargos adicionales en la factura de energía.",
  },
  {
    title: "Disparos frecuentes de protecciones",
    description: "Protecciones que se disparan constantemente o sobrecalentamiento de cables y componentes.",
  },
  {
    title: "Requerimientos de la distribuidora",
    description: "Incumplimiento de las exigencias técnicas de la empresa distribuidora de energía.",
  },
  {
    title: "Falta de análisis técnico integral",
    description: "Ausencia de un diagnóstico profesional completo que identifique oportunidades de mejora.",
  },
  {
    title: "Riesgos eléctricos",
    description: "Falta de verificación de disyuntores, puesta a tierra y calidad de energía.",
  },
];

export default function Problems() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === problematicas.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? problematicas.length - 1 : prev - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === problematicas.length - 1 ? 0 : prev + 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="problematicas" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 mb-2 leading-tight">
            Situaciones que enfrentamos
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-accent-cyan rounded-full mt-4" />
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 mb-4">
                  {problematicas[currentIndex].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problematicas[currentIndex].description}
                </p>
              </div>
            </motion.div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {problematicas.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary-600 w-6" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-medium rounded-full hover:bg-primary-700 transition-colors"
          >
            Solicitar evaluación
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
