"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Heart,
  MapPin,
  Clock,
  Check,
  X,
  Sparkles,
  ChevronDown,
  CalendarHeart,
  Camera,
  PartyPopper,
  UtensilsCrossed,
  Gem,
} from "lucide-react";
import { invitationService } from "../../../services/invitationService";

const EVENT_ICONS = {
  ring: Gem,
  party: PartyPopper,
  camera: Camera,
  food: UtensilsCrossed,
};

function ParentCard({ father, mother, label }) {
  if (!father && !mother) return null;

  return (
    <div className="glass-panel rounded-2xl p-4 text-center space-y-2">
      <p className="text-[10px] uppercase tracking-[0.25em] text-amber-200/70 font-medium">
        {label}
      </p>
      {father && (
        <div>
          <span className="text-[10px] text-amber-300/80 block">السيد</span>
          <p className="text-sm font-semibold text-white leading-relaxed">
            {father}
          </p>
        </div>
      )}
      {mother && (
        <div className={father ? "pt-1 border-t border-white/10" : ""}>
          <span className="text-[10px] text-amber-300/80 block">والسيدة</span>
          <p className="text-sm font-semibold text-white leading-relaxed">
            {mother}
          </p>
        </div>
      )}
    </div>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-stone-200/80 shadow-sm py-4 px-2 min-h-[88px]">
      <span className="font-display text-3xl font-bold text-stone-900 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[11px] text-stone-400 mt-1 font-medium">{label}</span>
    </div>
  );
}

