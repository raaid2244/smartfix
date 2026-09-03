import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 25 });
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 pointer-events-none">
      <span className="font-mono text-[10px] font-bold text-slate-500 tracking-wider">
        {percent}%
      </span>
      <div className="w-[3px] h-32 bg-slate-200/80 rounded-full overflow-hidden relative shadow-inner">
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="w-full h-full bg-gradient-to-b from-cyan-500 via-blue-600 to-indigo-600 rounded-full"
        />
      </div>
      <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest rotate-90 origin-center translate-y-4">
        STORY
      </span>
    </div>
  );
}
