"use client";

import { ChevronDown } from "lucide-react";

function Unit({ value, label, themeColor }) {
  return (
    <div className="text-center py-3">
      <p
        className="font-display text-3xl sm:text-4xl tabular-nums font-semibold text-[var(--wedding-ink)]"
        style={{ color: themeColor }}
      >
        {String(value).padStart(2, "0")}
      </p>
      <p className="text-[11px] text-stone-400 mt-1 tracking-wide">{label}</p>
    </div>
  );
}

export default function Countdown({ timeLeft, countdownDate, themeColor }) {
  const dateLabel =
    countdownDate &&
    new Date(countdownDate).toLocaleDateString("ar-TN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <section className="invitation-section min-h-[100dvh] flex flex-col justify-between py-16 px-6 bg-[var(--wedding-mist)] text-[var(--wedding-ink)]">
      <div className="my-auto max-w-sm mx-auto w-full space-y-10">
        <div className="text-center space-y-3 animate-fade-up">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            Countdown
          </p>
          <h2 className="font-arabic-display text-3xl font-bold">
            العدّ التنازلي
          </h2>
          <p className="text-sm text-stone-500">لحظات تفصلنا عن يوم الفرح</p>
          <div className="ornament-line" />
        </div>

        <div
          className="grid grid-cols-4 divide-x divide-stone-200/80 border-y border-stone-200/80"
          style={{ direction: "ltr" }}
        >
          <Unit value={timeLeft.days} label="يوم" themeColor={themeColor} />
          <Unit value={timeLeft.hours} label="ساعة" themeColor={themeColor} />
          <Unit value={timeLeft.minutes} label="دقيقة" themeColor={themeColor} />
          <Unit value={timeLeft.seconds} label="ثانية" themeColor={themeColor} />
        </div>

        {dateLabel && (
          <p className="text-center text-sm text-stone-500 animate-fade-up delay-100">
            {dateLabel}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center gap-1 text-stone-400">
        <p className="text-[10px] tracking-[0.25em] uppercase">البرنامج</p>
        <ChevronDown className="animate-bounce" size={18} style={{ color: themeColor }} />
      </div>
    </section>
  );
}
