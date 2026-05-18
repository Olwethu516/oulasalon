const images = [
  {
    src: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Balayage',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/3738362/pexels-photo-3738362.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Colour',
    span: 'col-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Nails',
    span: 'col-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Styling',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Nail Art',
    span: 'col-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=600',
    label: 'Treatment',
    span: 'col-span-1',
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-4">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-extralight text-stone-800 tracking-wide">Gallery</h2>
          <div className="w-16 h-px bg-stone-300 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {images.map((image) => (
            <div key={image.src} className={`${image.span} group relative overflow-hidden rounded-xl`}>
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/40 transition-colors duration-300 flex items-end p-5">
                <span className="text-white text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 transform">
                  {image.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
