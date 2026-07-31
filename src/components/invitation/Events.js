"use client";

import {
  CalendarHeart,
  Camera,
  Clock,
  Gem,
  MapPin,
  PartyPopper,
  UtensilsCrossed,
} from "lucide-react";

const EVENT_ICONS = {
  ring: Gem,
  party: PartyPopper,
  camera: Camera,
  food: UtensilsCrossed,
  church: CalendarHeart,
  dinner: UtensilsCrossed,
  cocktail: PartyPopper,
  heart: Gem,
};

export default function Events({ events, themeColor, onOpenMap }) {
  if (!events?.length) {
    return (
      <section className="invitation-section min-h-[100dvh] flex items-center justify-center py-16 px-6 bg-[var(--wedding-pearl-deep)]">
        <p className="text-stone-400 text-sm">سيتم إضافة برنامج الحفل قريباً</p>
      </section>
    );
  }

  return (
    <section className="invitation-section min-h-[100dvh] py-16 px-5 bg-[var(--wedding-pearl-deep)] text-[var(--wedding-ink)]">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-12 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400">
            Schedule
          </p>
          <h2 className="font-arabic-display text-3xl font-bold">
            برنامج الحفل
          </h2>
          <div className="ornament-line" />
          <p className="text-sm text-stone-500">تفاصيل أيام الفرح</p>
        </div>

        <ol className="relative space-y-0">
          <div
            className="absolute top-3 bottom-3 w-px"
            style={{
              insetInlineStart: "1.35rem",
              background: `linear-gradient(to bottom, ${themeColor}, transparent)`,
            }}
          />

          {events.map((event, index) => {
            const Icon = EVENT_ICONS[event.icon] || CalendarHeart;

            return (
              <li
                key={event.id}
                className="relative flex gap-4 pb-10 last:pb-0 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div
                  className="relative z-10 w-11 h-11 shrink-0 rounded-full flex items-center justify-center border"
                  style={{
                    borderColor: themeColor,
                    background: "var(--wedding-mist)",
                    color: themeColor,
                  }}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1 pt-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-400 mb-2">
                    <span className="font-semibold" style={{ color: themeColor }}>
                      {event.date}
                    </span>
                    {event.time && (
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} />
                        {event.time}
                      </span>
                    )}
                  </div>

                  <h3 className="font-arabic-display text-xl font-bold text-[var(--wedding-ink)] leading-snug">
                    {event.title}
                  </h3>

                  {event.location && (
                    <p className="text-sm text-stone-500 mt-1.5 leading-relaxed">
                      {event.location}
                    </p>
                  )}

                  {(event.location || event.mapUrl) && (
                    <button
                      type="button"
                      onClick={() => onOpenMap(event)}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold tracking-wide transition hover:opacity-80"
                      style={{ color: themeColor }}
                    >
                      <MapPin size={14} />
                      عرض الموقع
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
