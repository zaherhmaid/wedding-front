"use client";

import { ChevronDown } from "lucide-react";

export default function Hero({ wedding, hasParents, themeColor }) {
  return (
    <section className="invitation-section relative min-h-[100dvh] flex flex-col text-white overflow-hidden">
      {/* Full-bleed visual */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1400"
          alt=""
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/90" />
      </div>

      <div className="relative z-10 flex flex-col min-h-[100dvh] px-6 pt-12 pb-10">
        {/* Brand signal */}
        <div className="text-center animate-fade-up">
          <p className="font-display text-sm tracking-[0.35em] uppercase text-[var(--wedding-gold-soft)]/70">
            Invetini
          </p>
        </div>

        {/* Main composition */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-8">
          <p className="text-sm text-white/65 mb-6 animate-fade-up delay-100">
            تتشرف عائلتا
          </p>

          {hasParents && (
            <div className="w-full max-w-sm grid grid-cols-2 gap-x-6 gap-y-4 mb-8 animate-fade-up delay-200">
              <ParentNames
                label="عائلة العريس"
                father={wedding?.groom_father_name}
                mother={wedding?.groom_mother_name}
              />
              <ParentNames
                label="عائلة العروس"
                father={wedding?.bride_father_name}
                mother={wedding?.bride_mother_name}
              />
            </div>
          )}

          <p className="text-xs text-white/50 mb-6 animate-fade-up delay-200">
            بدعوتكم لحضور حفل زفاف نجليهما
          </p>

          <div className="ornament-line mb-5" />

          <h1 className="font-arabic-display text-4xl sm:text-5xl font-bold leading-tight animate-fade-up delay-300">
            <span
              style={{
                background: `linear-gradient(135deg, #f3e6c8, ${themeColor}, #9a7428)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {wedding?.groom_name}
            </span>
          </h1>
          <p
            className="font-display text-3xl italic my-2 animate-fade-up delay-300"
            style={{ color: themeColor }}
          >
            &
          </p>
          <h1 className="font-arabic-display text-4xl sm:text-5xl font-bold leading-tight animate-fade-up delay-300">
            <span
              style={{
                background: `linear-gradient(135deg, #f3e6c8, ${themeColor}, #9a7428)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {wedding?.bride_name}
            </span>
          </h1>

          <div className="ornament-line mt-5" />
        </div>

        <div className="flex flex-col items-center gap-1 text-white/40 animate-fade-in delay-300">
          <p className="text-[10px] tracking-[0.3em] uppercase">اسحب للأسفل</p>
          <ChevronDown className="animate-bounce" size={20} style={{ color: themeColor }} />
        </div>
      </div>
    </section>
  );
}

function ParentNames({ label, father, mother }) {
  if (!father && !mother) return null;

  return (
    <div className="text-center space-y-1.5">
      <p className="text-[10px] tracking-[0.2em] uppercase text-white/40">
        {label}
      </p>
      {father && (
        <p className="text-sm text-white/90 leading-snug">
          <span className="block text-[10px] text-white/45 mb-0.5">السيد</span>
          {father}
        </p>
      )}
      {mother && (
        <p className="text-sm text-white/90 leading-snug">
          <span className="block text-[10px] text-white/45 mb-0.5">والسيدة</span>
          {mother}
        </p>
      )}
    </div>
  );
}
