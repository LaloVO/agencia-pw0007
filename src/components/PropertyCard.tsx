import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { CBFProperty, formatPrice } from '@/lib/cbf';

interface PropertyCardProps {
  property: CBFProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const image = property.imagenes_propiedades?.[0]?.image_url ?? 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop';
  const badge = property.id_tipo_accion === 2 ? 'Renta' : 'Venta';
  
  // Format location string
  const streetPart = property.direccion ? property.direccion.split(',')[0] : '';
  const neighborhoodPart = property.colonia || '';
  const mainLocation = [streetPart, neighborhoodPart].filter(Boolean).join(', ') || 'Ubicación Privada';

  return (
    <Link
      to={`/properties/${property.id}`}
      className="group block relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-foreground/5 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all duration-500 w-full"
    >
      {/* Background Image */}
      <img
        src={image}
        alt={property.nombre}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Immersive Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent z-[1] transition-opacity duration-500 group-hover:from-black/100" />

      {/* Action Badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="px-4 py-1.5 bg-black/60 dark:bg-white/80 text-white dark:text-black text-[10px] font-sans font-bold uppercase tracking-widest rounded-full backdrop-blur-md border border-white/10 dark:border-black/5">
          {badge}
        </span>
      </div>

      {/* Property Details Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 text-white select-none">
        
        {/* Address */}
        <span className="text-[10px] uppercase tracking-[0.15em] text-white/60 font-semibold truncate block mb-1">
          {mainLocation}
        </span>

        {/* Price */}
        <span className="text-xl md:text-2xl font-bold tracking-tight block mb-1">
          {formatPrice(property.precio)}
        </span>

        {/* Title */}
        <span className="text-[11px] text-white/80 font-medium truncate block mb-4">
          {property.nombre}
        </span>

        {/* Features Row */}
        <div className="flex gap-4 text-[11px] text-white/60 border-t border-white/10 pt-3.5 items-center">
          {property.area != null && (
            <span className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 stroke-[1.5]" />
              {property.area} m²
            </span>
          )}
          {property.habitaciones != null && (
            <span className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 stroke-[1.5]" />
              {property.habitaciones} {property.habitaciones === 1 ? 'Hab' : 'Habs'}
            </span>
          )}
          {property.banios != null && (
            <span className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 stroke-[1.5]" />
              {property.banios} {property.banios === 1 ? 'Baño' : 'Baños'}
            </span>
          )}
        </div>

      </div>
    </Link>
  );
};

export default PropertyCard;
