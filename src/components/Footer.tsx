import { Scissors, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-stone-500" />
            <span className="text-stone-300 text-lg font-light tracking-[0.2em] uppercase">Oula</span>
          </div>
          <p className="text-sm text-stone-500 text-center">
            &copy; {new Date().getFullYear()} Oula Salon. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
