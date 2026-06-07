import { Link } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const Footer = () => {
  const { site, user } = useSiteUser();
  const phone = user?.telefono_usuario || '5210000000000';
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}`;

  return (
    <footer className="bg-background pt-24 pb-12 px-6 md:px-12 select-none">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          <div>
            <Link to="/" className="font-sans font-extrabold text-2xl tracking-[0.2em] mb-4 block text-foreground">
              {site?.site_name ? site.site_name.toUpperCase().replace(/\s+/g, '') : 'AGENCIA'}
            </Link>
            <p className="text-xs uppercase tracking-widest text-foreground/40 font-bold max-w-sm leading-relaxed">
              Asesora Certificada en Bienes Raíces • Saltillo, Coahuila
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Facebook
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors"
            >
              Contacto
            </a>
          </div>

        </div>

        {/* Small Legal Strip without Borders */}
        <div className="mt-20 pt-8 flex flex-col sm:flex-row justify-between text-[9px] uppercase tracking-widest text-foreground/30 font-bold gap-4">
          <span>© {new Date().getFullYear()} {site?.site_name ?? 'Asesor Demo'} • Bienes Raíces</span>
          <span>Saltillo • Ramos Arizpe • Arteaga</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
