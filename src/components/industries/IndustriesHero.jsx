import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="relative w-full overflow-hidden flex items-center lg:min-h-screen"
    >
      {/* ═══ FULL-BLEED WHITE BASE ═══ */}
      <div className="absolute inset-0 w-full h-full bg-white" />

      {/* ═══ BACKGROUND IMAGE — desktop only ═══ */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full hidden lg:block"
        style={{
          backgroundImage: "url('/hero2.png')",
          backgroundSize: "cover",
          backgroundPosition: "right center",
          transformOrigin: "right center",
          willChange: "transform",
        }}
      />
      {/* Desktop: white left-side fade for text column */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent hidden lg:block" />

      {/* ═══ MOBILE IMAGE — absolute right half ═══ */}
      <div className="lg:hidden absolute top-0 right-0 bottom-0 w-full overflow-hidden">
        <img
          src="/hero2.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Fade left edge into white */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.6) 30%, transparent 70%)' }} />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div
        className="relative z-10 w-full max-w-[90rem] mx-auto px-6 lg:px-16
                   pt-28 pb-12
                   md:pt-32 md:pb-16
                   lg:pt-[9rem] lg:pb-[8rem]"
      >
        {/* Text block — full width on mobile, 60% on tablet, 38% on desktop */}
        <div className="max-w-full md:max-w-[60%] lg:max-w-[38%] xl:max-w-[36%] 2xl:max-w-[34%]">

          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="eyebrow-left-line w-8 h-[1px] bg-blue-600 block origin-left flex-shrink-0" />
            <span className="eyebrow-text text-[11px] font-mono font-bold tracking-[0.25em] uppercase text-slate-500 whitespace-nowrap">
              INDUSTRIES WE SERVE
            </span>
            <span className="eyebrow-right-line w-8 h-[1px] bg-blue-600 block origin-left flex-shrink-0" />
          </div>

          {/* Main heading */}
          <h1
            className="font-black uppercase tracking-tight leading-[0.9] mb-6 md:mb-8"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <div className="overflow-hidden pb-2 md:pb-3">
              <div
                ref={titleLine1Ref}
                className="text-slate-950 ind-hero-title"
                style={{ letterSpacing: "-0.02em" }}
              >
                TRUSTED
              </div>
            </div>
            <div className="overflow-hidden pb-2 md:pb-3">
              <div
                ref={titleLine2Ref}
                className="text-slate-950 ind-hero-title"
                style={{ letterSpacing: "-0.02em" }}
              >
                ACROSS
              </div>
            </div>
            <div className="overflow-hidden pb-2 md:pb-3">
              <div
                ref={titleLine3Ref}
                className="logo-text-gradient ind-hero-title"
                style={{ letterSpacing: "-0.02em" }}
              >
                SECTORS.
              </div>
            </div>
          </h1>

          {/* Supporting paragraph */}
          <div
            ref={paraRef}
            className="border-l-2 border-blue-600 pl-5 md:pl-6 ml-1"
          >
            <p
              className="text-slate-600 font-light leading-relaxed"
              style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.2rem)", maxWidth: "38rem" }}
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
