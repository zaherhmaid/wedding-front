"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  Heart,
  MapPin,
} from "lucide-react";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=36.8527778,11.0970833";
const TARGET_DATE = new Date("2026-10-24T00:00:00+01:00").getTime();

const content = {
  en: {
    direction: "ltr",
    eyebrow: "An engagement to remember",
    title: "Zaher & Chahed",
    occasion: "Engagement",
    date: "October 24, 2026",
    message:
      "Two hearts, one beautiful beginning. We would love to share this first chapter with the people who make our lives brighter.",
    explore: "Explore the celebration",
    countdownLabel: "Counting down to our day",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    locationEyebrow: "Meet us there",
    locationTitle: "A place chosen with love",
    locationCopy:
      "Save the date and join us beneath the Tunisian sky for an evening made of beautiful memories.",
    openMap: "Open in Google Maps",
    galleryEyebrow: "Little moments",
    galleryTitle: "A glimpse of our story",
    galleryCopy:
      "A few frames reserved for the memories we are making together.",
    cta: "We cannot wait to celebrate with you",
    footer: "With love, Zaher & Chahed",
  },
  fr: {
    direction: "ltr",
    eyebrow: "Des fiançailles à célébrer",
    title: "Zaher & Chahed",
    occasion: "Fiançailles",
    date: "24 Octobre 2026",
    message:
      "Deux cœurs, un magnifique commencement. Nous serions heureux de partager ce premier chapitre avec ceux qui illuminent nos vies.",
    explore: "Découvrir la célébration",
    countdownLabel: "Le compte à rebours est lancé",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    locationEyebrow: "Rendez-vous là-bas",
    locationTitle: "Un lieu choisi avec amour",
    locationCopy:
      "Notez la date et rejoignez-nous sous le ciel tunisien pour une soirée pleine de beaux souvenirs.",
    openMap: "Ouvrir dans Google Maps",
    galleryEyebrow: "Petits instants",
    galleryTitle: "Un aperçu de notre histoire",
    galleryCopy:
      "Quelques cadres réservés aux souvenirs que nous créons ensemble.",
    cta: "Nous avons hâte de célébrer avec vous",
    footer: "Avec amour, Zaher & Chahed",
  },
  ar: {
    direction: "rtl",
    eyebrow: "خطوبة تستحق أن تُذكر",
    title: "زاهر و شهد",
    occasion: "الخطوبة",
    date: "24 أكتوبر 2026",
    message:
      "قلبان، وبداية جميلة واحدة. يسعدنا أن نشارك فصلنا الأول مع من يجعلون حياتنا أكثر إشراقاً.",
    explore: "اكتشفوا تفاصيل الاحتفال",
    countdownLabel: "العدّ التنازلي ليومنا",
    days: "يوم",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    locationEyebrow: "نلتقي هناك",
    locationTitle: "مكان اخترناه بحب",
    locationCopy:
      "احتفظوا بهذا التاريخ وانضموا إلينا تحت سماء تونس لقضاء أمسية مليئة بالذكريات الجميلة.",
    openMap: "افتحوا الموقع في خرائط Google",
    galleryEyebrow: "لحظات صغيرة",
    galleryTitle: "لمحة من قصتنا",
    galleryCopy: "مساحة لصور الذكريات التي نصنعها معاً.",
    cta: "لا نستطيع الانتظار للاحتفال معكم",
    footer: "بكل الحب، زاهر و شهد",
  },
};

const gallery = [
  "/img/820534011_1447534764102788_1443026406753998941_n.jpg",
  "/img/825311913_1480669320780353_2663490673725796988_n.jpg",
  "/img/825311929_1400048065022096_4716734407078538863_n.jpg",
  "/img/825311986_1031325573248030_8772003038929002056_n.jpg",
];

function getTimeLeft() {
  const difference = Math.max(TARGET_DATE - Date.now(), 0);
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference % 86400000) / 3600000),
    minutes: Math.floor((difference % 3600000) / 60000),
    seconds: Math.floor((difference % 60000) / 1000),
  };
}

