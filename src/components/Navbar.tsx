import { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';

interface NavbarProps {
  onBookNow: () => void;
}

export default function Navbar({ onBookNow }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2">
            <Scissors className={`w-5 h-5 transition-colors duration-300 ${scrolled ? 'text-stone-800' : 'text-white'}`} />
            <span className={`text-xl font-light tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? 'text-stone-800' : 'text-white'}`}>
              Oula
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:opacity-60 ${scrolled ? 'text-stone-700' : 'text-white'}`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onBookNow}
              className="text-sm tracking-widest uppercase px-6 py-2.5 border transition-all duration-300 hover:scale-105 active:scale-95 bg-stone-800 border-stone-800 text-white"
            >
              Book Now
            </button>
          </div>

          <button
            className={`md:hidden transition-colors duration-300 ${scrolled ? 'text-stone-800' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-widest uppercase text-stone-700 hover:text-stone-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => { onBookNow(); setIsOpen(false); }}
            className="w-full text-sm tracking-widest uppercase px-6 py-3 bg-stone-800 text-white mt-2"
          >
            Book Now
          </button>
        </div>
      )}
    </nav>
  );
}
