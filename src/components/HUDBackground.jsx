import React, { useEffect, useState } from 'react';

export default function HUDBackground() {
  const [time, setTime] = useState('');
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2));
    };
    updateTime();
    const interval = setInterval(updateTime, 100);

    const pingInterval = setInterval(() => {
      setPing(Math.floor(10 + Math.random() * 6));
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Base Dark Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30" />
      <div className="absolute inset-0 bg-radial-vignette opacity-90" />

      {/* Animated Subtle Vertical & Horizontal Scanlines */}
      <div className="absolute inset-0 scanline-overlay opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-scanline" />

      {/* Top Left Telemetry Display */}
      <div className="hidden lg:flex fixed top-24 left-6 z-10 flex-col gap-1 text-[10px] font-mono text-slate-500 tracking-widest opacity-60">
        <div className="flex items-center gap-2 text-cyan-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>SYS.ONLINE // 24.7.365</span>
        </div>
        <div>UTC_TIME: <span className="text-slate-300">{time || '00:00:00.00'}</span></div>
        <div>NODE_LATENCY: <span className="text-amber-400/90">{ping}ms</span></div>
        <div>GRID: 13.0827° N, 80.2707° E</div>
      </div>

      {/* Bottom Right Floating Coordinates */}
      <div className="hidden lg:flex fixed bottom-8 right-6 z-10 flex-col items-end gap-1 text-[10px] font-mono text-slate-500 tracking-widest opacity-60">
        <div className="flex items-center gap-1.5 text-amber-500/80">
          <span className="w-1.5 h-1.5 bg-amber-500" />
          <span>ENCRYPTION: AES-256</span>
        </div>
        <div>HQ_CHN // SYSTEM INTEGRATION</div>
        <div>SEC_FEED: ACTIVE_MONITORING</div>
      </div>

      {/* Corner HUD Decorative Align Marks */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
    </div>
  );
}
