import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: 'Address', value: '14 Rivonia Road, Sandton, Johannesburg' },
  { icon: Phone, label: 'Phone', value: '+27 72 233 2665' },
  { icon: Mail, label: 'Email', value: 'info@oula.co.za' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 08:00–18:00' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-extralight tracking-wide leading-tight mb-6">
              We'd love to<br />hear from you
            </h2>
            <div className="w-16 h-px bg-stone-500 mb-10" />
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-stone-700 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-stone-300" />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-0.5">{item.label}</p>
                    <p className="text-stone-200">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-stone-700/50 rounded-2xl overflow-hidden h-80 lg:h-full min-h-[320px] flex items-center justify-center">
            <p className="text-stone-400 text-sm tracking-wide">Sandton, Johannesburg</p>
          </div>
        </div>
      </div>
    </section>
  );
}
