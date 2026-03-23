"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let connections: Connection[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulsePhase: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(width: number, height: number, time: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.pulsePhase += 0.02;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 3
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${pulse})`);
        gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${pulse})`;
        ctx.fill();
      }
    }

    class Connection {
      nodeA: Node;
      nodeB: Node;
      active: boolean;
      phase: number;

      constructor(a: Node, b: Node) {
        this.nodeA = a;
        this.nodeB = b;
        this.active = false;
        this.phase = 0;
      }

      update() {
        this.phase += 0.05;
        if (Math.random() < 0.001) this.active = !this.active;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const dx = this.nodeA.x - this.nodeB.x;
        const dy = this.nodeA.y - this.nodeB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const opacity = (1 - distance / 200) * 0.3;
          
          ctx.beginPath();
          ctx.moveTo(this.nodeA.x, this.nodeA.y);
          ctx.lineTo(this.nodeB.x, this.nodeB.y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          if (this.active || Math.random() < 0.02) {
            const progress = (Math.sin(this.phase) + 1) / 2;
            const px = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * progress;
            const py = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * progress;

            const gradient = ctx.createRadialGradient(px, py, 0, px, py, 4);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
            gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }
      }
    }

    const init = () => {
      resizeCanvas();
      nodes = [];
      connections = [];

      for (let i = 0; i < 30; i++) {
        nodes.push(new Node(canvas.width, canvas.height));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          connections.push(new Connection(nodes[i], nodes[j]));
        }
      }
    };

    let time = 0;
    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.016;

      nodes.forEach((node) => {
        node.update(canvas.width, canvas.height, time);
        node.draw(ctx, time);
      });

      connections.forEach((conn) => {
        conn.update();
        conn.draw(ctx);
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      connections = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          connections.push(new Connection(nodes[i], nodes[j]));
        }
      }
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-950 to-dark-900" />

      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/70 to-dark-900/30" />

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
          >
            ¿Su instalación eléctrica{" "}
            <span className="text-accent-cyan">
              acompañó el crecimiento
            </span>{" "}
            de su industria?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Diagnóstico técnico, diseño y ejecución de sistemas eléctricos para la industria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#contacto"
              className="px-8 py-4 bg-accent-cyan text-dark-900 font-semibold rounded-full hover:bg-accent-electric transition-colors flex items-center gap-2"
            >
              Solicitar diagnóstico
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#metodo"
              className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
            >
              Conocer proceso
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
