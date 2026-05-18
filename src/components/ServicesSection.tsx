import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { serviceCategories, Service } from '../data/services';

interface ServicesSectionProps {
  onBook: (category: string, service: Service) => void;
}

function ServiceCard({ service, onBook }: { service: Service; onBook: () => void }) {
  return (
    <div className="group flex items-start justify-between py-5 border-b border-stone-100 last:border-0 hover:bg-stone-50 px-4 -mx-4 rounded transition-colors duration-200">
      <div className="flex-1 pr-4">
        <h4 className="text-stone-800 font-medium mb-1">{service.name}</h4>
        <p className="text-stone-500 text-sm leading-relaxed">{service.description}</p>
        <div className="flex items-center gap-1.5 mt-2 text-stone-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs">{service.duration}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-3 shrink-0">
        <span className="text-stone-800 font-semibold text-lg">R{service.price.toLocaleString()}</span>
        <button
          onClick={onBook}
          className="text-xs tracking-widest uppercase px-4 py-2 border border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-200"
        >
          Book
        </button>
      </div>
    </div>
  );
}

function CategorySection({ category, onBook }: { category: typeof serviceCategories[0]; onBook: (service: Service) => void }) {
  const [expanded, setExpanded] = useState(false);
  const visibleServices = expanded ? category.services : category.services.slice(0, 4);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
      <div className="relative h-56 overflow-hidden">
        <img
          src={category.image}
          alt={category.label}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-light text-white tracking-wide">{category.label}</h3>
          <p className="text-stone-300 text-sm mt-1">{category.description}</p>
        </div>
      </div>
      <div className="p-6">
        {visibleServices.map((service) => (
          <ServiceCard key={service.name} service={service} onBook={() => onBook(service)} />
        ))}
        {category.services.length > 4 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors"
          >
            {expanded ? (
              <><ChevronUp className="w-4 h-4" /> Show less</>
            ) : (
              <><ChevronDown className="w-4 h-4" /> Show {category.services.length - 4} more services</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ServicesSection({ onBook }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-4">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 tracking-wide">Our Services</h2>
          <div className="w-16 h-px bg-stone-300 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onBook={(service) => onBook(category.label, service)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
