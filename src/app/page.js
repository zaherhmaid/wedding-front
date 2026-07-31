export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--wedding-ink)] text-[var(--wedding-pearl)]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(196,163,90,0.18) 0%, transparent 45%), radial-gradient(ellipse at 80% 80%, rgba(196,163,90,0.08) 0%, transparent 40%), linear-gradient(165deg, #12100e 0%, #1c1814 55%, #0e0c0a 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c4a35a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Atmospheric photo plane */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1800"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--wedding-ink)] via-[var(--wedding-ink)]/70 to-[var(--wedding-ink)]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="px-6 md:px-12 py-7 animate-fade-in">
          <p className="font-display text-3xl tracking-tight text-[var(--wedding-gold-soft)]">
            Invetini
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mt-1">
            Digital Weddings
          </p>
        </header>

        <section className="flex-1 flex flex-col justify-center px-6 md:px-12 pb-20 max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--wedding-gold)] mb-6 animate-fade-up">
            دعوات زفاف رقمية
          </p>
          <h1 className="font-arabic-display text-4xl sm:text-5xl md:text-6xl leading-[1.3] text-[var(--wedding-pearl)] mb-6 animate-fade-up delay-100">
            لحظة الفرح،
            <br />
            <span className="text-[var(--wedding-gold-soft)]">
              بدعوة تليق بها
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-xl mb-4 animate-fade-up delay-200">
            صفحة دعوة أنيقة لضيوفكم مع أسماء العروسين، العدّ التنازلي، برنامج
            الحفل، وتأكيد الحضور.
          </p>
          <p className="text-sm text-white/35 animate-fade-up delay-300">
            افتح رابط الدعوة الذي وصلك عبر الرسالة الخاصة بك.
          </p>
        </section>

        <footer className="px-6 md:px-12 py-6 text-xs text-white/25 border-t border-white/5">
          © {new Date().getFullYear()} Invetini
        </footer>
      </div>
    </main>
  );
}