const INITIAL_TIME_LEFT = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function FiancailleZaherChahedPage() {
  const [language, setLanguage] = useState("fr");
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_LEFT);
  const t = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = t.direction;
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [language, t.direction]);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.15 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  return (
    <main className="engagement-page">
      <section className="engagement-hero" id="top">
        <div className="hero-wash" />
        <div className="hero-flower hero-flower-one" />
        <div className="hero-flower hero-flower-two" />
        <nav className="site-nav">
          <a href="#top" className="brand-mark" aria-label="Zaher and Chahed">
            Z<span>&amp;</span>C
          </a>
          <div className="language-switcher" aria-label="Language selector">
            {["fr", "en", "ar"].map((option) => (
              <button
                key={option}
                type="button"
                className={language === option ? "active" : ""}
                onClick={() => setLanguage(option)}
              >
                {option === "fr" ? "FR" : option === "en" ? "EN" : "ع"}
              </button>
            ))}
          </div>
        </nav>

        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">{t.eyebrow}</p>
          <p className="arabic-kicker">الخطوبة · Fiançailles · Engagement</p>
          <p className="engagement-quote">طلبنا العسل فمنّ الله علينا بالشهد</p>
          <h1>{t.title}</h1>
          <div className="hero-rule">
            <span>✦</span>
          </div>
          <p className="hero-date">
            <CalendarDays size={16} /> {t.date}
          </p>
          <p className="hero-message">{t.message}</p>
          <a className="text-link" href="#countdown">
            {t.explore} <ArrowDown size={16} />
          </a>
        </div>
        <div className="scroll-note">
          <span>Scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      <section className="countdown-section" id="countdown">
        <Reveal className="section-heading">
          <p className="eyebrow">{t.occasion}</p>
          <h2>{t.countdownLabel}</h2>
        </Reveal>
        <Reveal className="countdown-grid">
          {[
            [timeLeft.days, t.days],
            [timeLeft.hours, t.hours],
            [timeLeft.minutes, t.minutes],
            [timeLeft.seconds, t.seconds],
          ].map(([value, label]) => (
            <div className="countdown-unit" key={label}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="location-section">
        <Reveal className="location-card-reveal">
          <a
            className="location-card"
            href={MAP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label={t.openMap}
          >
            <div className="location-copy">
              <p className="eyebrow">{t.locationEyebrow}</p>
              <h2>{t.locationTitle}</h2>
              <p>{t.locationCopy}</p>
              <span className="gold-button">
                <span>{t.openMap}</span>
                <ArrowUpRight size={17} />
              </span>
            </div>
            <div className="map-art" aria-hidden="true">
              <div className="map-ring">
                <MapPin size={25} />
              </div>
              <span>{t.openMap}</span>
            </div>
          </a>
        </Reveal>
      </section>

      <section className="gallery-section">
        <Reveal className="section-heading gallery-heading">
          <p className="eyebrow">{t.galleryEyebrow}</p>
          <h2>{t.galleryTitle}</h2>
          <p>{t.galleryCopy}</p>
        </Reveal>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <Reveal
              key={image}
              className={`gallery-photo gallery-photo-${index + 1}`}
            >
              <div
                style={{ backgroundImage: `url(${image})` }}
                aria-label={`Engagement photo ${index + 1}`}
                role="img"
              />
              <span>0{index + 1}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="final-section">
        <Heart className="final-heart" size={22} fill="currentColor" />
        <Reveal>
          <h2>{t.cta}</h2>
          <div className="hero-rule">
            <span>✦</span>
          </div>
          <p>{t.footer}</p>
        </Reveal>
      </section>
      <footer className="site-footer">
        <span>Zaher &amp; Chahed</span>
        <span>24 · 10 · 2026</span>
        <a href="#top" aria-label="Back to top">
          <ArrowUp size={16} />
        </a>
      </footer>
    </main>
  );
}
