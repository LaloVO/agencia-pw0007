import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import { useProperties } from '@/hooks/useProperties';

const SkeletonCard = () => (
  <div className="w-full aspect-[3/4] rounded-[2rem] bg-foreground/[0.03] animate-pulse p-6 flex flex-col justify-end">
    <div className="h-3 bg-foreground/[0.05] rounded w-1/3 mb-2" />
    <div className="h-6 bg-foreground/[0.05] rounded w-3/4 mb-2" />
    <div className="h-4 bg-foreground/[0.05] rounded w-1/2" />
  </div>
);

const PropertiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const { properties, isLoading } = useProperties({ limit: 8 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter properties based on active tab
  const filteredProperties = properties.filter(prop => {
    if (activeFilter === 'all') return true;
    const locationStr = `${prop.colonia || ''} ${prop.direccion || ''}`.toLowerCase();
    return locationStr.includes(activeFilter.toLowerCase());
  });

  const filterTabs = [
    { id: 'all', label: 'Todos' },
    { id: 'saltillo', label: 'Saltillo' },
    { id: 'ramoz', label: 'Ramos Arizpe' },
    { id: 'arteaga', label: 'Arteaga' }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-background select-none overflow-hidden relative">
      <div className="max-w-7xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold block mb-3">
            Explora nuestro portafolio
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Conoce las propiedades
          </h2>
        </div>

        {/* Filters Bar */}
        <div className={`flex justify-center gap-3 mb-16 px-6 overflow-x-auto hide-scrollbar transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest border transition-all shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-foreground text-background border-foreground shadow-md'
                  : 'bg-background text-foreground/60 border-foreground/[0.08] hover:border-foreground/20 hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="px-6 md:px-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.id}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-foreground/40 font-medium">
              No hay propiedades disponibles que coincidan con esta selección.
            </div>
          )}
        </div>

        {/* View All CTA Button */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link
            to="/mapa"
            className="inline-flex px-10 py-4 border border-foreground/[0.1] hover:border-foreground text-foreground hover:bg-foreground hover:text-background rounded-full font-bold uppercase text-[10px] tracking-[0.2em] transition-all duration-300"
          >
            Ver más inmuebles
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PropertiesSection;
