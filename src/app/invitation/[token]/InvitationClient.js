"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { invitationService } from "../../../services/invitationService";
import Envelope from "../../../components/invitation/Envelope";
import Hero from "../../../components/invitation/Hero";
import Countdown from "../../../components/invitation/Countdown";
import Events from "../../../components/invitation/Events";
import Rsvp from "../../../components/invitation/Rsvp";
import MapSheet from "../../../components/invitation/MapSheet";

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

  const themeColor = wedding?.theme_color || "#c4a35a";
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

    const tick = () => {
      const difference = weddingDate - Date.now();
      if (difference < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    };

    tick();
    const timer = setInterval(tick, 1000);
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
        setRsvpStatus(data.guest?.status || "pending");
        setTimeout(() => setLoading(false), 900);
      })
      .catch(() => {
        setError("يبدو أن رابط الدعوة غير صالح أو منتهٍ.");
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    document.documentElement.style.setProperty("--wedding-gold", themeColor);
  }, [themeColor]);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
    setTimeout(() => setShowContent(true), 720);
  };

  const handleRSVPAction = async (newStatus) => {
    setIsSubmitting(true);
    try {
      const updatedData = await invitationService.updateRSVP(token, newStatus);
      setRsvpStatus(updatedData.status);
      if (guest) setGuest({ ...guest, status: updatedData.status });
    } catch {
      alert("تعذر حفظ اختياركم. حاولوا مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--wedding-ink)]">
        <div className="relative flex items-center justify-center">
          <div
            className="w-14 h-14 border-2 rounded-full animate-spin"
            style={{
              borderColor: `${themeColor}30`,
              borderTopColor: themeColor,
            }}
          />
          <Heart
            className="absolute"
            size={18}
            fill={themeColor}
            style={{ color: themeColor }}
          />
        </div>
        <p className="mt-6 text-[var(--wedding-gold-soft)]/70 text-lg tracking-wide">
          الدعوة قيد التحضير…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6 bg-[var(--wedding-ink)]">
        <div className="max-w-md w-full text-center space-y-4 px-6 py-10 border border-white/10 rounded-3xl bg-white/5">
          <p className="font-display text-2xl text-[var(--wedding-gold-soft)]">
            Invetini
          </p>
          <p className="text-white/70 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--wedding-ink)] flex items-center justify-center overflow-x-hidden">
      {!showContent && (
        <Envelope
          wedding={wedding}
          themeColor={themeColor}
          isOpened={isOpened}
          onOpen={handleOpenEnvelope}
        />
      )}

      {showContent && (
        <div
          className="relative w-full max-w-md h-[100dvh] overflow-hidden animate-reveal"
          style={{ background: "var(--wedding-pearl)" }}
        >
          <div className="w-full h-full overflow-y-auto invitation-scroll">
            <Hero
              wedding={wedding}
              hasParents={hasParents}
              themeColor={themeColor}
            />
            <Countdown
              timeLeft={timeLeft}
              countdownDate={wedding?.countdown_date}
              themeColor={themeColor}
            />
            <Events
              events={programEvents}
              themeColor={themeColor}
              onOpenMap={setActiveMap}
            />
            <Rsvp
              guestName={guest?.name}
              rsvpStatus={rsvpStatus}
              isSubmitting={isSubmitting}
              themeColor={themeColor}
              onAction={handleRSVPAction}
            />
          </div>

          <MapSheet
            event={activeMap}
            themeColor={themeColor}
            onClose={() => setActiveMap(null)}
          />
        </div>
      )}
    </div>
  );
}
