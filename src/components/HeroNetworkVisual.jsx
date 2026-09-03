import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const NODES = [
  { id: 'A', cx: 150, cy: 400, r: 6, color: '#3b82f6', isAccent: false, delay: 0 },
  { id: 'B', cx: 350, cy: 150, r: 8, color: '#3b82f6', isAccent: false, delay: 0.2 },
  { id: 'C', cx: 250, cy: 600, r: 5, color: '#f97316', isAccent: true, delay: 0.4 },
  { id: 'D', cx: 550, cy: 250, r: 12, color: '#3b82f6', isAccent: false, delay: 0.6 }, // Core node
  { id: 'E', cx: 500, cy: 650, r: 7, color: '#3b82f6', isAccent: false, delay: 0.8 },
  { id: 'F', cx: 750, cy: 400, r: 9, color: '#f97316', isAccent: true, delay: 1.0 },
  { id: 'G', cx: 850, cy: 200, r: 5, color: '#3b82f6', isAccent: false, delay: 1.2 },
  { id: 'H', cx: 900, cy: 600, r: 6, color: '#3b82f6', isAccent: false, delay: 1.4 },
  { id: 'I', cx: 650, cy: 500, r: 8, color: '#3b82f6', isAccent: false, delay: 1.6 },
  { id: 'J', cx: 350, cy: 400, r: 10, color: '#3b82f6', isAccent: false, delay: 0.5 },
];

const CONNECTIONS = [
  { source: 'A', target: 'B', id: 'path-ab' },
  { source: 'A', target: 'J', id: 'path-aj' },
  { source: 'A', target: 'C', id: 'path-ac' },
  { source: 'B', target: 'D', id: 'path-bd' },
  { source: 'B', target: 'J', id: 'path-bj' },
  { source: 'C', target: 'J', id: 'path-cj' },
  { source: 'C', target: 'E', id: 'path-ce' },
  { source: 'J', target: 'D', id: 'path-jd' },
  { source: 'J', target: 'I', id: 'path-ji' },
  { source: 'D', target: 'F', id: 'path-df' },
  { source: 'D', target: 'G', id: 'path-dg' },
  { source: 'E', target: 'I', id: 'path-ei' },
  { source: 'I', target: 'F', id: 'path-if' },
  { source: 'I', target: 'H', id: 'path-ih' },
  { source: 'F', target: 'G', id: 'path-fg' },
  { source: 'F', target: 'H', id: 'path-fh' },
];

// Pre-compute path strings
const getPathData = (c) => {
  const n1 = NODES.find(n => n.id === c.source);
  const n2 = NODES.find(n => n.id === c.target);
  return `M${n1.cx},${n1.cy} L${n2.cx},${n2.cy}`;
};

export default function HeroNetworkVisual() {
  const svgRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ctx = gsap.context(() => {
      
      // 1. Connection Drawing
      gsap.fromTo('.network-path', 
        { strokeDasharray: 1000, strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", stagger: 0.1 }
      );

      // 2. Node Appearance
      gsap.fromTo('.network-node',
        { scale: 0, transformOrigin: 'center center', opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)", stagger: 0.1, delay: 0.5 }
      );

      if (reduced) return; // Stop heavy animations for reduced motion

      // 3. Node Pulse (Continuous)
      NODES.forEach((node, i) => {
        gsap.to(`.node-glow-${node.id}`, {
          scale: 1.8,
          opacity: 0,
          transformOrigin: 'center',
          duration: 2 + Math.random(),
          repeat: -1,
          delay: node.delay + 2,
          ease: "power1.out"
        });

        // Subtle core node pulse
        gsap.to(`.node-core-${node.id}`, {
          scale: 1.15,
          opacity: 0.6,
          transformOrigin: 'center',
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // 4. Data Flow (Particles)
      // Pick 5 random connections for active data flow
      const flowPaths = ['path-ab', 'path-jd', 'path-df', 'path-ce', 'path-if'];
      flowPaths.forEach((pathId, i) => {
        gsap.fromTo(`.particle-${pathId}`,
          { strokeDasharray: "0, 1000", strokeDashoffset: 0 },
          { 
            strokeDasharray: "15, 1000", 
            strokeDashoffset: -400, // Move along path
            duration: 3 + Math.random() * 2,
            repeat: -1,
            delay: i * 0.5 + 2,
            ease: "linear"
          }
        );
      });

      // 5. Micro Movement (Entire SVG float)
      gsap.to(svgRef.current, {
        y: -15,
        x: -5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      
      {/* Background Radial Light Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <svg 
        ref={svgRef}
        viewBox="0 0 1000 800" 
        className="w-full h-auto max-h-full overflow-visible drop-shadow-2xl z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2"/>
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 1. Base Connections */}
        {CONNECTIONS.map(conn => (
          <path 
            key={conn.id}
            className="network-path"
            d={getPathData(conn)}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {/* 4. Data Flow Particles (Dashed overlapping paths) */}
        {['path-ab', 'path-jd', 'path-df', 'path-ce', 'path-if'].map(pathId => {
          const conn = CONNECTIONS.find(c => c.id === pathId);
          return (
            <path
              key={`particle-${pathId}`}
              className={`particle-${pathId}`}
              d={getPathData(conn)}
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{ mixBlendMode: 'screen' }}
            />
          );
        })}

        {/* 2 & 3. Nodes and Glows */}
        {NODES.map(node => (
          <g key={node.id} className="network-node group cursor-crosshair">
            
            {/* Interactive Hover Glow Background */}
            <circle 
              cx={node.cx} 
              cy={node.cy} 
              r={node.r * 5} 
              fill={node.color}
              className="opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              filter="url(#glow)"
            />

            {/* Continuous Pulse Glow */}
            <circle 
              cx={node.cx} 
              cy={node.cy} 
              r={node.r} 
              fill={node.color}
              className={`node-glow-${node.id}`}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            />

            {/* Core Solid Node */}
            <circle 
              cx={node.cx} 
              cy={node.cy} 
              r={node.r} 
              fill={node.color}
              className={`node-core-${node.id} transition-all duration-300 group-hover:scale-125 group-hover:fill-white`}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
              filter={node.isAccent ? "url(#glow)" : ""}
            />

            {/* Inner Dot for large nodes */}
            {node.r >= 8 && (
              <circle 
                cx={node.cx} 
                cy={node.cy} 
                r={node.r / 3} 
                fill={node.isAccent ? '#fff' : '#0a0f18'}
              />
            )}
          </g>
        ))}

      </svg>
    </div>
  );
}
