import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import PropertiesSection from '@/components/home/PropertiesSection';
import TimelineSection from '@/components/home/TimelineSection';
import AboutSection from '@/components/home/AboutSection';
import { useSiteUser } from '@/hooks/useSiteUser';

const Index = () => {
  const { site } = useSiteUser();
  const siteName = site?.site_name ?? 'Asesor Demo';

  return (
    <>
      <Helmet>
        <title>{siteName} | Asesora Certificada en Bienes Raíces - Saltillo</title>
        <meta
          name="description"
          content={`Sitio web oficial de ${siteName}, asesora inmobiliaria certificada en Saltillo, Coahuila. Encuentra casas en venta, renta e inversiones inteligentes.`}
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />
        <PropertiesSection />
        <TimelineSection />
        <AboutSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
