import React, { useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function LetsWorkTogether() {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    if (isClicked) return;
    setIsClicked(true)
    
    // Wait for explosion to cover more screen before scrolling
    setTimeout(() => {
      document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
    
    // Reset state after scrolling
    setTimeout(() => setIsClicked(false), 1500)
  }

  return (
    <section className="flex min-h-[85vh] lg:min-h-screen items-center justify-center px-6 bg-slate-50 relative overflow-hidden">
      
      {/* Optional subtle background grid or gradients for the hero */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative flex flex-col items-center gap-12 z-10 pt-20">

        <div className="flex items-center gap-3 transition-all duration-500">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">
            Available for projects
          </span>
        </div>

        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <div 
            className="flex flex-col items-center gap-6"
            style={{
              transform: isClicked ? "translateY(-60px) scale(1.1)" : "none",
              opacity: isClicked ? 0 : 1,
              filter: isClicked ? "blur(12px)" : "blur(0px)",
              transition: "all 800ms cubic-bezier(0.16,1,0.3,1)"
            }}
          >
            <h2 className="relative text-center text-5xl font-light tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <span className="block overflow-hidden pb-4 -mb-4">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isHovered ? "translateY(-8%)" : "translateY(0)",
                  }}
                >
                  <span className="pb-2 block">Let's work</span>
                </span>
              </span>
              <span className="block overflow-hidden pb-4 -mb-4">
                <span
                  className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                  style={{
                    transform: isHovered ? "translateY(-8%)" : "translateY(0)",
                  }}
                >
                  <span className="logo-text-gradient pb-2">together</span>
                </span>
              </span>
            </h2>

            <div className="relative mt-4 flex w-16 h-16 items-center justify-center sm:w-20 sm:h-20">
              {/* Shockwave Ring */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full border-2 transition-all"
                style={{
                  borderColor: (isHovered || isClicked) ? "#0f172a" : "#e2e8f0",
                  transform: isClicked ? "scale(200)" : "scale(1)",
                  opacity: isClicked ? 0 : (isHovered ? 0.3 : 0),
                  transitionDuration: isClicked ? "1500ms" : "500ms",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
                }}
              />
              
              {/* Main Expanding Circle */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full border transition-all"
                style={{
                  borderColor: (isHovered || isClicked) ? "#0f172a" : "#e2e8f0",
                  backgroundColor: (isHovered || isClicked) ? "#0f172a" : "transparent",
                  transform: isClicked ? "scale(150)" : (isHovered ? "scale(1.1)" : "scale(1)"),
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "1000ms" : "500ms",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
                }}
              />
              <ArrowUpRight
                className="w-6 h-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:w-7 sm:h-7"
                style={{
                  transform: isClicked ? "translate(300px, -300px) scale(3) rotate(90deg)" : (isHovered ? "translate(4px, -4px)" : "translate(0, 0)"),
                  color: (isHovered || isClicked) ? "#ffffff" : "#0f172a",
                  opacity: isClicked ? 0 : 1,
                  transitionDuration: isClicked ? "800ms" : "500ms",
                }}
              />
            </div>
          </div>

          <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
            <div
              className="h-px w-8 bg-slate-300 transition-all duration-500 sm:w-16"
              style={{
                transform: isHovered ? "scaleX(1.5)" : "scaleX(1)",
                opacity: isHovered ? 1 : 1,
              }}
            />
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
            <div
              className="h-px w-8 bg-slate-300 transition-all duration-500 sm:w-16"
              style={{
                transform: isHovered ? "scaleX(1.5)" : "scaleX(1)",
                opacity: isHovered ? 1 : 1,
              }}
            />
          </div>
        </div>

        <div 
          className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
          style={{
             transform: isClicked ? "translateY(40px) scale(0.9)" : "none",
             opacity: isClicked ? 0 : 1,
             filter: isClicked ? "blur(8px)" : "blur(0px)",
          }}
        >
          <p className="max-w-md text-sm leading-relaxed text-slate-500">
            Tell us what you're building, securing, or connecting. Let's create something exceptional together.
          </p>
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">info@smartfixsolutions.co.in</span>
        </div>
      </div>
    </section>
  )
}
