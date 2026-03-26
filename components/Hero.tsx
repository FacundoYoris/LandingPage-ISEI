"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Settings, Activity } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let gridPoints: GridPoint[] = [];
    let energyParticles: EnergyParticle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class GridPoint {
      x: number;
      y: number;
      baseIntensity: number;
      pulseOffset: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseIntensity = Math.random() * 0.3;
        this.pulseOffset = Math.random() * Math.PI * 2;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(time * 2 + this.pulseOffset) * 0.5 + 0.5;
        const intensity = this.baseIntensity + pulse * 0.2;
        
        ctx.fillStyle = `rgba(6, 182, 212, ${intensity})`;
        ctx.fillRect(this.x - 1, this.y - 1, 2, 2);
      }
    }

    class LightBulb {
      x: number = 0;
      y: number = 0;
      radius: number = 3;
      isOn: boolean = false;
      onTime: number = 0;
      offTime: number = 0;
      cycleDuration: number = 0;
      state: "off" | "turningOn" | "on" | "turningOff" = "off";
      canvasRef: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvasRef = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 2;
        this.cycleDuration = Math.random() * 3 + 2;
        this.onTime = Math.random() * this.cycleDuration;
        this.offTime = this.cycleDuration - this.onTime;
        this.randomizeState();
      }

      randomizeState() {
        const rand = Math.random();
        if (rand < 0.3) {
          this.state = "off";
        } else if (rand < 0.5) {
          this.state = "turningOn";
        } else if (rand < 0.7) {
          this.state = "on";
        } else {
          this.state = "turningOff";
        }
      }

      update(time: number) {
        const cycleTime = time % this.cycleDuration;
        
        if (cycleTime < this.onTime) {
          this.state = "on";
        } else if (cycleTime < this.onTime + 0.3) {
          this.state = "turningOn";
        } else if (cycleTime < this.onTime + 0.3 + this.offTime) {
          this.state = "off";
        } else {
          this.state = "turningOff";
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        );

        let alpha = 0;
        let glowColor = "";

        switch (this.state) {
          case "on":
            alpha = 1;
            glowColor = "34, 211, 238";
            break;
          case "turningOn":
            alpha = 0.5 + Math.sin(Date.now() * 0.02) * 0.5;
            glowColor = "34, 211, 238";
            break;
          case "turningOff":
            alpha = Math.random() * 0.5;
            glowColor = "34, 211, 238";
            break;
          case "off":
          default:
            alpha = 0.1;
            glowColor = "100, 116, 139";
            break;
        }

        gradient.addColorStop(0, `rgba(${glowColor}, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(${glowColor}, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${glowColor}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    }

    let lightBulbs: LightBulb[] = [];

    class EnergyParticle {
      x: number = 0;
      y: number = 0;
      speed: number = 1;
      size: number = 1;
      trail: { x: number; y: number }[] = [];
      maxTrail: number = 8;
      canvasRef: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvasRef = canvas;
        this.reset();
      }

      reset() {
        this.x = Math.random() * this.canvasRef.width;
        this.y = this.canvasRef.height + 20;
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 2 + 1;
        this.trail = [];
      }

      update() {
        this.trail.unshift({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) {
          this.trail.pop();
        }
        
        this.y -= this.speed;
        this.x += (Math.random() - 0.5) * 0.5;

        if (this.y < -20) {
          this.reset();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.trail.length; i++) {
          const alpha = (1 - i / this.trail.length) * 0.6;
          const size = this.size * (1 - i / this.trail.length);
          ctx.beginPath();
          ctx.arc(this.trail[i].x, this.trail[i].y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.fill();
        }

        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, "rgba(34, 211, 238, 0.8)");
        gradient.addColorStop(1, "rgba(34, 211, 238, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    class CircuitLine {
      x: number = 0;
      y: number = 0;
      direction: "horizontal" | "vertical" = "horizontal";
      length: number = 100;
      active: boolean = false;
      activationTime: number = 0;
      canvasRef: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvasRef = canvas;
        this.direction = Math.random() > 0.5 ? "horizontal" : "vertical";
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = Math.random() * 100 + 50;
        this.active = false;
        this.activationTime = Math.random() * 5;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const shouldActivate = time > this.activationTime && Math.random() < 0.002;
        if (shouldActivate) this.active = true;

        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.direction === "horizontal" ? this.x + this.length : this.x,
          this.direction === "horizontal" ? this.y : this.y + this.length
        );

        if (this.active) {
          gradient.addColorStop(0, "rgba(6, 182, 212, 0)");
          gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.8)");
          gradient.addColorStop(1, "rgba(6, 182, 212, 0)");
        } else {
          gradient.addColorStop(0, "rgba(6, 182, 212, 0.1)");
          gradient.addColorStop(1, "rgba(6, 182, 212, 0.1)");
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        if (this.direction === "horizontal") {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.length, this.y);
        } else {
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
        }
        
        ctx.stroke();
      }
    }

    let circuitLines: CircuitLine[] = [];

    class ISELights {
      progress: number = 0;
      speed: number = 0.004;
      canvasRef: HTMLCanvasElement;

      constructor(canvas: HTMLCanvasElement) {
        this.canvasRef = canvas;
      }

      update() {
        this.progress += this.speed;
        if (this.progress > 1) this.progress = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const centerX = this.canvasRef.width / 2;
        const centerY = Math.min(this.canvasRef.height * 0.15, 80);
        const fontSize = Math.min(this.canvasRef.width * 0.12, 100);

        ctx.font = `300 ${fontSize}px 'Poppins', sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const text = "ISEI";
        const textWidth = ctx.measureText(text).width;
        const startX = centerX - textWidth / 2;
        
        for (let i = 0; i < text.length; i++) {
          const charWidth = ctx.measureText(text.substring(0, i + 1)).width - ctx.measureText(text.substring(0, i)).width;
          const x = startX + ctx.measureText(text.substring(0, i)).width + charWidth / 2;
          
          const charStartProgress = i / text.length;
          const charEndProgress = (i + 1) / text.length;
          
          let scale = 0;
          if (this.progress >= charEndProgress) {
            scale = 1;
          } else if (this.progress > charStartProgress) {
            scale = (this.progress - charStartProgress) / (charEndProgress - charStartProgress);
            scale = Math.min(scale * 1.2, 1);
          }
          
          if (scale > 0) {
            const gradient = ctx.createLinearGradient(x - charWidth/2, centerY - fontSize/2, x + charWidth/2, centerY + fontSize/2);
            gradient.addColorStop(0, "#22d3ee");
            gradient.addColorStop(0.5, "#06b6d4");
            gradient.addColorStop(1, "#22d3ee");
            
            ctx.save();
            ctx.translate(x, centerY);
            ctx.scale(scale, scale);
            ctx.shadowColor = "#22d3ee";
            ctx.shadowBlur = 20;
            ctx.fillStyle = gradient;
            ctx.fillText(text[i], 0, 0);
            ctx.restore();
            ctx.shadowBlur = 0;
          } else {
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = "#475569";
            ctx.fillText(text[i], x, centerY);
            ctx.globalAlpha = 1;
          }
        }

        const subFontSize = fontSize * 0.28;
        ctx.font = `400 ${subFontSize}px 'Poppins', sans-serif`;
        
        const subText = "INGENIERÍA";
        const subTextWidth = ctx.measureText(subText).width;
        const subStartX = centerX - subTextWidth / 2;
        
        for (let i = 0; i < subText.length; i++) {
          const charWidth = ctx.measureText(subText.substring(0, i + 1)).width - ctx.measureText(subText.substring(0, i)).width;
          const x = subStartX + ctx.measureText(subText.substring(0, i)).width + charWidth / 2;
          
          const charStartProgress = i / subText.length;
          const charEndProgress = (i + 1) / subText.length;
          
          let scale = 0;
          if (this.progress >= charEndProgress) {
            scale = 1;
          } else if (this.progress > charStartProgress) {
            scale = (this.progress - charStartProgress) / (charEndProgress - charStartProgress);
            scale = Math.min(scale * 1.2, 1);
          }
          
          if (scale > 0) {
            ctx.save();
            ctx.translate(x, centerY + fontSize * 0.9);
            ctx.scale(scale, scale);
            ctx.shadowColor = "#22d3ee";
            ctx.shadowBlur = 15;
            ctx.fillStyle = "#94a3b8";
            ctx.fillText(subText[i], 0, 0);
            ctx.restore();
            ctx.shadowBlur = 0;
          } else {
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = "#475569";
            ctx.fillText(subText[i], x, centerY + fontSize * 0.9);
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    let iseLights: ISELights;

    const init = () => {
      if (!canvas) return;
      resizeCanvas();
      gridPoints = [];
      energyParticles = [];
      circuitLines = [];
      lightBulbs = [];

      const spacing = 60;
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          gridPoints.push(new GridPoint(x + Math.random() * 20, y + Math.random() * 20));
        }
      }

      for (let i = 0; i < 15; i++) {
        energyParticles.push(new EnergyParticle(canvas));
      }

      for (let i = 0; i < 20; i++) {
        circuitLines.push(new CircuitLine(canvas));
      }

      for (let i = 0; i < 25; i++) {
        lightBulbs.push(new LightBulb(canvas));
      }

      iseLights = new ISELights(canvas);
    };

    let time = 0;
    const animate = () => {
      if (!canvas || !ctx) return;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#030712");
      gradient.addColorStop(0.5, "#0a1929");
      gradient.addColorStop(1, "#030712");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      circuitLines.forEach((line) => {
        line.draw(ctx, time);
      });

      if (iseLights) {
        iseLights.update();
        iseLights.draw(ctx);
      }

      lightBulbs.forEach((bulb) => {
        bulb.update(time);
        bulb.draw(ctx);
      });

      energyParticles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", () => {
      if (canvas) init();
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

      <div className="relative z-10 container mx-auto px-4 pt-[45vh] pb-32">
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
