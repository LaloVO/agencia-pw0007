import { useRef, useEffect, useState } from 'react';
import { Clock, Calendar, ShieldCheck, TrendingUp } from 'lucide-react';

const TimelineSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Definir Presupuesto',
      items: [
        'Analiza tus ahorros y establece tu presupuesto total.',
        'Considera gastos adicionales: impuestos, escrituración y honorarios notariales.'
      ],
      time: '1 a 3 días',
      icon: ShieldCheck
    },
    {
      num: '02',
      title: 'Revisar Crédito y Precalificación',
      items: [
        'Revisa tu historial crediticio con anticipación.',
        'Obtén tu carta de precalificación bancaria o de Infonavit.',
        'No aplica para operaciones con pago de contado.'
      ],
      time: 'Depende de la entidad',
      icon: Clock
    },
    {
      num: '03',
      title: 'Buscar y Elegir tu Casa',
      items: [
        'Define las zonas preferidas y características indispensables.',
        'Compara opciones físicas e interactivas y agenda visitas.',
        'Selecciona la propiedad ideal y presenta una oferta formal.'
      ],
      time: '1 a 4 semanas',
      icon: Calendar
    },
    {
      num: '04',
      title: 'Firma y Entrega',
      items: [
        'Reunimos, validamos y revisamos tu expediente legal.',
        'El banco autoriza formalmente tu crédito hipotecario.',
        'Firma de escrituras públicas ante Notario.',
        'Recibes las llaves y la posesión de tu nuevo hogar.'
      ],
      time: '2 a 6 semanas',
      icon: ShieldCheck
    }
  ];

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 bg-background select-none relative overflow-hidden">
      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-foreground/40 font-bold block mb-3">
            El camino a tu hogar
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Línea del tiempo para comprar tu casa
          </h2>
          <p className="text-sm md:text-base text-foreground/50 max-w-xl mx-auto mt-4 leading-relaxed">
            Un proceso claro, sencillo y seguro estructurado para hacer realidad tu nuevo patrimonio.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className={`group flex flex-col justify-between transition-all duration-1000 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div>
                  {/* Step Index & Icon */}
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-5xl md:text-6xl font-extrabold text-foreground/[0.05] group-hover:text-foreground/[0.1] transition-colors duration-500 font-sans tracking-tighter">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-foreground/30 group-hover:text-foreground transition-all duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>

                  {/* List items */}
                  <ul className="space-y-3 mb-6">
                    {step.items.map((item, idx) => (
                      <li key={idx} className="text-xs md:text-sm text-foreground/60 leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Estimate */}
                <div className="pt-4 border-t border-foreground/[0.05] flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold block">
                    Tiempo estimado:
                  </span>
                  <span className="text-[11px] font-bold text-foreground/60 uppercase tracking-wider">
                    {step.time}
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer Plusvalia Banner */}
        <div className={`mt-24 pt-12 border-t border-foreground/[0.06] grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-1500 delay-500 ${
          visible ? 'opacity-100' : 'opacity-0 translate-y-12'
        }`}>
          <div className="md:col-span-8 flex items-start gap-4">
            <TrendingUp className="w-6 h-6 text-foreground/40 mt-1 shrink-0" />
            <div>
              <h4 className="font-bold text-base md:text-lg text-foreground mb-1">
                La plusvalía a tu favor
              </h4>
              <p className="text-xs md:text-sm text-foreground/60 leading-relaxed max-w-2xl">
                Comprar hoy, es invertir en tu futuro. Una propiedad en una buena ubicación aumenta su valor con el tiempo y construye patrimonio sólido para ti y tu familia.
              </p>
            </div>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <div className="text-center md:text-right">
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/30 font-bold block mb-1">
                Tiempo total estimado
              </span>
              <span className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                2 a 6 semanas
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
