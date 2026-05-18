import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Service } from './data/services';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<string | undefined>();
  const [preselectedService, setPreselectedService] = useState<Service | undefined>();

  const handleBookService = (category: string, service: Service) => {
    setPreselectedCategory(category);
    setPreselectedService(service);
    setModalOpen(true);
  };

  const handleBookNow = () => {
    setPreselectedCategory(undefined);
    setPreselectedService(undefined);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onBookNow={handleBookNow} />
      <Hero onBookNow={handleBookNow} />
      <ServicesSection onBook={handleBookService} />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <BookingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedCategory={preselectedCategory}
        preselectedService={preselectedService}
      />
    </div>
  );
}
