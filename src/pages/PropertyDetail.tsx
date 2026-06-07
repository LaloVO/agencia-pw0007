import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Bed, Bath, Square, Car, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { fetchProperty, formatPrice } from '@/lib/cbf';
import { useSiteUser } from '@/hooks/useSiteUser';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, site } = useSiteUser();
  const siteName = site?.site_name ?? 'Asesor Demo';

  const { data: property, isLoading, error } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const whatsappNumber = user?.telefono_usuario?.replace(/\D/g, '') ?? '';
  const whatsappMsg = property
    ? encodeURIComponent(`Hola Asesor Demo, me interesa la propiedad: ${property.nombre}`)
    : '';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen bg-background px-6 md:px-12 max-w-6xl mx-auto animate-pulse">
          <div className="h-8 bg-foreground/10 rounded w-1/3 mb-8" />
          <div className="aspect-video bg-foreground/10 rounded-[2rem] mb-8" />
          <div className="h-10 bg-foreground/10 rounded w-1/2 mb-4" />
          <div className="h-4 bg-foreground/10 rounded w-1/3" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Navbar />
        <main className="pt-28 min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="font-sans text-xl text-foreground/60 mb-4">Propiedad no encontrada</p>
            <Link to="/mapa" className="text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:text-foreground/70 transition-colors">
              Ver todas las propiedades
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const images = property.imagenes_propiedades ?? [];
  const mainImage = images[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  const location = [property.colonia, property.direccion].filter(Boolean).join(', ');

  return (
    <>
      <Helmet>
        <title>{property.nombre} | {user?.nombre_usuario ?? siteName}</title>
        <meta name="description" content={property.descripcion ?? property.nombre} />
      </Helmet>

      <Navbar />

      <main className="pt-28 min-h-screen bg-background select-none">
        
        {/* Navigation back */}
        <div className="px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <Link
            to="/mapa"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Ver inventario completo
          </Link>
        </div>

        {/* Dynamic Image Collage */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-[2rem] overflow-hidden shadow-card">
            <div className="aspect-[4/3] md:aspect-auto md:row-span-2 overflow-hidden">
              <img src={mainImage} alt={property.nombre} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]" />
            </div>
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="aspect-[4/3] overflow-hidden">
                <img src={img.image_url} alt={`${property.nombre} ${i + 2}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Details Grid */}
        <div className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left/Detailed Panel */}
            <div className="lg:col-span-8 space-y-8">
              
              <div>
                {/* Actions */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="px-4 py-1.5 bg-foreground text-background text-[10px] font-sans font-bold uppercase tracking-widest rounded-full">
                    {badge}
                  </span>
                  {property.tipo && (
                    <span className="px-4 py-1.5 border border-foreground/[0.08] text-foreground/75 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full capitalize">
                      {property.tipo}
                    </span>
                  )}
                </div>

                {/* Name */}
                <h1 className="font-sans text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                  {property.nombre}
                </h1>

                {/* Location */}
                {location && (
                  <p className="flex items-center gap-2 text-foreground/50 font-sans text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-foreground/30 shrink-0" />
                    {location}
                  </p>
                )}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.habitaciones != null && (
                  <div className="bg-foreground/[0.01] border border-foreground/[0.05] rounded-3xl p-5 text-center">
                    <Bed className="w-5 h-5 mx-auto mb-2 text-foreground/40" />
                    <p className="font-sans text-2xl font-bold text-foreground">{property.habitaciones}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mt-1">Recámaras</p>
                  </div>
                )}
                {property.banios != null && (
                  <div className="bg-foreground/[0.01] border border-foreground/[0.05] rounded-3xl p-5 text-center">
                    <Bath className="w-5 h-5 mx-auto mb-2 text-foreground/40" />
                    <p className="font-sans text-2xl font-bold text-foreground">{property.banios}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mt-1">Baños</p>
                  </div>
                )}
                {property.area != null && (
                  <div className="bg-foreground/[0.01] border border-foreground/[0.05] rounded-3xl p-5 text-center">
                    <Square className="w-5 h-5 mx-auto mb-2 text-foreground/40" />
                    <p className="font-sans text-2xl font-bold text-foreground">{property.area}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mt-1">m² Área</p>
                  </div>
                )}
                {property.estacionamientos != null && (
                  <div className="bg-foreground/[0.01] border border-foreground/[0.05] rounded-3xl p-5 text-center">
                    <Car className="w-5 h-5 mx-auto mb-2 text-foreground/40" />
                    <p className="font-sans text-2xl font-bold text-foreground">{property.estacionamientos}</p>
                    <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mt-1">Cajones</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {property.descripcion && (
                <div className="space-y-4 pt-4">
                  <h2 className="font-sans text-xl font-bold text-foreground">Descripción</h2>
                  <p className="font-sans text-foreground/75 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {property.descripcion}
                  </p>
                </div>
              )}
            </div>

            {/* Right/Contact Sticky Panel */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-foreground/[0.01] dark:bg-white/[0.01] border border-foreground/[0.08] dark:border-white/[0.08] rounded-[2rem] p-8 shadow-card space-y-6">
                
                <div>
                  <p className="text-3xl font-extrabold text-foreground tracking-tight">{formatPrice(property.precio)}</p>
                  <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-widest mt-1.5">
                    {badge === 'Renta' ? 'por mes' : 'precio de lista'}
                  </p>
                </div>

                {/* Profile Card */}
                <div className="flex items-center gap-4 py-6 border-y border-foreground/[0.06]">
                  {user?.imagen_perfil_usuario ? (
                    <img
                      src={user.imagen_perfil_usuario}
                      alt={user.nombre_usuario}
                      className="w-14 h-14 rounded-full object-cover grayscale"
                    />
                  ) : (
                    <img
                      src="/agent-avatar.svg"
                      alt={user?.nombre_usuario || siteName}
                      className="w-14 h-14 rounded-full object-cover grayscale"
                    />
                  )}
                  <div>
                    <p className="font-sans font-bold text-sm text-foreground">{user?.nombre_usuario || siteName}</p>
                    <p className="font-sans text-[10px] text-foreground/40 uppercase tracking-widest mt-0.5">Asesora de Inversión</p>
                  </div>
                </div>

                {/* WhatsApp button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar Asesor
                </a>

                {/* Smart Search Banner */}
                <div className="pt-4 space-y-4">
                  <h4 className="font-sans text-sm font-bold text-foreground">¿Buscas algo específico?</h4>
                  <p className="font-sans text-[11px] text-foreground/50 leading-relaxed">
                    Si esta propiedad no cumple tus expectativas, completa nuestro cuestionario inteligente en 6 pasos y buscaremos el espacio ideal según tu rutina de vida.
                  </p>
                  <Link
                    to="/solicita-inmueble"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-foreground/[0.1] hover:border-foreground text-foreground hover:bg-foreground hover:text-background rounded-full font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Búsqueda Inteligente
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </>
  );
};

export default PropertyDetail;