export default function InvitationClient({ token }) {
  const [guest, setGuest] = useState(null);
  const [wedding, setWedding] = useState(null);
  const [programEvents, setProgramEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState("pending");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeMap, setActiveMap] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const themeColor = wedding?.theme_color || "#cfa13a";

  const weddingDate = wedding
    ? new Date(wedding.countdown_date).getTime()
    : null;

  const hasParents = useMemo(
    () =>
      Boolean(
        wedding?.groom_father_name ||
          wedding?.groom_mother_name ||
          wedding?.bride_father_name ||
          wedding?.bride_mother_name,
      ),
    [wedding],
  );

  useEffect(() => {
    if (!weddingDate) return;

    const timer = setInterval(() => {
      const difference = weddingDate - Date.now();
      if (difference < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  useEffect(() => {
    if (!token) return;

    invitationService
      .getInvitation(token)
      .then((data) => {
        setGuest(data.guest);
        setWedding(data.wedding);
        setProgramEvents(data.events || []);
        setRsvpStatus(data.guest.status || "pending");
        setTimeout(() => setLoading(false), 1200);
      })
      .catch(() => {
        setError("Ce lien d'invitation semble expiré ou invalide.");
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    document.documentElement.style.setProperty("--wedding-gold", themeColor);
  }, [themeColor]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    setTimeout(() => setShowContent(true), 700);
  };

  const handleRSVPAction = async (newStatus) => {
    setIsSubmitting(true);
    try {
      const updatedData = await invitationService.updateRSVP(token, newStatus);
      setRsvpStatus(updatedData.status);
      if (guest) setGuest({ ...guest, status: updatedData.status });
    } catch {
      alert("Erreur lors de la sauvegarde de votre choix.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0c0a09]">
        <div className="relative flex items-center justify-center">
          <div
            className="w-16 h-16 border-[3px] rounded-full animate-spin"
            style={{
              borderColor: `${themeColor}33`,
              borderTopColor: themeColor,
            }}
          />
          <Heart
            className="absolute"
            size={20}
            fill={themeColor}
            style={{ color: themeColor }}
          />
        </div>
        <p className="mt-6 text-amber-100/70 text-lg tracking-wide">
          الدعوة قيد التحضير...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-[#0c0a09]">
        <div className="max-w-md w-full bg-stone-900/80 rounded-3xl p-8 border border-stone-700/50 text-center">
          <p className="text-stone-200 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0a09] flex items-center justify-center overflow-x-hidden">
      {!showContent && (
        <div
          className={`relative w-full max-w-md h-[92vh] mx-4 rounded-[2rem] overflow-hidden transition-all duration-700 ${
            isOpened
              ? "scale-95 opacity-0 pointer-events-none"
              : "scale-100 opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(165deg, #1c1917 0%, #292524 40%, #1c1917 100%)",
            boxShadow: `0 25px 80px -20px ${themeColor}40`,
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, ${themeColor}40 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${themeColor}25 0%, transparent 45%)`,
            }}
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-8">
            <div
              className={`absolute top-0 bottom-0 left-1/2 w-px transition-opacity duration-700 ${isOpened ? "opacity-0" : "opacity-100"}`}
              style={{ backgroundColor: `${themeColor}30` }}
            />

            <div
              className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-700 ${isOpened ? "-translate-x-full" : "translate-x-0"}`}
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                borderRight: `1px solid ${themeColor}15`,
              }}
            />
            <div
              className={`absolute inset-y-0 right-0 w-1/2 transition-transform duration-700 ${isOpened ? "translate-x-full" : "translate-x-0"}`}
              style={{
                background:
                  "linear-gradient(-90deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
                borderLeft: `1px solid ${themeColor}15`,
              }}
            />

            <div className="text-center mb-10 space-y-2 relative z-10">
              <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/50">
                Wedding Invitation
              </p>
              <p className="font-display text-xl text-white/90 italic">
                {wedding?.groom_name} & {wedding?.bride_name}
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenEnvelope}
              className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-500 z-30 shadow-2xl hover:scale-105 active:scale-95 ${
                isOpened ? "scale-0 opacity-0" : "scale-100"
              }`}
              style={{
                background: `linear-gradient(145deg, ${themeColor}ee, ${themeColor}aa)`,
                boxShadow: `0 12px 40px ${themeColor}50`,
              }}
            >
              <div className="absolute inset-3 rounded-full border border-dashed border-white/35" />
              <Heart className="text-white mb-1" size={28} fill="#fff" />
              <span className="text-[9px] font-bold text-white/90 tracking-[0.2em] uppercase">
                Open
              </span>
            </button>

            <p className="mt-6 text-xs tracking-[0.2em] text-amber-200/40 uppercase">
              اضغط للفتح
            </p>
          </div>
        </div>
      )}

      {showContent && (
        <div
          className="relative w-full max-w-md h-[100dvh] overflow-hidden animate-reveal"
          style={{ background: "var(--wedding-cream)" }}
        >
          <div className="w-full h-full overflow-y-auto invitation-scroll">
            {/* Hero */}
            <section className="invitation-section min-h-[100dvh] relative flex flex-col justify-between text-center text-white overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200"
                  alt=""
                  className="w-full h-full object-cover scale-105"
                />
              </div>

              <div className="relative z-10 pt-10 px-6">
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs text-amber-100/90"
                >
                  <Sparkles size={14} style={{ color: themeColor }} />
                  <span>بارك الله لهما وبارك عليهما وجمع بينهما في خير</span>
                </div>
              </div>

              <div className="relative z-10 space-y-5 my-auto px-6">
                <p className="text-amber-100/80 text-sm">تتشرف عائلتا</p>

                {hasParents && (
                  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                    <ParentCard
                      label="عائلة العريس"
                      father={wedding?.groom_father_name}
                      mother={wedding?.groom_mother_name}
                    />
                    <ParentCard
                      label="عائلة العروس"
                      father={wedding?.bride_father_name}
                      mother={wedding?.bride_mother_name}
                    />
                  </div>
                )}

                <p className="text-amber-100/70 text-xs pt-1">
                  بدعوتكم لحضور حفل زفاف نجليهما
                </p>

                <div className="py-3">
                  <div
                    className="w-16 h-px mx-auto mb-4"
                    style={{ backgroundColor: themeColor }}
                  />
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight gold-gradient-text">
                    {wedding?.groom_name}
                  </h1>
                  <p
                    className="font-display text-2xl italic my-2"
                    style={{ color: themeColor }}
                  >
                    &
                  </p>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight gold-gradient-text">
                    {wedding?.bride_name}
                  </h1>
                  <div
                    className="w-16 h-px mx-auto mt-4"
                    style={{ backgroundColor: themeColor }}
                  />
                </div>
              </div>

              <div className="relative z-10 pb-10 flex flex-col items-center gap-1">
                <p className="text-[10px] uppercase tracking-[0.25em] text-amber-100/50">
                  اسحب للأسفل
                </p>
                <ChevronDown
                  className="animate-bounce"
                  size={22}
                  style={{ color: themeColor }}
                />
              </div>
            </section>

            {/* Countdown */}
            <section className="invitation-section min-h-[100dvh] flex flex-col justify-between py-14 px-6 bg-[#faf7f2]">
              <div className="my-auto space-y-10">
                <div className="text-center space-y-2">
                  <CalendarHeart
                    className="mx-auto mb-2"
                    size={28}
                    style={{ color: themeColor }}
                  />
                  <h2 className="font-display text-3xl font-bold text-stone-900">
                    العد التنازلي
                  </h2>
                  <p className="text-sm text-stone-500">
                    لحظات تفصلنا عن يوم الفرح
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
                  <CountdownUnit value={timeLeft.days} label="يوم" />
                  <CountdownUnit value={timeLeft.hours} label="ساعة" />
                  <CountdownUnit value={timeLeft.minutes} label="دقيقة" />
                  <CountdownUnit value={timeLeft.seconds} label="ثانية" />
                </div>

                <p className="text-center text-sm text-stone-400">
                  {wedding?.countdown_date &&
                    new Date(wedding.countdown_date).toLocaleDateString(
                      "ar-TN",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                </p>
              </div>

              <div className="flex flex-col items-center gap-1 text-stone-400">
                <p className="text-[10px] uppercase tracking-[0.2em]">
                  البرنامج
                </p>
                <ChevronDown
                  className="animate-bounce"
                  size={20}
                  style={{ color: themeColor }}
                />
              </div>
            </section>

            {/* Events */}
            <section className="invitation-section min-h-[100dvh] py-14 px-5 bg-[#f5f0e8]">
              <div className="max-w-sm mx-auto">
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl font-bold text-stone-900">
                    برنامج الحفل
                  </h2>
                  <div
                    className="w-14 h-1 rounded-full mx-auto mt-3"
                    style={{ backgroundColor: themeColor }}
                  />
                  <p className="text-sm text-stone-500 mt-3">
                    تفاصيل أيام الفرح
                  </p>
                </div>

                <div className="relative space-y-6">
                  <div
                    className="absolute right-[23px] top-4 bottom-4 w-0.5 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, ${themeColor}, #e7e5e4)`,
                    }}
                  />

                  {programEvents.map((event) => {
                    const Icon = EVENT_ICONS[event.icon] || CalendarHeart;

                    return (
                      <div key={event.id} className="relative flex gap-4">
                        <div
                          className="z-10 w-12 h-12 shrink-0 rounded-2xl bg-white border-2 shadow-md flex items-center justify-center"
                          style={{ borderColor: themeColor }}
                        >
                          <Icon size={20} style={{ color: themeColor }} />
                        </div>

                        <div className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-stone-100">
                          <div className="flex justify-between items-center gap-2">
                            <span
                              className="text-xs font-bold"
                              style={{ color: themeColor }}
                            >
                              {event.date}
                            </span>
                            <div className="flex items-center gap-1 text-stone-400 text-xs">
                              <Clock size={12} />
                              {event.time}
                            </div>
                          </div>

                          <h3 className="font-bold text-stone-900 text-lg mt-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-stone-500 mt-1.5">
                            {event.location}
                          </p>

                          <button
                            type="button"
                            onClick={() => setActiveMap(event)}
                            className="mt-4 w-full py-3 rounded-xl text-xs font-bold flex justify-center items-center gap-2 transition hover:opacity-90"
                            style={{
                              backgroundColor: `${themeColor}18`,
                              color: themeColor,
                            }}
                          >
                            <MapPin size={14} />
                            الموقع الجغرافي
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* RSVP */}
            <section className="invitation-section min-h-[100dvh] flex flex-col justify-center p-6 bg-[#faf7f2]">
              <div className="max-w-md w-full mx-auto text-center space-y-8">
                <div className="space-y-2">
                  <Heart
                    size={26}
                    className="mx-auto"
                    fill={themeColor}
                    style={{ color: themeColor }}
                  />
                  <h3 className="font-display text-2xl font-bold text-stone-900">
                    تأكيد الحضور
                  </h3>
                  <p className="text-xs text-stone-500">
                    نرجو منكم تأكيد حضوركم في أقرب وقت
                  </p>
                </div>

                <div className="bg-white rounded-[2rem] p-6 shadow-lg border border-stone-100 space-y-6">
                  <div className="space-y-1 pb-4 border-b border-stone-100">
                    <p className="text-[11px] text-stone-400 uppercase tracking-widest">
                      دعوة موجهة لـ
                    </p>
                    <h4 className="font-display text-2xl font-bold text-stone-800">
                      {guest?.name || "ضيفنا الكريم"}
                    </h4>
                  </div>

                  {rsvpStatus === "pending" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleRSVPAction("confirmed")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 text-white font-semibold py-3.5 px-4 rounded-2xl text-sm transition active:scale-[0.98] disabled:opacity-50 shadow-md"
                        style={{ backgroundColor: themeColor }}
                      >
                        <Check size={16} /> حضور
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRSVPAction("declined")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3.5 px-4 rounded-2xl text-sm transition active:scale-[0.98] disabled:opacity-50"
                      >
                        <X size={16} /> اعتذار
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`p-4 rounded-2xl border flex items-center gap-4 ${
                        rsvpStatus === "confirmed"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                          : "bg-stone-50 border-stone-200 text-stone-600"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          rsvpStatus === "confirmed"
                            ? "bg-emerald-500 text-white"
                            : "bg-stone-400 text-white"
                        }`}
                      >
                        {rsvpStatus === "confirmed" ? (
                          <Check size={16} />
                        ) : (
                          <X size={16} />
                        )}
                      </div>
                      <p className="flex-1 text-sm font-bold text-right">
                        {rsvpStatus === "confirmed"
                          ? "تم تأكيد الحضور بنجاح"
                          : "تم الاعتذار عن الحضور"}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRSVPAction("pending")}
                        disabled={isSubmitting}
                        className="text-xs font-bold underline shrink-0"
                        style={{ color: themeColor }}
                      >
                        تعديل
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {activeMap && (
            <div
              className="fixed inset-0 z-[999] bg-black/65 backdrop-blur-sm flex items-end justify-center"
              onClick={() => setActiveMap(null)}
              role="presentation"
            >
              <div
                className="w-full max-w-md bg-[#faf7f2] rounded-t-[2rem] p-6 pb-10 animate-slide-up shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <div className="w-14 h-1.5 bg-stone-300 rounded-full mx-auto mb-6" />

                <button
                  type="button"
                  onClick={() => setActiveMap(null)}
                  className="absolute left-5 top-5 w-10 h-10 rounded-full bg-white shadow border border-stone-200 flex items-center justify-center text-stone-600 hover:text-red-600 transition"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <div className="mb-5 text-right">
                  <span
                    className="text-xs font-bold"
                    style={{ color: themeColor }}
                  >
                    خريطة الموقع
                  </span>
                  <h3 className="text-xl font-bold text-stone-900 mt-2">
                    {activeMap.title}
                  </h3>
                  <p className="text-sm text-stone-500 mt-1">
                    {activeMap.location}
                  </p>
                </div>

                <div className="h-52 rounded-3xl overflow-hidden bg-stone-200 mb-5">
                  <iframe
                    title="Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activeMap.location)}&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>

                {activeMap.mapUrl && (
                  <a
                    href={activeMap.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-white py-4 rounded-2xl font-bold transition hover:opacity-90"
                    style={{ backgroundColor: themeColor }}
                  >
                    فتح في خرائط جوجل
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
