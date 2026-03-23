"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Lightbulb, Wrench, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Relevamiento Técnico Integral",
    icon: Search,
    items: [
      "Evaluación del estado actual",
      "Relevamiento de instalación",
      "Termografía y calidad de energía",
      "Medición de puesta a tierra",
    ],
    result: "Informe técnico detallado",
    description: "Analizamos su sistema eléctrico actual para identificar oportunidades de mejora.",
  },
  {
    number: "02",
    title: "Propuesta de Mejora",
    icon: Lightbulb,
    items: [
      "Soluciones técnicas priorizadas",
      "Corrección de desvíos críticos",
      "Optimización energética",
      "Mejora del factor de potencia",
    ],
    result: "Plan de optimización",
    description: "Diseñamos la mejor estrategia para optimizar su instalación.",
  },
  {
    number: "03",
    title: "Ejecución y Acompañamiento",
    icon: Wrench,
    items: [
      "Diseño y montaje de tableros",
      "Actualización de protecciones",
      "Rediseño de alimentadores",
      "Seguimiento post-ejecución",
    ],
    result: "Instalación eficiente y segura",
    description: "Implementamos las mejoras con seguimiento técnico continuo.",
  },
];

export default function Method() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="metodo" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark-900 mb-2">
            Así trabajamos
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-accent-cyan rounded-full mx-auto mt-4" />
          <p className="text-gray-600 max-w-xl mx-auto">
            Un proceso de tres pasos para optimizar su sistema eléctrico.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
              className={`relative cursor-pointer transition-all duration-500 ${
                activeStep === index ? "-translate-y-3" : ""
              }`}
            >
              <motion.div
                animate={{
                  boxShadow: activeStep === index
                    ? "0 20px 40px -10px rgba(37, 99, 235, 0.25)"
                    : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                className={`bg-white rounded-2xl p-6 border-2 transition-all duration-500 ${
                  activeStep === index
                    ? "border-primary-600"
                    : "border-transparent"
                }`}
              >
                <div className="absolute -top-3 left-6 w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-primary-600/30">
                  {step.number}
                </div>

                <div className="flex items-center gap-3 mb-4 pt-6">
                    <motion.div
                    animate={{
                      backgroundColor: activeStep === index ? "#06b6d4" : "#eff6ff",
                      color: activeStep === index ? "#ffffff" : "#2563eb",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 flex items-center justify-center rounded-lg"
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  <h3 className="text-base font-bold text-dark-900">{step.title}</h3>
                </div>

                <ul className="space-y-2">
                  {step.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <motion.div
                        animate={{ backgroundColor: activeStep === index ? "#2563eb" : "#06b6d4" }}
                        transition={{ duration: 0.3 }}
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-primary-600" />
                    {step.result}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-center gap-2 mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  {index > 0 && (
                    <motion.div
                      animate={{
                        backgroundColor: activeStep !== null && activeStep >= index 
                          ? "#2563eb" 
                          : "#e5e7eb",
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-12 sm:w-20 h-1 rounded-full mx-1"
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: activeStep === index ? 1.2 : 1,
                      backgroundColor: activeStep === index ? "#2563eb" : "#2563eb",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold relative"
                  >
                    {index + 1}
                    {activeStep === index && (
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-primary-600"
                      />
                    )}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {activeStep !== null ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <h4 className="text-lg font-bold text-dark-900">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-gray-600">
                    {steps[activeStep].description}
                  </p>
                </motion.div>
              ) : (
                <p className="text-gray-500 italic">
                  Pase el cursor sobre una tarjeta para ver el detalle
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
