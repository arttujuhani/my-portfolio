"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

const PIXI_CDN = "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.9/browser/pixi.min.js";

// --- START TYPE DECLARATION FIX ---
// This declaration block is crucial for fixing the "Cannot find namespace 'PIXI'" error
// during TypeScript compilation (like when running 'npm run build').
// This block must stay to provide type definitions when PIXI is loaded via CDN.
declare namespace PIXI {
    export interface Graphics {}
    export interface Application {
        stage: Container;
        renderer: Renderer;
        view: HTMLCanvasElement;
        screen: { width: number; height: number };
        destroy(removeView?: boolean, stageOptions?: any): void;
    }
    export interface Container {
        removeChildren(begin?: number, end?: number): void;
        addChild(child: any): void;
        getBounds(skipUpdate?: boolean, rect?: any): { x: number; y: number; width: number; height: number };
    }
    export interface Renderer {
        resolution: number;
        extract: { pixels: (renderTexture: RenderTexture) => Uint8ClampedArray };
        render: (container: Container, options?: { renderTexture?: RenderTexture, transform?: Matrix }) => void;
    }
    export interface TextStyle {
        fontFamily?: string;
        fontSize?: number;
        fill?: number;
        align?: string;
        fontWeight?: string;
    }
    export interface Text {}
    export interface RenderTexture {
        destroy(): void;
    }
    export interface Matrix {
        tx: number;
        ty: number;
    }
    export const RenderTexture: any; // Simplified constructor declaration
    export const Text: any; // Simplified constructor declaration
    export const TextStyle: any; // Simplified constructor declaration
    export const Container: any; // Simplified constructor declaration
    export const Graphics: any; // Simplified constructor declaration
}

// Removed the line 'declare const PIXI: typeof PIXI;' to resolve the 'Duplicate identifier' error.

type Particle = PIXI.Graphics & {
  x: number;
  y: number;
  home: { x: number; y: number };
  vx: number;
  vy: number;
  r: number;
};
// --- END TYPE DECLARATION FIX ---

declare global {
  interface Window {
    PIXI?: typeof PIXI;
  }
}

