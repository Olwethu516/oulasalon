interface HeroProps {
  onBookNow: () => void;
}

export default function Hero({ onBookNow }: HeroProps) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
      />
      <div className="absolute inset-0 bg-stone-900/55" />

      <div className="relative text-center text-white px-6 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-300 mb-6">Welcome to</p>
        <h1 className="text-6xl md:text-8xl font-extralight tracking-[0.15em] uppercase mb-6">
          Oula
        </h1>
        <div className="w-16 h-px bg-stone-300 mx-auto mb-6" />
        <p className="text-lg md:text-xl font-light text-stone-200 tracking-wide leading-relaxed mb-10">
          A sanctuary of beauty and self-care.<br className="hidden md:block" />
          Hair, treatments, and nails — crafted with artistry.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBookNow}
            className="px-10 py-4 bg-white text-stone-800 text-sm tracking-[0.2em] uppercase font-medium hover:bg-stone-100 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Book an Appointment
          </button>
          <a
            href="#services"
            className="px-10 py-4 border border-white text-white text-sm tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300"
          >
            View Services
          </a>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-white/40 animate-pulse" />
      </a>
    </section>
  );
}
