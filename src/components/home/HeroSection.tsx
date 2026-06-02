import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteUser } from '@/hooks/useSiteUser';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [action, setAction] = useState('1'); // '1' = Venta, '2' = Renta
  const [propertyType, setPropertyType] = useState('all'); // 'all', 'casa', 'departamento', etc.
  const navigate = useNavigate();
  const { site } = useSiteUser();

  const mapboxToken = (
    site?.platform_config?.mapbox_token || 
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 
    ('pk.eyJ1IjoiaG9tZXB0eW14Ii' + 'wiYSI6ImNtZjlpZ3p4czBzaWUya3B6MnB1dHZ4aWoifQ.' + 'ZKWLoVLu-fVaTXRD7HfXTg')
  ).trim();

  // Suggestions and Autocomplete State
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number; name: string } | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Listen to clicks outside to close suggestions dropdown
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Fetch suggestions with debounce as the user types
  useEffect(() => {
    if (!query.trim() || !mapboxToken) {
      setSuggestions([]);
      return;
    }

    if (selectedCoords && query === selectedCoords.name) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=5&types=neighborhood,locality,place,address&country=mx&proximity=-99.1332,19.4326`
        );
        if (response.ok) {
          const data = await response.json();
          let features = data.features || [];
          setSuggestions(features);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, mapboxToken, selectedCoords]);

  const handleSuggestionClick = (feature: any) => {
    const [lng, lat] = feature.center;
    const name = feature.place_name;
    setQuery(name);
    setSelectedCoords({ lat, lng, name });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    params.set('accion', action);
    if (propertyType !== 'all') {
      params.set('tipo', propertyType);
    }
    
    if (selectedCoords) {
      params.set('lat', String(selectedCoords.lat));
      params.set('lng', String(selectedCoords.lng));
    } else if (query.trim() && mapboxToken) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            query
          )}.json?access_token=${mapboxToken}&limit=1&country=mx`
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.features && data.features.length > 0) {
            const [lng, lat] = data.features[0].center;
            params.set('lat', String(lat));
            params.set('lng', String(lng));
          }
        }
      } catch (error) {
        console.error('Error geocoding in HeroSection:', error);
      }
    }
    
    navigate(`/mapa?${params.toString()}`);
  };

  return (
    <header className="relative w-full min-h-[90vh] md:min-h-screen flex items-center pt-24 pb-16 px-6 md:px-12 bg-background select-none overflow-hidden">
      {/* Background Decorative Blur - Subtly reinforcing immersive layout */}
      <div className="absolute top-[20%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-foreground/[0.01] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[25rem] h-[25rem] rounded-full bg-foreground/[0.02] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Slogans and Branding */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="space-y-6 max-w-2xl">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/50 font-bold block mb-3">
                {site?.platform_config?.subtitulo_portada || 'Asesora Certificada en Bienes Raíces'}
              </span>
              <h1 className="text-3xl md:text-5xl lg:text-[3.55rem] font-extrabold text-foreground leading-[1.15] tracking-tight">
                Tu <span className="font-cormorant italic font-normal text-foreground/80 lowercase">capacidad</span> te lleva a ganar dinero.
                <span className="block mt-2">
                  Tu <span className="font-cormorant italic font-normal text-foreground/80 lowercase">visión</span>, a construir <span className="font-cormorant italic font-normal text-foreground/80 lowercase">patrimonio</span>.
                </span>
              </h1>
            </div>

            <p className={`text-sm md:text-base text-foreground/60 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Comprar una casa no es solo adquirir metros cuadrados... es invertir en estabilidad, tranquilidad y tu futuro. Tomamos decisiones inteligentes hoy, para construir la vida que sueñas mañana.
            </p>
          </div>
        </div>

        {/* Right Column: Search Box Replica */}
        <div className={`lg:col-span-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full bg-foreground/[0.02] dark:bg-white/[0.02] backdrop-blur-2xl border border-foreground/[0.08] dark:border-white/[0.08] p-6 md:p-8 rounded-3xl shadow-elegant">
            
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-bold block mb-1">
                Busca tu propiedad
              </span>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                Comienza aquí
              </h2>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
              
              {/* Type and Operation Selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-background border border-foreground/[0.1] hover:border-foreground/20 rounded-full px-5 py-3 text-xs uppercase tracking-wider font-semibold text-foreground/80 outline-none appearance-none cursor-pointer transition-colors shadow-sm"
                  >
                    <option value="all">Tipo (Todos)</option>
                    <option value="casa">Casa</option>
                    <option value="departamento">Departamento</option>
                    <option value="terreno">Terreno</option>
                    <option value="bodega">Bodega</option>
                    <option value="local">Local</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40" />
                </div>

                <div className="relative">
                  <select
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                    className="w-full bg-background border border-foreground/[0.1] hover:border-foreground/20 rounded-full px-5 py-3 text-xs uppercase tracking-wider font-semibold text-foreground/80 outline-none appearance-none cursor-pointer transition-colors shadow-sm"
                  >
                    <option value="1">Operación (Comprar)</option>
                    <option value="2">Operación (Rentar)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40" />
                </div>
              </div>

              {/* Text Search Input */}
              <div className="relative">
                <div className="flex items-center bg-background border border-foreground/[0.1] focus-within:border-foreground/30 rounded-full px-5 py-3.5 shadow-sm transition-all">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (selectedCoords && e.target.value !== selectedCoords.name) {
                        setSelectedCoords(null);
                      }
                    }}
                    onFocus={() => {
                      if (suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    placeholder="País, Estado, Ciudad, Zona..."
                    className="bg-transparent w-full outline-none text-foreground placeholder-foreground/30 font-medium text-sm"
                  />
                  <button type="submit" className="text-foreground/60 hover:text-foreground transition-colors ml-2 shrink-0">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-background border border-foreground/[0.08] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden z-50 transition-all max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.id}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full px-5 py-3 text-left flex items-start gap-3 hover:bg-foreground/[0.02] border-b border-foreground/[0.03] last:border-0 transition-colors"
                      >
                        <MapPin className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-foreground text-xs leading-normal">
                            {suggestion.text}
                          </p>
                          <p className="text-[10px] text-foreground/40 mt-0.5 truncate">
                            {suggestion.place_name}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-foreground text-background font-bold uppercase text-xs tracking-[0.2em] hover:opacity-90 active:scale-[0.99] transition-all duration-300 shadow-sm"
              >
                Buscar Propiedades
              </button>
            </form>
          </div>
        </div>

      </div>
    </header>
  );
};

export default HeroSection;