const ParticleName = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [isPixiReady, setIsPixiReady] = useState(false);
  const [loading, setLoading] = useState("Loading PIXI.js...");

  // Constants
  const PULL_FORCE = 0.002;
  const DRAG_COEFFICIENT = 0.95;
  const MOUSE_REPEL_RADIUS = 50;
  const MOUSE_REPEL_FORCE = -1.5;

  const mousePositionRef = useRef({ x: 0, y: 0 });

  // === Create particles ===
  const createParticles = useCallback((app: PIXI.Application) => {
    if (!app?.stage || !app.renderer) return;

    // Clear existing particles before creating new ones
    app.stage.removeChildren();
    particlesRef.current = [];

    const textString = "Arttu Virtanen";

    // Dynamic font sizing based on current screen width to ensure responsiveness
    const textStyle = new PIXI.TextStyle({
      fontFamily: "Pristina Regular, system-ui, sans-serif",
      fontSize: Math.min(app.screen.width / 5, 140), // Use Math.min to cap size on large screens
      fill: 0xffffff,
      align: "center",
      fontWeight: "bold",
    });

    const text = new PIXI.Text(textString, textStyle);
    // @ts-ignore - PIXI V6/V7 uses methods that are not fully typed in simple declaration
    text.anchor.set(0.5); 
    text.position.set(app.screen.width / 2, app.screen.height / 2);

    const tempContainer = new PIXI.Container();
    tempContainer.addChild(text);
    app.stage.addChild(tempContainer);

    app.renderer.render(tempContainer);

    const bounds = (text as any).getBounds(true);
    const imgWidth = Math.ceil(bounds.width);
    const imgHeight = Math.ceil(bounds.height);

    let pixels: Uint8ClampedArray;
    let renderTexture: PIXI.RenderTexture | undefined = undefined;

    try {
      renderTexture = PIXI.RenderTexture.create({ width: imgWidth, height: imgHeight });
      const matrix = new (window as any).PIXI.Matrix();
      matrix.tx = -bounds.x;
      matrix.ty = -bounds.y;

      app.renderer.render(tempContainer, { renderTexture, transform: matrix });
      if (renderTexture) {
        pixels = app.renderer.extract.pixels(renderTexture);
      } else {
        throw new Error("RenderTexture is undefined");
      }
    } catch (e) {
      console.error("Pixel extraction failed:", e);
      if (renderTexture) renderTexture.destroy();
      tempContainer.destroy({ children: true });
      return;
    } finally {
      if (renderTexture) renderTexture.destroy();
    }

    // Remove the temporary container used to measure the text
    app.stage.removeChildren();

    const particles: Particle[] = [];
    const gap = 5;
    const startX = bounds.x;
    const startY = bounds.y;

    for (let y = 0; y < imgHeight; y += gap) {
      for (let x = 0; x < imgWidth; x += gap) {
        const i = (y * imgWidth + x) * 4;
        const alpha = pixels[i + 3];
        if (alpha > 128) {
          const r = 1.25;
          const dot = new PIXI.Graphics();
          dot.beginFill(0x60a5fa);
          dot.drawCircle(0, 0, r);
          dot.endFill();

          const homeX = startX + x;
          const homeY = startY + y;

          dot.x = homeX + (Math.random() - 0.5) * 50;
          dot.y = homeY + (Math.random() - 0.5) * 50;

          (dot as Particle).home = { x: homeX, y: homeY };
          (dot as Particle).vx = Math.random() * 4 - 2;
          (dot as Particle).vy = Math.random() * 4 - 2;
          (dot as Particle).r = r;

          app.stage.addChild(dot);
          particles.push(dot as Particle);
        }
      }
    }
    particlesRef.current = particles;
  }, []);

  // === Animation loop ===
  const animate = useCallback(() => {
    const particles = particlesRef.current;
    const mousePos = mousePositionRef.current;

    for (const p of particles) {
      const dx_home = p.home.x - p.x;
      const dy_home = p.home.y - p.y;
      const pullForceX = dx_home * PULL_FORCE;
      const pullForceY = dy_home * PULL_FORCE;

      let repelForceX = 0;
      let repelForceY = 0;
      const dx_mouse = p.x - mousePos.x;
      const dy_mouse = p.y - mousePos.y;
      const distSq = dx_mouse * dx_mouse + dy_mouse * dy_mouse;

      if (distSq < MOUSE_REPEL_RADIUS * MOUSE_REPEL_RADIUS) {
        const dist = Math.sqrt(distSq);
        const strength = MOUSE_REPEL_FORCE * (1 - dist / MOUSE_REPEL_RADIUS);
        repelForceX = (dx_mouse / dist) * strength;
        repelForceY = (dy_mouse / dist) * strength;
      }

      p.vx += pullForceX + repelForceX;
      p.vy += pullForceY + repelForceY;
      p.vx *= DRAG_COEFFICIENT;
      p.vy *= DRAG_COEFFICIENT;
      p.x += p.vx;
      p.y += p.vy;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
    appRef.current?.renderer.render(appRef.current.stage);
  }, [PULL_FORCE, DRAG_COEFFICIENT, MOUSE_REPEL_RADIUS, MOUSE_REPEL_FORCE]);

  // === PIXI initialization ===
  useEffect(() => {
    const loadPixi = () => {
      return new Promise((resolve, reject) => {
        if (window.PIXI) {
          resolve(window.PIXI);
          return;
        }
        const script = document.createElement("script");
        script.src = PIXI_CDN;
        script.onload = () => resolve(window.PIXI);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initPixi = async (PixiLib: any) => {
      setLoading("Initializing...");
      const app = new PixiLib.Application({
        resizeTo: window,
        backgroundAlpha: 0,
        antialias: true,
      });
      appRef.current = app;

      if (canvasRef.current) {
        canvasRef.current.appendChild(app.view);
      }

      // --- Interaction Handlers ---

      // Function to calculate and update mouse/touch position
      const handleInteractionMove = (event: MouseEvent | TouchEvent) => {
        let clientX, clientY;

        if ('touches' in event) {
            // Handle TouchEvent
            const touch = event.touches[0];
            if (!touch) return;
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            // Handle MouseEvent
            clientX = (event as MouseEvent).clientX;
            clientY = (event as MouseEvent).clientY;
        }

        const rect = app.view.getBoundingClientRect();
        const resolution = app.renderer.resolution || 1;
        mousePositionRef.current = {
          x: (clientX - rect.left) * resolution,
          y: (clientY - rect.top) * resolution,
        };
      };
      
      // Function to reset mouse position when interaction ends (particles fly back home)
      const handleInteractionEnd = () => {
        // Move the mouse position far away so particles return home
        mousePositionRef.current = { x: -9999, y: -9999 };
      };

      // Add all necessary listeners for desktop and mobile
      app.view.addEventListener("mousemove", handleInteractionMove as (e: Event) => void);
      app.view.addEventListener("touchmove", handleInteractionMove as (e: Event) => void);
      app.view.addEventListener("mouseleave", handleInteractionEnd);
      app.view.addEventListener("touchend", handleInteractionEnd);
      app.view.addEventListener("touchcancel", handleInteractionEnd);
      
      // --- Responsive Resize Handler ---
      let resizeTimeout: number | undefined = undefined;

      const handleResize = () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        // Debounce particle recalculation for 250ms
        resizeTimeout = window.setTimeout(() => {
            // Re-create particles to adjust font size and position for new screen size
            createParticles(app);
        }, 250);
      };

      window.addEventListener('resize', handleResize);
      // --- End Responsive Resize Handler ---

      createParticles(app);
      animationFrameRef.current = requestAnimationFrame(animate);

      setIsPixiReady(true);
      setLoading("");

      return () => {
        // Cleanup resize listener
        window.removeEventListener('resize', handleResize);
        if (resizeTimeout) clearTimeout(resizeTimeout);

        // Cleanup interaction listeners
        app.view.removeEventListener("mousemove", handleInteractionMove as (e: Event) => void);
        app.view.removeEventListener("touchmove", handleInteractionMove as (e: Event) => void);
        app.view.removeEventListener("mouseleave", handleInteractionEnd);
        app.view.removeEventListener("touchend", handleInteractionEnd);
        app.view.removeEventListener("touchcancel", handleInteractionEnd);

        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        app.destroy(true);
      };
    };

    loadPixi().then(initPixi).catch(console.error);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [createParticles, animate]);

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 w-full h-full overflow-hidden bg-[#0a0a0a]"
      style={{ zIndex: 0 }}
    >
      {!isPixiReady && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          {loading}
        </div>
      )}
      </div>
  );
};

export default ParticleName;