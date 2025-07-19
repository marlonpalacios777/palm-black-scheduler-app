import palmBlackLogo from "@/assets/palm-black-logo.png";
import barbershopHero from "@/assets/barbershop-hero.jpg";

interface AdminWelcomeProps {
  adminName: string;
}

// Componente de bienvenida para el administrador
export const AdminWelcome = ({ adminName }: AdminWelcomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img 
          src={barbershopHero} 
          alt="Palm Black Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-barbershop-black/80"></div>
      </div>

      {/* Contenido de bienvenida */}
      <div className="relative z-10 text-center space-y-8 animate-fade-in-up">
        {/* Logo */}
        <div className="animate-zoom-in">
          <img 
            src={palmBlackLogo} 
            alt="Palm Black Logo" 
            className="w-24 h-24 mx-auto mb-6 drop-shadow-2xl"
          />
        </div>

        {/* Mensaje de bienvenida */}
        <div className="space-y-4 animate-slide-in-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            ¡Bienvenido!
          </h1>
          
          <div className="bg-barbershop-gold/20 backdrop-blur-sm rounded-2xl p-8 border border-barbershop-gold/30">
            <h2 className="text-2xl md:text-3xl font-semibold text-barbershop-gold mb-2">
              {adminName}
            </h2>
            <p className="text-xl text-white/90">
              a <span className="text-barbershop-gold font-bold">Palm Black</span>, tu barbería
            </p>
          </div>
          
          <p className="text-lg text-white/80 max-w-md mx-auto">
            Panel de administración cargando...
          </p>
        </div>

        {/* Indicador de carga */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-barbershop-gold rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-barbershop-gold rounded-full animate-pulse delay-150"></div>
          <div className="w-3 h-3 bg-barbershop-gold rounded-full animate-pulse delay-300"></div>
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-barbershop-gold/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};