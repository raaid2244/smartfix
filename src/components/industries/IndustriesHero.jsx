import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionEyebrow from "../SectionEyebrow";

gsap.registerPlugin(ScrollTrigger);

export default function IndustriesHero() {
  const sectionRef    = useRef(null);
  const bgRef         = useRef(null);
  const eyebrowRef    = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const titleLine3Ref = useRef(null);
  const paraRef       = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    let ctx = gsap.context(() => {
      // ── Subtle cinematic background parallax on scroll ──
      if (bgRef.current) {
        gsap.fromTo(bgRef.current,
          { scale: 1.06 },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            }
          }
        );
      }

      // ── Eyebrow + heading entrance ──
      const eyebrowLeft  = eyebrowRef.current?.querySelector(".eyebrow-left-line");
      const eyebrowText  = eyebrowRef.current?.querySelector(".eyebrow-text");
      const eyebrowRight = eyebrowRef.current?.querySelector(".eyebrow-right-line");

      gsap.set(eyebrowLeft,  { scaleX: 0 });
      gsap.set(eyebrowText,  { opacity: 0, y: 12 });
      gsap.set(eyebrowRight, { scaleX: 0 });

      gsap.set([titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current], { y: "120%" });
      gsap.set(paraRef.current, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.2 });

      // Eyebrow reveal
      if (eyebrowLeft)  tl.to(eyebrowLeft,  { scaleX: 1, duration: 0.6, ease: "power2.out" });
      if (eyebrowText)  tl.to(eyebrowText,  { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
      if (eyebrowRight) tl.to(eyebrowRight, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");

      // Title lines staggered
      tl.to(titleLine1Ref.current, { y: "0%", duration: 1.1, ease: "power4.out" }, "-=0.8");
      tl.to(titleLine2Ref.current, { y: "0%", duration: 1.1, ease: "power4.out" }, "-=0.95");
      tl.to(titleLine3Ref.current, { y: "0%", duration: 1.1, ease: "power4.out" }, "-=0.95");

      // Paragraph
      tl.to(paraRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.7");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* ═══ FULL-BLEED BACKGROUND ═══ */}
      <div className="absolute inset-0 w-full h-full bg-white" />

      {/* Image layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/hero2.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          transformOrigin: "right center",
          willChange: "transform",
        }}
      />

      {/* ═══ CONTENT ═══ */}
      <div
        className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-16"
        style={{ paddingTop: "9rem", paddingBottom: "8rem" }}
      >
        {/* Text constrained to the white left zone (~38% of width) */}
        <div className="max-w-[38%] xl:max-w-[36%] 2xl:max-w-[34%]">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-8">
            <span className="eyebrow-left-line w-8 h-[1px] bg-blue-600 block origin-left" />
            <span className="eyebrow-text text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-slate-500">INDUSTRIES WE SERVE</span>
            <span className="eyebrow-right-line w-8 h-[1px] bg-blue-600 block origin-left" />
          </div>

          {/* Main heading */}
          <h1
            className="font-black uppercase tracking-tight leading-[0.9] mb-8"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <div className="overflow-hidden pb-3">
              <div
                ref={titleLine1Ref}
                className="text-slate-950"
                style={{ fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              >
                TRUSTED
              </div>
            </div>
            <div className="overflow-hidden pb-3">
              <div
                ref={titleLine2Ref}
                className="text-slate-950"
                style={{ fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              >
                ACROSS
              </div>
            </div>
            <div className="overflow-hidden pb-3">
              <div
                ref={titleLine3Ref}
                className="logo-text-gradient"
                style={{ fontSize: "clamp(3.2rem, 5.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
              >
                SECTORS.
              </div>
            </div>
          </h1>

          {/* Supporting paragraph */}
          <div
            ref={paraRef}
            className="border-l-2 border-blue-600 pl-6 ml-1"
          >
            <p
              className="text-slate-600 font-light leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", maxWidth: "38rem" }}
            >
              We engineer mission-critical infrastructure tailored to the
              unique operational and compliance requirements of
              diverse commercial environments.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
