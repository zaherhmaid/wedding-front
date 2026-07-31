"use client";

import { X } from "lucide-react";

export default function MapSheet({ event, themeColor, onClose }) {
  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-end justify-center"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md bg-[var(--wedding-mist)] rounded-t-[1.75rem] p-6 pb-10 animate-slide-up relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="خريطة الموقع"
      >
        <div className="w-12 h-1 bg-stone-300 rounded-full mx-auto mb-6" />

        <button
          type="button"
          onClick={onClose}
          className="absolute start-5 top-5 w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition"
          aria-label="إغلاق"
        >
          <X size={18} />
        </button>

        <div className="mb-5 text-start pe-10">
          <span className="text-xs font-bold" style={{ color: themeColor }}>
            خريطة الموقع
          </span>
          <h3 className="text-xl font-bold text-[var(--wedding-ink)] mt-2">
            {event.title}
          </h3>
          <p className="text-sm text-stone-500 mt-1">{event.location}</p>
        </div>

        <div className="h-52 rounded-2xl overflow-hidden bg-stone-200 mb-5">
          <iframe
            title="Map"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              event.location || "",
            )}&output=embed`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

        {event.mapUrl && (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-white py-3.5 rounded-2xl font-bold text-sm transition hover:opacity-90"
            style={{ backgroundColor: themeColor }}
          >
            فتح في خرائط جوجل
          </a>
        )}
      </div>
    </div>
  );
}
