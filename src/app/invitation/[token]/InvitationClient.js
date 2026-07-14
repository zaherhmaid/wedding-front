"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  Calendar,
  MapPin,
  Clock,
  Check,
  X,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { invitationService } from "../../../services/invitationService";

export default function InvitationClient({ token }) {
  const [guest, setGuest] = useState(null);

  const [wedding, setWedding] = useState(null);

  const [programEvents, setProgramEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState("pending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // États pour l'animation d'ouverture
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // État pour la modale de carte (Bottom Sheet)
  const [activeMap, setActiveMap] = useState(null);

  // Compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Date du mariage fixée au 12 Septembre 2026 à 18:00
  const weddingDate = wedding
    ? new Date(wedding.countdown_date).getTime()
    : null;
  useEffect(() => {
    if (!weddingDate) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();

      const difference = weddingDate - now;

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
    if (token) {
      invitationService
        .getInvitation(token)
        .then((data) => {
          setGuest(data.guest);

          setWedding(data.wedding);

          setProgramEvents(data.events);

          setRsvpStatus(data.guest.status || "pending");

          setTimeout(() => {
            setLoading(false);
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          setError("Ce lien d'invitation semble expiré ou invalide.");
          setLoading(false);
        });
    }
  }, [token]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    setTimeout(() => {
      setShowContent(true);
    }, 800); // Temps nécessaire à l'effet de glissement des volets
  };

  const handleRSVPAction = async (newStatus) => {
    setIsSubmitting(true);
    try {
      const updatedData = await invitationService.updateRSVP(token, newStatus);
      setRsvpStatus(updatedData.status);
      if (guest) setGuest({ ...guest, status: updatedData.status });
    } catch (err) {
      alert("Erreur lors de la sauvegarde de votre choix.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Écran de chargement
  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-[#fcfaf6] text-right"
        dir="rtl"
      >
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-[3px] border-amber-100 border-t-amber-600 rounded-full animate-spin" />
          <Heart className="absolute text-amber-600" size={20} fill="#d97706" />
        </div>
        <p className="mt-6 font-serif italic text-amber-800/80 text-lg tracking-wide font-medium">
          الدعوة قيد التحضير...
        </p>
      </div>
    );
  }

  // Écran d'erreur
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-[#fdfbf7]">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-stone-200/60 text-center space-y-4">
          <p className="text-stone-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center overflow-x-hidden select-none">
      {/* 2. Enveloppe interactive */}
      {!showContent && (
        <div
          className={`relative w-full max-w-md h-[92vh] mx-auto bg-[#f5efe2] rounded-3xl shadow-2xl overflow-hidden border border-[#dfd4be] transition-all duration-1000 ${
            isOpened
              ? "scale-95 opacity-0 pointer-events-none"
              : "scale-100 opacity-100"
          }`}
        >
          {/* Motif de fond floral */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{
              backgroundImage: `url('/floral-pattern.png')`,
              backgroundSize: "cover",
            }}
          />

          {/* Sceau central & Volets d'ouverture */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <div
              className={`absolute top-0 bottom-0 left-1/2 w-[1px] bg-amber-800/10 transition-all duration-1000 ${isOpened ? "opacity-0" : "opacity-100"}`}
            />

            {/* Volet gauche */}
            <div
              className={`absolute inset-y-0 left-0 w-1/2 bg-[#f9f5eb]/60 border-r border-amber-800/5 transition-transform duration-1000 ${isOpened ? "-translate-x-full" : "translate-x-0"}`}
            >
              <div className="absolute top-10 left-6 w-full h-1/2 opacity-30 border-l border-t border-amber-700/20 rounded-tl-full" />
            </div>

            {/* Volet droit */}
            <div
              className={`absolute inset-y-0 right-0 w-1/2 bg-[#f9f5eb]/60 border-l border-amber-800/5 transition-transform duration-1000 ${isOpened ? "translate-x-full" : "translate-x-0"}`}
            >
              <div className="absolute bottom-10 right-6 w-full h-1/2 opacity-30 border-r border-b border-amber-700/20 rounded-br-full" />
            </div>

            {/* Sceau cliquable */}
            <button
              onClick={handleOpenEnvelope}
              className={`group relative w-24 h-24 rounded-full bg-gradient-to-b from-[#e3c793] to-[#c9a35e] flex flex-col items-center justify-center border-4 border-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-500 z-30 ${
                isOpened ? "scale-0 rotate-180 opacity-0" : "scale-100"
              }`}
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-white/40" />
              <Heart
                className="text-white animate-pulse"
                size={24}
                fill="#fff"
              />
              <span className="text-[9px] font-semibold text-white/90 tracking-widest mt-1 uppercase font-mono">
                Open
              </span>
            </button>
            <p
              className={`mt-4 text-xs tracking-[0.2em] text-amber-800/60 uppercase font-medium transition-all ${isOpened ? "opacity-0" : "opacity-100"}`}
            >
              Click to Open
            </p>
          </div>
        </div>
      )}

      {/* 3. Invitation principale */}
      {showContent && (
        <div className="relative w-full max-w-md h-[100vh] bg-[#fdfbf7] overflow-hidden">
          <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            {/* Section A: Couverture et arche de bienvenue */}
            <section className="h-full w-full snap-start relative flex flex-col justify-between p-6 pb-12 text-center text-white overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
                  alt="Wedding Arch"
                  className="w-full h-full object-cover transform scale-105"
                />
              </div>

              <div className="relative z-10 pt-8 px-4" dir="rtl">
                <div className="border-t border-b border-amber-400/30 py-3 my-4">
                  <p className="font-serif text-sm tracking-wide text-amber-100 leading-relaxed">
                    بارك الله لهما وبارك عليهما وجمع بينهما في خير
                  </p>
                </div>
              </div>

              <div className="relative z-10 space-y-4 my-auto px-6" dir="rtl">
                <div className="flex justify-center gap-1 text-amber-400">
                  <Sparkles size={16} className="animate-pulse" />
                  <Sparkles size={12} />
                  <Sparkles size={16} className="animate-pulse" />
                </div>

                <p className="text-amber-100/90 text-sm font-light">
                  تتشرف عائلتنا
                </p>

                {/* Présentation des parents */}
                <div className="grid grid-cols-2 gap-4 py-2 border-y border-white/5 bg-black/10 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="text-center border-l border-white/10">
                    <span className="text-[10px] text-amber-300 block">
                      السيد
                    </span>
                    <p className="font-medium text-xs text-white">
                      عبد الرحمن الترهوني
                    </p>
                    <span className="text-[10px] text-amber-300 block mt-1">
                      والسيدة
                    </span>
                    <p className="font-medium text-xs text-white">
                      خديجة المبروك
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-amber-300 block">
                      السيد
                    </span>
                    <p className="font-medium text-xs text-white">محمد الزوي</p>
                    <span className="text-[10px] text-amber-300 block mt-1">
                      والسيدة
                    </span>
                    <p className="font-medium text-xs text-white">
                      عائشة القروي
                    </p>
                  </div>
                </div>

                <p className="text-amber-100/80 text-xs font-light">
                  بدعوتكم لحضور حفل زفاف نجليهما
                </p>

                <div className="space-y-1 py-4">
                  <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4a0] via-[#ffd269] to-[#cfa13a] drop-shadow-md">
                    أحمد & أسماء
                  </h1>
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-100/60 font-medium">
                  اسحب للأسفل
                </p>
                <ChevronDown
                  className="animate-bounce text-amber-400"
                  size={20}
                />
              </div>
            </section>

            {/* Section B: Le Compte à rebours */}
            <section className="h-full w-full snap-start relative flex flex-col justify-between p-6 py-12 text-center text-stone-800 bg-[#fefcf8]">
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url('/floral-pattern.png')`,
                  backgroundSize: "cover",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none">
                <div className="w-80 h-80 rounded-full border border-stone-900" />
              </div>

              <div className="my-auto space-y-10 relative z-10" dir="rtl">
                <div className="space-y-2">
                  <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-wide">
                    العد التنازلي
                  </h2>
                  <p className="text-sm italic text-amber-700/80">
                    لحظات تفصلنا عن اللقاء
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
                  <div className="bg-white rounded-2xl p-3 shadow-md border border-stone-200/50">
                    <p className="text-2xl font-bold font-serif text-stone-900">
                      {String(timeLeft.days).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1 font-medium">
                      يوم
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-3 shadow-md border border-stone-200/50">
                    <p className="text-2xl font-bold font-serif text-stone-900">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1 font-medium">
                      ساعة
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-3 shadow-md border border-stone-200/50">
                    <p className="text-2xl font-bold font-serif text-stone-900">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1 font-medium">
                      دقيقة
                    </p>
                  </div>
                  <div className="bg-white rounded-2xl p-3 shadow-md border border-stone-200/50">
                    <p className="text-2xl font-bold font-serif text-stone-900">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] text-stone-400 mt-1 font-medium">
                      ثانية
                    </p>
                  </div>
                </div>

                <div className="flex justify-center opacity-60">
                  <div className="relative w-28 h-28 rounded-full border-2 border-dashed border-amber-700/20 flex items-center justify-center">
                    <div className="absolute w-[2px] h-10 bg-amber-700/30 origin-bottom transform rotate-45" />
                    <div className="absolute w-[2px] h-8 bg-amber-700/30 origin-bottom transform rotate-12" />
                    <div className="w-2 h-2 rounded-full bg-amber-700/50" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                  البرنامج والموقع
                </p>
                <ChevronDown
                  className="animate-bounce text-amber-600"
                  size={20}
                />
              </div>
            </section>

            {/* Section C: Programme d'événements */}
            <section
              className="
h-full
snap-start
bg-[#faf7f0]
p-6
relative
"
            >
              <div
                dir="rtl"
                className="
max-w-sm
mx-auto
"
              >
                <div
                  className="
text-center
mb-10
"
                >
                  <h2
                    className="
font-serif
text-3xl
font-bold
text-stone-900
"
                  >
                    برنامج الحفل
                  </h2>

                  <div
                    className="
w-16
h-1
bg-amber-500
rounded-full
mx-auto
mt-3
"
                  />

                  <p
                    className="
text-sm
text-stone-500
mt-3
"
                  >
                    تفاصيل أيام الفرح
                  </p>
                </div>

                <div
                  className="
relative
space-y-8
"
                >
                  <div
                    className="
absolute
right-[22px]
top-5
bottom-5
w-[2px]
bg-gradient-to-b
from-amber-500
to-stone-200
"
                  />

                  {programEvents.map((event, index) => (
                    <div
                      key={index}
                      className="
relative
flex
gap-5
items-start
"
                    >
                      <div
                        className="
z-10
w-12
h-12
rounded-full
bg-white
border-2
border-amber-500
shadow-md
flex
items-center
justify-center
text-xl
"
                      >
                        {event.icon}
                      </div>

                      <div
                        className="
flex-1
bg-white
rounded-3xl
p-5
shadow-sm
border
border-stone-100
"
                      >
                        <div
                          className="
flex
justify-between
items-center
"
                        >
                          <span
                            className="
text-xs
font-bold
text-amber-600
"
                          >
                            {event.date}
                          </span>

                          <div
                            className="
flex
items-center
gap-1
text-stone-500
text-xs
"
                          >
                            <Clock size={13} />

                            {event.time}
                          </div>
                        </div>

                        <h3
                          className="
font-bold
text-stone-900
text-lg
mt-3
"
                        >
                          {event.title}
                        </h3>

                        <p
                          className="
text-sm
text-stone-500
mt-2
"
                        >
                          {event.location}
                        </p>

                        <button
                          onClick={() => setActiveMap(event)}
                          className="
mt-4
w-full
bg-amber-50
text-amber-700
py-3
rounded-xl
text-xs
font-bold
flex
justify-center
items-center
gap-2
hover:bg-amber-100
transition
"
                        >
                          <MapPin size={14} />
                          الموقع الجغرافي
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section D: RSVP / Formulaire */}
            <section className="h-full w-full snap-start relative flex flex-col justify-center p-8 bg-[#fbf9f4]">
              <div
                className="max-w-md w-full mx-auto text-center space-y-8"
                dir="rtl"
              >
                <div className="space-y-2">
                  <Heart
                    size={24}
                    className="text-amber-600 mx-auto"
                    fill="#d97706"
                  />
                  <h3 className="text-lg font-bold text-stone-900 tracking-wide">
                    الرد لتأكيد الحضور
                  </h3>
                  <p className="text-xs text-amber-700/80 font-medium">
                    نرجو منكم تأكيد حضوركم قبل نهاية شهر أوت
                  </p>
                </div>

                <div className="bg-white rounded-[2rem] p-6 shadow-md border border-stone-200/50 space-y-6">
                  <div className="space-y-1">
                    <p className="text-[11px] text-stone-400 uppercase tracking-widest font-medium">
                      دعوة موجهة لـ
                    </p>
                    <h4 className="font-serif text-xl font-bold text-stone-800 italic">
                      {guest?.name || "ضيفنا الكريم"}
                    </h4>
                  </div>

                  {rsvpStatus === "pending" ? (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleRSVPAction("confirmed")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium py-3 px-4 rounded-xl text-xs transition-all tracking-wider uppercase active:scale-[0.98] disabled:opacity-50 shadow-md shadow-stone-900/10"
                      >
                        <Check size={14} /> حضور
                      </button>
                      <button
                        onClick={() => handleRSVPAction("declined")}
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-3 px-4 rounded-xl text-xs transition-all tracking-wider uppercase active:scale-[0.98] disabled:opacity-50"
                      >
                        <X size={14} /> اعتذار
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`p-4 rounded-xl border flex items-center gap-4 transition-all duration-300 text-right ${
                        rsvpStatus === "confirmed"
                          ? "bg-emerald-50/60 border-emerald-200/60 text-emerald-950"
                          : "bg-stone-50 border-stone-200 text-stone-600"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
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
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider">
                          {rsvpStatus === "confirmed"
                            ? "تم تأكيد الحضور بنجاح"
                            : "تم الإعتذار عن الحضور"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRSVPAction("pending")}
                        disabled={isSubmitting}
                        className="text-[10px] uppercase font-bold text-amber-700 hover:text-amber-900 transition underline shrink-0"
                      >
                        تعديل
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* MAP MODAL FIXED */}
          {/* MAP MODAL FIXED */}
          {activeMap && (
            <div
              className="
      fixed
      inset-0
      z-[999]
      bg-black/60
      backdrop-blur-sm
      flex
      items-end
      justify-center
    "
              onClick={() => setActiveMap(null)}
            >
              <div
                className="
        w-full
        max-w-md
        bg-[#fdfbf7]
        rounded-t-[35px]
        p-6
        pb-10
        animate-slide-up
        shadow-2xl
        relative
      "
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Drag bar */}
                <div
                  className="
          w-14
          h-1.5
          bg-stone-300
          rounded-full
          mx-auto
          mb-6
        "
                />

                {/* Close icon */}
                <button
                  onClick={() => setActiveMap(null)}
                  className="
          absolute
          left-5
          top-5
          w-10
          h-10
          rounded-full
          bg-white
          shadow-md
          border
          border-stone-200
          flex
          items-center
          justify-center
          text-stone-600
          hover:text-red-600
          transition
        "
                >
                  <X size={20} />
                </button>

                <div className="mb-5">
                  <span
                    className="
            text-xs
            text-amber-700
            font-bold
          "
                  >
                    خريطة الموقع
                  </span>

                  <h3
                    className="
            text-xl
            font-bold
            text-stone-900
            mt-2
          "
                  >
                    {activeMap.title}
                  </h3>

                  <p
                    className="
            text-sm
            text-stone-500
            mt-1
          "
                  >
                    {activeMap.location}
                  </p>
                </div>

                <div
                  className="
          h-52
          rounded-3xl
          overflow-hidden
          bg-stone-200
          mb-5
        "
                >
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(activeMap.location)}&output=embed`}
                    className="
            w-full
            h-full
            border-0
          "
                    loading="lazy"
                  />
                </div>

                <a
                  href={activeMap.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
          block
          text-center
          bg-[#d69f3d]
          text-white
          py-4
          rounded-2xl
          font-bold
        "
                >
                  فتح في خرائط جوجل
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
