import { Award, Heart, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Award,
    title: 'Expert Artistry',
    description: 'Our stylists bring years of training and a passion for their craft to every appointment.',
  },
  {
    icon: Heart,
    title: 'Personalised Care',
    description: 'We take time to understand your unique needs and tailor every service to you.',
  },
  {
    icon: Sparkles,
    title: 'Premium Products',
    description: 'We use only top-tier professional products that nourish and protect your hair and nails.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 tracking-wide leading-tight mb-6">
              Beauty crafted<br />with intention
            </h2>
            <div className="w-16 h-px bg-stone-300 mb-8" />
            <p className="text-stone-600 leading-relaxed mb-6">
              Oula was born from a belief that every person deserves to feel beautiful, confident, and cared for. Nestled in the heart of Johannesburg, our salon is a retreat from the everyday — a place where expert hands and a warm atmosphere come together.
            </p>
            <p className="text-stone-600 leading-relaxed mb-10">
              From transformative colour to restorative treatments and impeccable nail art, every service at Oula is delivered with precision, love, and a commitment to your wellbeing.
            </p>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-extralight text-stone-800">8+</p>
                <p className="text-xs tracking-widest uppercase text-stone-400 mt-1">Years</p>
              </div>
              <div>
                <p className="text-3xl font-extralight text-stone-800">2k+</p>
                <p className="text-xs tracking-widest uppercase text-stone-400 mt-1">Clients</p>
              </div>
              <div>
                <p className="text-3xl font-extralight text-stone-800">20+</p>
                <p className="text-xs tracking-widest uppercase text-stone-400 mt-1">Services</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3738355/pexels-photo-3738355.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Salon interior"
              className="w-full h-[500px] object-cover rounded-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-stone-800 text-white p-8 rounded-xl hidden lg:block">
              <p className="text-4xl font-extralight">4.9</p>
              <p className="text-xs tracking-widest uppercase text-stone-300 mt-1">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {values.map((value) => (
            <div key={value.title} className="text-center p-8 bg-stone-50 rounded-2xl">
              <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-5">
                <value.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-medium text-stone-800 mb-3">{value.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
