import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteUser } from '@/hooks/useSiteUser';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { site } = useSiteUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/mapa', label: 'Propiedades' },
    { href: '/solicita-inmueble', label: 'Búsqueda Inteligente' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 flex justify-between items-center ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.02)]'
            : 'bg-transparent'
        }`}
      >
        <Link
          to="/"
          className="font-sans font-extrabold text-xl md:text-2xl tracking-[0.2em] text-foreground transition-all duration-300 hover:opacity-80"
        >
          {site?.site_name ? site.site_name.toUpperCase().replace(/\s+/g, '') : 'CLAUDIAVILLAR'}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:text-foreground/60 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-foreground after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === link.href ? 'text-foreground after:w-full' : 'text-foreground/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 text-foreground hover:opacity-75 transition-opacity"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dark Backdrop overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all"
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-xs bg-black/90 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col justify-between transition-transform duration-500 ease-out shadow-2xl ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            <div className="flex justify-between items-center mb-12">
              <span className="font-sans font-extrabold text-lg tracking-[0.2em] text-white">
                {site?.site_name ? site.site_name.toUpperCase().replace(/\s+/g, '') : 'CLAUDIAVILLAR'}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] font-medium transition-colors py-2 ${
                    location.pathname === link.href ? 'text-white border-b border-white/20' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-white/40 text-[10px] uppercase tracking-widest font-light">
            © {new Date().getFullYear()} {site?.site_name ?? 'Claudia Villar'}<br />
            Asesora Certificada en Bienes Raíces
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
