import { useRef, useEffect, useState } from 'react';
import { useSiteUser } from '@/hooks/useSiteUser';
import { Instagram, Facebook, Send } from 'lucide-react';

const AboutSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useSiteUser();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const phone = user?.telefono_usuario || '5210000000000'; // fallback
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=Hola%20Claudia,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20inmobiliaria`;

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-background select-none overflow-hidden relative">
      <div className="max-w-6xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait Image Column */}
          <div className={`md:col-span-5 transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="relative group overflow-hidden rounded-[2rem] aspect-square md:aspect-[4/5] bg-foreground/5 shadow-elegant">
              <img
                src="/agent-avatar.svg"
                alt="Asesor Demo"
                className="w-full h-full object-cover grayscale transition-transform duration-[2000ms] group-hover:scale-105"
              />
              {/* Subtle glass overlay inside the portrait frame */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Description & Contact Details Column */}
          <div className={`md:col-span-7 space-y-8 transition-all duration-1000 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            
            {/* Title / Header */}
            <div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold block mb-3">
                Tu Asesora de Confianza
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                {user?.nombre_usuario || 'Asesor Demo'}
              </h2>
              <span className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-semibold block mt-1">
                Asesora Certificada en Bienes Raíces
              </span>
            </div>

            {/* Slogan Quote */}
            <div className="border-l border-foreground/15 pl-6 py-1 italic font-cormorant text-xl md:text-2xl text-foreground/80 leading-relaxed font-light">
              "Las decisiones inteligentes de hoy, construyen la vida que sueñas mañana."
            </div>

            {/* Narrative description */}
            <div className="space-y-4 text-sm md:text-base text-foreground/60 leading-relaxed">
              <p>
                Como especialista inmobiliaria en Saltillo, Coahuila, mi propósito es guiarte en cada paso de tu inversión con absoluta claridad, seguridad y profesionalismo.
              </p>
              <p>
                Entiendo que adquirir una propiedad trasciende los metros cuadrados de construcción; es la materialización de tu esfuerzo y la cimentación de tu patrimonio familiar. A través de un servicio directo, transparente y enfocado en tus metas, identificamos las mejores oportunidades comerciales y residenciales del mercado.
              </p>
            </div>

            {/* Social Media & Contact CTA Actions */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              
              {/* WhatsApp Primary Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                Contactar en WhatsApp
              </a>

              {/* Instagram link */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-4 border border-foreground/[0.08] hover:border-foreground/20 rounded-full text-foreground/70 hover:text-foreground transition-all hover:bg-foreground/[0.02]"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Facebook link */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-4 border border-foreground/[0.08] hover:border-foreground/20 rounded-full text-foreground/70 hover:text-foreground transition-all hover:bg-foreground/[0.02]"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
