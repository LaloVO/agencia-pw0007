import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FormularioMultiStep from "@/components/home/FormularioMultiStep";
import { useSiteUser } from "@/hooks/useSiteUser";

export default function SolicitaInmueble() {
  const { user, site } = useSiteUser();
  const siteName = site?.site_name ?? 'Asesor Demo';

  return (
    <>
      <Helmet>
        <title>Búsqueda Inteligente | {user?.nombre_usuario ?? siteName}</title>
        <meta
          name="description"
          content={`Encuentra tu propiedad ideal en Saltillo con la asesoría de ${siteName}. Completa nuestro formulario inteligente para recibir recomendaciones personalizadas.`}
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-20 select-none">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold block mb-3">
              Encuentra tu propiedad ideal
            </span>
            <h1 className="font-sans text-3xl md:text-5xl text-foreground font-extrabold tracking-tight">
              Búsqueda Inteligente Inmobiliaria
            </h1>
            <p className="font-sans text-sm md:text-base text-foreground/60 max-w-2xl mx-auto mt-4 leading-relaxed">
              Define tu presupuesto, expediente y cuéntanos sobre tu rutina diaria. Nuestro motor buscará y filtrará las mejores opciones para ti.
            </p>
          </div>

          {/* Formulario MultiStep */}
          <div className="bg-foreground/[0.01] dark:bg-white/[0.01] border border-foreground/[0.06] dark:border-white/[0.06] p-6 md:p-8 rounded-[2rem] shadow-card">
            <FormularioMultiStep />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
