import { useEffect, useState } from "react";
import barbershopHero from "@/assets/barbershop-hero.jpg";
import palmBlackLogo from "@/assets/palm-black-logo.png";

// Componente para la animación de introducción tipo "película"
export const IntroAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Secuencia de animación:
    // 0: Logo aparece (0-1.5s)
    // 1: Texto aparece (1.5-3s)
    // 2: Fade out completo (3-4s)
    
    const timers = [
      setTimeout(() => setStep(1), 1500),  // Mostrar texto después de 1.5s
      setTimeout(() => setStep(2), 3000),  // Comenzar fade out después de 3s
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <img 
          src={barbershopHero} 
          alt="Palm Black Barbería" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-barbershop-black/70"></div>
      </div>

      {/* Contenido de la animación */}
      <div className={`relative z-10 text-center space-y-8 transition-all duration-1000 ${
        step === 2 ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        {/* Logo animado */}
        <div className={`transition-all duration-1000 ease-out ${
          step >= 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90'
        }`}>
          <img 
            src={palmBlackLogo} 
            alt="Palm Black Logo" 
            className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl"
          />
        </div>

        {/* Texto principal con efecto typewriter */}
        <div className={`transition-all duration-1000 ease-out delay-500 ${
          step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            PALM BLACK
          </h1>
          <div className="relative">
            <p className="text-2xl md:text-3xl text-barbershop-gold font-light tracking-wide">
              Tu estilo, nuestra pasión
            </p>
            {/* Efecto de brillo dorado */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-barbershop-gold/30 to-transparent animate-gold-shimmer"></div>
          </div>
          
          {/* Línea decorativa */}
          <div className="w-32 h-1 bg-barbershop-gold mx-auto mt-6 animate-pulse"></div>
        </div>

        {/* Texto adicional */}
        <div className={`transition-all duration-1000 ease-out delay-1000 ${
          step >= 1 ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-white/80 text-lg max-w-lg mx-auto leading-relaxed">
            Bienvenido a la experiencia premium de barbería en Medellín
          </p>
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-barbershop-gold/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};