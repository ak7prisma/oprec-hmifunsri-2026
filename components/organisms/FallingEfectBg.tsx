"use client";

import { useEffect, useRef } from "react";

class Petal {
  x: number;
  y: number;
  size: number;
  baseSpeedY: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;

  static readonly colors = [
    "rgba(255, 183, 197, 0.7)", 
    "rgba(255, 192, 203, 0.6)", 
    "rgba(244, 114, 182, 0.5)", 
    "rgba(255, 255, 255, 0.4)", 
  ];

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.size = Math.random() * 8 + 5;
    this.baseSpeedY = Math.random() * 0.5 + 0.3; 
    this.color = Petal.colors[Math.floor(Math.random() * Petal.colors.length)];
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    this.sway = Math.random() * Math.PI * 2;
    this.swaySpeed = Math.random() * 0.02 + 0.005;
  }

  update(width: number, height: number, wind: number, mouseY: number) {
    let dynamicSpeedY = this.baseSpeedY;
    
    if (mouseY < 300 && mouseY > 0) {
      const slowFactor = Math.max(0.2, mouseY / 300);
      dynamicSpeedY *= slowFactor;
    }

    this.y += dynamicSpeedY;
    
    this.sway += this.swaySpeed;
    this.x += Math.sin(this.sway) * 0.5 + wind; 
    
    this.rotation += this.rotationSpeed;

    if (this.y > height) {
      this.y = -20;
      this.x = Math.random() * width;
    }
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 1.8, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

const FallingPetals = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mouseRef = useRef({ x: 0, y: 9999 });
  const windRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const petalCount = 45;
    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal(width, height));
    }

    let animationFrameId: number;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - mouseRef.current.x;
      
      windRef.current = deltaX * 0.015; 

      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      windRef.current *= 0.97;

      petals.forEach((petal) => {
        petal.update(width, height, windRef.current, mouseRef.current.y);
        petal.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    globalThis.addEventListener("mousemove", handleMouseMove);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      globalThis.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none h-full w-full"
    />
  );
};

export default FallingPetals;