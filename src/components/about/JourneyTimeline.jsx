import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Award, Globe, Shield, Network, Compass, Sparkles } from 'lucide-react';

const timelineSteps = [
  {
    id: "01",
    title: "11+ YEARS ENTERPRISE INTEGRATION",
    highlight: "Over 11 Years Experience",
    desc: "Developing expertise in designing, implementing and maintaining reliable security and networking systems for businesses of every size.",
    icon: Award,
    accent: "from-cyan-500 to-blue-600",
  },
  {
    id: "02",
    title: "INTERNATIONAL FIELD EXPOSURE",
    highlight: "Singapore & Malaysia Projects",
    desc: "International exposure managing complex security infrastructure deployments built to international standards.",
    icon: Globe,
    accent: "from-blue-600 to-indigo-600",
  },
  {
    id: "03",
    title: "END-TO-END SYSTEM INTEGRATION",
    highlight: "9 Integrated Service Lines",
    desc: "Complete design, supply, installation, testing, commissioning and maintenance under one roof.",
    icon: Shield,
    accent: "from-indigo-600 to-violet-600",
  },
  {
    id: "04",
    title: "CROSS-SECTOR DEPLOYMENTS",
    highlight: "10+ Corporate Sectors Served",
    desc: "Securing offices, retail chains, logistics centers, industrial plants, healthcare, and commercial facilities.",
    icon: Network,
    accent: "from-violet-600 to-cyan-500",
  },
];

export default function JourneyTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 120, damping: 22 });

  return (
    <section ref={containerRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-white border-t border-slate-100 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="block h-px w-8 bg-cyan-500 flex-shrink-0" />
            <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500">
              PROGRESSION & CAPABILITIES&nbsp;&nbsp;//&nbsp;&nbsp;JOURNEY
            </span>
            <span className="block h-px w-8 bg-cyan-500 flex-shrink-0" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.02]">
            <span className="text-slate-900">PROVEN TRACK RECORD & </span>
            <span className="logo-text-gradient">JOURNEY</span>
          </h2>

          <p className="text-slate-600 font-sans text-xl sm:text-2xl leading-relaxed font-normal max-w-2xl mx-auto mt-6">
            A continuous commitment to quality, scalable infrastructure, and operational excellence.
          </p>
        </div>

        {/* Timeline Path Stage */}
        <div className="relative">
          
          {/* Vertical Progress Line for Desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2.5px] bg-slate-100 hidden md:block">
            <motion.div
              style={{ scaleY: pathLength, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-cyan-500 via-blue-600 via-indigo-600 to-violet-600"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-24 relative z-10">
            {timelineSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.3, once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  key={step.id}
                  className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-1/2">
                    <motion.div 
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-[0_15px_40px_-15px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_50px_-15px_rgba(14,165,233,0.15)] hover:border-cyan-400 transition-all duration-300 relative group"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-xs font-black text-cyan-600 bg-cyan-50 px-3.5 py-1 rounded-xl border border-cyan-200">
                          STAGE {step.id}
                        </span>
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${step.accent} text-white shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-sans mb-1.5 tracking-tight">
                        {step.title}
                      </h3>

                      <div className="text-xs font-mono font-bold text-indigo-600 mb-3 tracking-wide">
                        {step.highlight}
                      </div>

                      <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Node Marker */}
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-cyan-500 shadow-xl flex items-center justify-center font-mono text-xs font-black text-slate-900 flex-shrink-0 z-20">
                    {step.id}
                  </div>

                  {/* Spacer Column */}
                  <div className="w-full md:w-1/2 hidden md:block" />

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

