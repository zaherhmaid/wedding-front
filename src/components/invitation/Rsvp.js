"use client";

import { Check, Heart, X } from "lucide-react";

export default function Rsvp({
  guestName,
  rsvpStatus,
  isSubmitting,
  themeColor,
  onAction,
}) {
  return (
    <section className="invitation-section min-h-[100dvh] flex flex-col justify-center px-6 py-16 bg-[var(--wedding-mist)] text-[var(--wedding-ink)]">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center space-y-3">
          <Heart
            size={24}
            className="mx-auto"
            fill={themeColor}
            style={{ color: themeColor }}
          />
          <h2 className="font-arabic-display text-3xl font-bold">
            تأكيد الحضور
          </h2>
          <p className="text-sm text-stone-500">
            نرجو منكم تأكيد حضوركم في أقرب وقت
          </p>
          <div className="ornament-line" />
        </div>

        <div className="rounded-[1.75rem] border border-stone-200/80 bg-white p-6 sm:p-7 shadow-[0_12px_40px_-20px_rgba(18,16,14,0.25)]">
          <div className="pb-5 mb-5 border-b border-stone-100 text-center">
            <p className="text-[11px] tracking-[0.2em] uppercase text-stone-400 mb-2">
              دعوة موجهة لـ
            </p>
            <h3 className="font-arabic-display text-2xl font-bold">
              {guestName || "ضيفنا الكريم"}
            </h3>
          </div>

          {rsvpStatus === "pending" ? (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onAction("confirmed")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 text-white font-semibold py-3.5 rounded-2xl text-sm transition active:scale-[0.98] disabled:opacity-50"
                style={{ backgroundColor: themeColor }}
              >
                <Check size={16} />
                حضور
              </button>
              <button
                type="button"
                onClick={() => onAction("declined")}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3.5 rounded-2xl text-sm transition active:scale-[0.98] disabled:opacity-50"
              >
                <X size={16} />
                اعتذار
              </button>
            </div>
          ) : (
            <div
              className={`rounded-2xl border px-4 py-4 flex items-center gap-3 ${
                rsvpStatus === "confirmed"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-900"
                  : "bg-stone-50 border-stone-200 text-stone-600"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white ${
                  rsvpStatus === "confirmed" ? "bg-emerald-600" : "bg-stone-400"
                }`}
              >
                {rsvpStatus === "confirmed" ? (
                  <Check size={16} />
                ) : (
                  <X size={16} />
                )}
              </div>
              <p className="flex-1 text-sm font-bold text-start">
                {rsvpStatus === "confirmed"
                  ? "تم تأكيد الحضور بنجاح"
                  : "تم الاعتذار عن الحضور"}
              </p>
              <button
                type="button"
                onClick={() => onAction("pending")}
                disabled={isSubmitting}
                className="text-xs font-bold underline shrink-0 disabled:opacity-50"
                style={{ color: themeColor }}
              >
                تعديل
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
