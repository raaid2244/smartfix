import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, Warehouse, Store, Factory, ShieldCheck, 
  Camera, Network, Flame, KeyRound, ArrowRight, CheckCircle2, RefreshCw, Radio 
} from 'lucide-react';
import SmartFixTitle from './SmartFixTitle';

const facilityTypes = [
  { id: 'office', name: 'Corporate Office', icon: Building2, defaultSqft: 5000 },
  { id: 'warehouse', name: 'Warehouse & Logistics', icon: Warehouse, defaultSqft: 25000 },
  { id: 'retail', name: 'Retail Store / Chain', icon: Store, defaultSqft: 3000 },
  { id: 'industrial', name: 'Manufacturing Plant', icon: Factory, defaultSqft: 40000 },
];

const serviceChecklist = [
  { id: 'cctv', label: 'CCTV Surveillance & 4K Recording', icon: Camera, baseRatio: 800 },
  { id: 'access', label: 'Biometric Access Control & Turnstiles', icon: KeyRound, baseRatio: 1500 },
  { id: 'network', label: 'Structured Cabling & Wi-Fi Access Points', icon: Network, baseRatio: 600 },
  { id: 'fire', label: 'Fire Alarm & Public Address (PA) System', icon: Flame, baseRatio: 1200 },
];

export default function SolutionEstimator() {
  const [selectedFacility, setSelectedFacility] = useState(facilityTypes[0].id);
  const [areaSqft, setAreaSqft] = useState(10000);
  const [selectedServices, setSelectedServices] = useState(['cctv', 'access', 'network', 'fire']);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Calculations
  const calculatedCamCount = Math.max(4, Math.ceil(areaSqft / 800));
  const calculatedDoorCount = Math.max(2, Math.ceil(areaSqft / 1800));
  const calculatedNetworkNodes = Math.max(8, Math.ceil(areaSqft / 500));

  return (
    <div className="hud-box glass-panel-light p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden my-12">
      {/* Background Animated Scanning Beams */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 font-mono text-xs font-bold uppercase tracking-widest shadow-sm">
          <Radio className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
          <span>INTERACTIVE SYSTEM ESTIMATOR</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
          CONFIGURE YOUR INTEGRATION SPECIFICATIONS
        </h3>

        <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
          Select your facility parameters below to receive an instant recommended hardware sizing & survey report.
        </p>
      </div>

      {/* Step 1: Select Facility Type */}
      <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
        <div>
          <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
            STEP 1: SELECT FACILITY TYPE
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {facilityTypes.map((fac) => {
              const Icon = fac.icon;
              const isSelected = selectedFacility === fac.id;
              return (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  key={fac.id}
                  onClick={() => {
                    setSelectedFacility(fac.id);
                    setAreaSqft(fac.defaultSqft);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-28 ${
                    isSelected
                      ? 'bg-gradient-to-br from-slate-900 to-slate-950 text-white border-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span className="font-sans font-bold text-xs sm:text-sm leading-snug">
                    {fac.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Slider for Sqft */}
        <div className="bg-white/80 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              STEP 2: ESTIMATED FACILITY AREA (SQ. FT.)
            </label>
            <span className="font-mono text-lg font-extrabold text-cyan-700 bg-cyan-50 px-4 py-1 rounded-full border border-cyan-200">
              {areaSqft.toLocaleString()} SQ. FT.
            </span>
          </div>

          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={areaSqft}
            onChange={(e) => setAreaSqft(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="flex justify-between font-mono text-[10px] text-slate-400">
            <span>1,000 SQFT (BOUTIQUE)</span>
            <span>50,000 SQFT (ENTERPRISE)</span>
            <span>100,000+ SQFT (PLANT / LOGISTICS)</span>
          </div>
        </div>

        {/* Step 3: Required Service Lines */}
        <div>
          <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
            STEP 3: CHOOSE SECURITY & INFRASTRUCTURE MODULES
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {serviceChecklist.map((service) => {
              const ServiceIcon = service.icon;
              const isChecked = selectedServices.includes(service.id);
              return (
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-cyan-950/90 text-white border-cyan-400/80 shadow-md'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isChecked ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-100 text-slate-500'}`}>
                      <ServiceIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold">{service.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-300'}`}>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Live Calculation Output Dashboard */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>RECOMMENDED HARDWARE TELEMETRY</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold font-sans">
                  Sizing Matrix for {areaSqft.toLocaleString()} Sq. Ft. Facility
                </div>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-full border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>100% SPEC COMPLIANCE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 text-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-400">{calculatedCamCount}</div>
                <div className="text-[11px] font-mono text-slate-300 mt-1 uppercase font-semibold">4K IP CAMERAS</div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">360° Night Vision</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400">{calculatedDoorCount}</div>
                <div className="text-[11px] font-mono text-slate-300 mt-1 uppercase font-semibold">BIOMETRIC DOORS</div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">Card + RFID Access</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-orange-400">{calculatedNetworkNodes}</div>
                <div className="text-[11px] font-mono text-slate-300 mt-1 uppercase font-semibold">CAT6 / FIBER DROPS</div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">Gigabit Mesh Ready</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-rose-400">1</div>
                <div className="text-[11px] font-mono text-slate-300 mt-1 uppercase font-semibold">CENTRAL CONTROL RACK</div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">NVR + Battery Backup</div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="text-xs text-slate-300 font-mono text-center sm:text-left">
                Direct deployment team ready in Chennai, Singapore & Malaysia.
              </div>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-amber-500 to-orange-500 hover:from-cyan-400 hover:to-pink-500 text-slate-950 font-mono font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,195,255,0.4)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                <span>REQUEST OFFICIAL SITE SURVEY</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
