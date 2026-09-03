import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export function CoverflowCarousel({
  items = [],
  sectionLabel = "OUR EXPERTISE",
  autoplay = true,
  autoplayDelay = 5000,
  className = "",
  onCtaClick,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx) => {
    setCurrentIndex(idx % total);
  };

  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, nextSlide, total]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className={`relative w-full min-h-[900px] flex items-center justify-center overflow-hidden py-24 select-none bg-black ${className}`}
      style={{
        color: "#ffffff",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={items[currentIndex]?.img}
          alt="ambience background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.2) blur(40px)",
            transform: "scale(1.15)",
            transition: "opacity 1000ms ease, filter 1000ms ease",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.98) 100%)",
          }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 z-10 flex flex-col items-center">
        {/* Eyebrow */}
        {sectionLabel && (
          <div className="flex items-center gap-3 mb-10">
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, transparent, #3b82f6)" }} />
            <h3
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#60a5fa",
                margin: 0,
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {sectionLabel}
            </h3>
            <span style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
          </div>
        )}

        {/* 3D Coverflow Stage */}
        <div
          className="relative w-full h-[620px] flex justify-center items-center mb-12"
          style={{ perspective: "1400px" }}
        >
          {items.map((item, idx) => {
            const offset = (idx - currentIndex + total) % total;

            let transform = "translateX(0px) scale(0.4) rotateY(0deg)";
            let opacity = 0;
            let zIndex = 0;
            let filter = "brightness(0.4) blur(2px)";
            let isCenter = false;

            if (offset === 0) {
              isCenter = true;
              transform = "translateX(0px) scale(1) rotateY(0deg)";
              opacity = 1;
              zIndex = 30;
              filter = "brightness(1)";
            } else if (offset === 1) {
              transform = "translateX(350px) scale(0.84) rotateY(-24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === 2) {
              transform = "translateX(620px) scale(0.68) rotateY(-38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            } else if (offset === total - 1) {
              transform = "translateX(-350px) scale(0.84) rotateY(24deg)";
              opacity = 0.65;
              zIndex = 20;
              filter = "brightness(0.75)";
            } else if (offset === total - 2) {
              transform = "translateX(-620px) scale(0.68) rotateY(38deg)";
              opacity = 0.38;
              zIndex = 10;
              filter = "brightness(0.55) blur(1px)";
            }

            return (
              <div
                key={idx}
                onClick={() => !isCenter && goToSlide(idx)}
                style={{
                  position: "absolute",
                  width: "400px",
                  height: "600px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "#000000",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  transform,
                  opacity,
                  zIndex,
                  filter,
                  transformOrigin: "center center",
                  transition: "all 800ms cubic-bezier(0.25, 1, 0.5, 1)",
                  boxShadow: isCenter
                    ? "0 25px 60px rgba(0,0,0,0.6), 0 0 35px rgba(0,195,255,0.15)"
                    : "0 15px 35px rgba(0,0,0,0.5)",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* Photo */}
                <img
                  src={item.img}
                  alt={item.titleLine1}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.98) 100%)",
                    pointerEvents: "none",
                    zIndex: 10,
                  }}
                />

                {/* Content Overlay */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    padding: "24px 20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textAlign: "center",
                    zIndex: 20,
                    opacity: isCenter ? 1 : 0,
                    transform: isCenter ? "translateY(0px)" : "translateY(16px)",
                    transition: "opacity 500ms ease, transform 500ms ease",
                    pointerEvents: isCenter ? "auto" : "none",
                  }}
                >
                  {/* Tag removed */}

                  {/* Body Content */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "auto",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "1.75rem",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.1,
                      }}
                    >
                      {item.titleLine1}
                    </h2>

                    {item.titleLine2 && (
                      <span
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          color: "#94a3b8", // slate-400
                          lineHeight: 1.2,
                        }}
                      >
                        {item.titleLine2}
                      </span>
                    )}

                    <div
                      style={{
                        width: "40px",
                        height: "2px",
                        background: "linear-gradient(90deg, #00c3ff, #2563eb)",
                        borderRadius: "2px",
                        margin: "8px auto",
                      }}
                    />

                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "#cbd5e1", // slate-300
                          maxWidth: "280px",
                          margin: "0 0 16px",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.desc}
                      </p>
                    )}

                    <a
                      href={item.ctaUrl || "#"}
                      onClick={(e) => {
                        if (onCtaClick) {
                          e.preventDefault();
                          onCtaClick(item);
                        }
                      }}
                      className="group/cta"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 20px",
                        borderRadius: "9999px",
                        background: "linear-gradient(135deg, #00c3ff 0%, #2563eb 100%)",
                        color: "#ffffff",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0, 195, 255, 0.3)",
                        cursor: "pointer",
                        transition: "all 300ms ease",
                      }}
                    >
                      <span>{item.ctaText || "LEARN MORE"}</span>
                      <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous dish"
          className="hover:bg-blue-600/20 hover:border-blue-500/50"
          style={{
            position: "absolute",
            left: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            zIndex: 40,
            transition: "all 300ms ease",
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next dish"
          className="hover:bg-blue-600/20 hover:border-blue-500/50"
          style={{
            position: "absolute",
            right: "40px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(12px)",
            cursor: "pointer",
            zIndex: 40,
            transition: "all 300ms ease",
          }}
        >
          <ChevronRight size={24} />
        </button>

        {/* Pagination Dots */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 30 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "6px",
                width: idx === currentIndex ? "24px" : "6px",
                borderRadius: "9999px",
                backgroundColor: idx === currentIndex ? "#3b82f6" : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                boxShadow: idx === currentIndex ? "0 0 10px rgba(59,130,246,0.5)" : "none",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoverflowCarousel;
