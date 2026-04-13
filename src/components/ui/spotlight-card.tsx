"use client";
import React, { useEffect, useRef, ReactNode } from 'react';

export interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 }, // Deep space indigo/purple
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'purple',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (cardRef.current) {
        // Calculate strictly locally to the card's bounding box
        const rect = cardRef.current.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        // Add fading if mouse is far away (smoothly drop opacity of light if miles away)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distance = Math.sqrt(Math.pow(localX - centerX, 2) + Math.pow(localY - centerY, 2));

        cardRef.current.style.setProperty('--x', localX.toFixed(2));
        cardRef.current.style.setProperty('--y', localY.toFixed(2));
        
        // Intensity decreases if cursor is outside bounding box
        const isInside = localX > 0 && localX < rect.width && localY > 0 && localY < rect.height;
        cardRef.current.style.setProperty('--active', isInside ? '1' : '0.4');
      }
    };

    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return ''; 
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles: React.CSSProperties & Record<string, string | number> = {
      '--base': base,
      '--spread': spread,
      '--radius': '24', 
      '--border': '1', 
      '--backdrop': 'rgba(0, 0, 0, 0.4)', 
      '--backup-border': 'rgba(255, 255, 255, 0.05)',
      '--size': '350', 
      '--out-intensity': 'var(--active, 0.4)',
      '--border-size': 'calc(var(--border, 1) * 1px)',
      '--spotlight-size': 'calc(var(--size, 250) * 1px)',
      '--hue': 'calc(var(--base) + (var(--x, 0) * 0.1))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / calc(0.15 * var(--out-intensity))), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
      touchAction: 'none' as const,
      transition: 'opacity 0.3s ease',
    };

    if (width !== undefined) baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    if (height !== undefined) baseStyles.height = typeof height === 'number' ? `${height}px` : height;

    return baseStyles;
  };

  const beforeAfterStyles = `
    /* Border Glow */
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      transition: opacity 0.3s ease;
      opacity: var(--out-intensity);
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.8) calc(var(--spotlight-size) * 0.8) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 90% 70% / 1), transparent 100%
      );
      filter: brightness(1.5);
    }
    
    /* Internal Premium Noise/Dot Pattern Revealed by light */
    .glow-pattern-mask {
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: calc(var(--radius) * 1px);
      opacity: calc(var(--out-intensity) * 0.8);
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.6) calc(var(--spotlight-size) * 0.6) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        white, transparent 100%
      );
      mask-image: radial-gradient(black 1px, transparent 1px);
      mask-size: 16px 16px;
      mix-blend-mode: overlay;
      transition: opacity 0.3s ease;
    }
    
    /* Ethereal Outer shadow */
    [data-glow] > [data-glow] {
      position: absolute;
      inset: -10px;
      will-change: filter;
      opacity: calc(var(--out-intensity) * 0.5);
      border-radius: calc(var(--radius) * 1px);
      border-width: 10px;
      filter: blur(20px);
      background: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 100% 60% / 0.8), transparent 100%
      );
      pointer-events: none;
      border: none;
      transition: opacity 0.3s ease;
      z-index: -1;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          rounded-[24px]
          relative 
          overflow-hidden
          shadow-xl
          backdrop-blur-xl
          ${className}
        `}
      >
        <div className="glow-pattern-mask bg-purple-500/30"></div>
        <div ref={innerRef} data-glow></div>
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </>
  );
};

export { GlowCard };
