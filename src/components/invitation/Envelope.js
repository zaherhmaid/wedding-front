"use client";

import { Heart } from "lucide-react";

export default function Envelope({ wedding, themeColor, isOpened, onOpen }) {
  return (
    <div
      className={`relative w-full max-w-md h-[92dvh] mx-4 overflow-hidden transition-all duration-700 ${
        isOpened
          ? "scale-[0.97] opacity-0 pointer-events-none"
          : "scale-100 opacity-100"
      }`}
      style={{
        borderRadius: "1.75rem",
        background:
          "linear-gradient(160deg, #1a1612 0%, #2a241c 48%, #15120f 100%)",
        boxShadow: `0 30px 80px -24px ${themeColor}55`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${themeColor}35 0%, transparent 42%), radial-gradient(circle at 75% 75%, ${themeColor}20 0%, transparent 40%)`,
        }}
      />

      {/* Doors */}
      <div
        className={`absolute inset-y-0 start-0 w-1/2 z-10 ${
          isOpened ? "animate-doors-left" : ""
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.03), transparent)",
          borderInlineEnd: `1px solid ${themeColor}22`,
        }}
      />
      <div
        className={`absolute inset-y-0 end-0 w-1/2 z-10 ${
          isOpened ? "animate-doors-right" : ""
        }`}
        style={{
          background:
            "linear-gradient(-90deg, rgba(255,255,255,0.03), transparent)",
          borderInlineStart: `1px solid ${themeColor}22`,
        }}
      />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--wedding-gold-soft)]/50 mb-3 animate-fade-up">
          Invetini
        </p>
        <p className="font-display text-2xl text-white/90 italic animate-fade-up delay-100">
          {wedding?.groom_name}
          <span className="mx-2 not-italic opacity-60" style={{ color: themeColor }}>
            &
          </span>
          {wedding?.bride_name}
        </p>

        <div className="ornament-line my-8" />

        <button
          type="button"
          onClick={onOpen}
          className={`seal-pulse relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-transform duration-500 z-30 hover:scale-105 active:scale-95 ${
            isOpened ? "scale-0 opacity-0" : "scale-100"
          }`}
          style={{
            background: `linear-gradient(145deg, ${themeColor}, ${themeColor}bb)`,
            boxShadow: `0 14px 36px ${themeColor}55`,
          }}
          aria-label="فتح الدعوة"
        >
          <div className="absolute inset-[10px] rounded-full border border-dashed border-white/40" />
          <Heart className="text-white mb-1" size={26} fill="#fff" />
          <span className="text-[10px] font-bold text-white tracking-[0.18em]">
            افتح
          </span>
        </button>

        <p className="mt-8 text-xs tracking-[0.25em] text-white/30 animate-fade-up delay-200">
          اضغط لفتح الدعوة
        </p>
      </div>
    </div>
  );
}
