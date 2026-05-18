export interface Service {
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  label: string;
  description: string;
  image: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'hair',
    label: 'Hair Services',
    description: 'Expert cuts, colour, and styling for every hair type',
    image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      { name: 'Ladies Cut & Blow-dry', price: 420, duration: '60 min', description: 'Precision cut tailored to your face shape, finished with a professional blow-dry' },
      { name: 'Gents Cut & Style', price: 220, duration: '30 min', description: 'Clean scissor or clipper cut with styling finish' },
      { name: 'Full Colour', price: 850, duration: '120 min', description: 'All-over colour using premium, nourishing colour products' },
      { name: 'Highlights / Balayage', price: 1100, duration: '150 min', description: 'Hand-painted or foil highlights for natural-looking dimension' },
      { name: 'Toner / Gloss', price: 350, duration: '45 min', description: 'Refresh and tone existing colour for long-lasting vibrancy' },
      { name: 'Keratin Smoothing Treatment', price: 1800, duration: '180 min', description: 'Eliminate frizz and restore shine for up to 4 months' },
      { name: 'Brazilian Blow-out', price: 1600, duration: '150 min', description: 'Smoothing treatment that adds softness and reduces curl' },
      { name: 'Updo / Occasion Styling', price: 550, duration: '60 min', description: 'Elegant updos, braids, or event styling' },
    ],
  },
  {
    id: 'treatments',
    label: 'Hair Treatments',
    description: 'Restorative care for damaged, dry, or colour-treated hair',
    image: 'https://images.pexels.com/photos/3992869/pexels-photo-3992869.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      { name: 'Deep Conditioning Treatment', price: 320, duration: '45 min', description: 'Intensive moisture-restoring mask for dry or brittle hair' },
      { name: 'Olaplex Treatment', price: 480, duration: '60 min', description: 'Bond-building treatment to repair damage from colour and heat' },
      { name: 'Scalp Treatment', price: 380, duration: '45 min', description: 'Targeted scalp care to address dryness, oiliness, or sensitivity' },
      { name: 'Hot Oil Treatment', price: 280, duration: '30 min', description: 'Nourishing oil infusion for extra shine and softness' },
      { name: 'Protein Treatment', price: 420, duration: '60 min', description: 'Strength-restoring treatment for over-processed or fragile hair' },
    ],
  },
  {
    id: 'nails',
    label: 'Nail Services',
    description: 'Luxurious nail care for hands and feet',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=800',
    services: [
      { name: 'Classic Manicure', price: 220, duration: '45 min', description: 'Shape, buff, cuticle care, and polish of your choice' },
      { name: 'Gel Manicure', price: 320, duration: '60 min', description: 'Long-lasting gel colour with glossy, chip-free finish' },
      { name: 'Acrylic Full Set', price: 580, duration: '90 min', description: 'Full acrylic overlay for length and strength' },
      { name: 'Acrylic Infill', price: 380, duration: '60 min', description: 'Maintenance infill for existing acrylic nails' },
      { name: 'Gel Nail Extensions', price: 650, duration: '90 min', description: 'Natural-looking gel extensions in your desired length' },
      { name: 'Classic Pedicure', price: 280, duration: '60 min', description: 'Foot soak, exfoliation, cuticle care, and polish' },
      { name: 'Luxury Pedicure', price: 420, duration: '75 min', description: 'Extended pedicure with mask, massage, and gel polish' },
      { name: 'Nail Art (per nail)', price: 45, duration: '15 min', description: 'Custom designs, gems, or hand-painted nail art' },
    ],
  },
];

export const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];
