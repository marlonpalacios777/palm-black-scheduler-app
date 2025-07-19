import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Scissors } from "lucide-react";
import { useNavigate } from "react-router-dom";
import palmBlackLogo from "@/assets/palm-black-logo.png";
import barbershopHero from "@/assets/barbershop-hero.jpg";

// Página principal de bienvenida con opciones de navegación
const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img 
          src={barbershopHero} 
          alt="Palm Black Barbería" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-barbershop-black/60"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Logo y título */}
          <div className="space-y-6">
            <img 
              src={palmBlackLogo} 
              alt="Palm Black Logo" 
              className="w-24 h-24 mx-auto animate-zoom-in"
            />
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider">
                PALM BLACK
              </h1>
              <p className="text-xl md:text-2xl text-barbershop-gold font-light">
                Tu estilo, nuestra pasión
              </p>
              <div className="w-32 h-1 bg-barbershop-gold mx-auto mt-4"></div>
            </div>
          </div>

          {/* Descripción */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-white/90 leading-relaxed">
              Bienvenido a Palm Black, la barbería premium de Medellín donde la tradición 
              se encuentra con la innovación. Experimenta un servicio de calidad superior 
              en un ambiente elegante y profesional.
            </p>
          </div>

          {/* Opciones de navegación */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Opción para clientes */}
            <Card className="bg-white/10 backdrop-blur-sm border-barbershop-gold/30 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/cliente')}>
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 text-barbershop-gold mx-auto mb-4" />
                <CardTitle className="text-white text-xl">Soy Cliente</CardTitle>
                <CardDescription className="text-white/80">
                  Agenda tu cita de forma rápida y sencilla
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold/90 font-semibold"
                  onClick={() => navigate('/cliente')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Cita
                </Button>
              </CardContent>
            </Card>

            {/* Opción para administrador */}
            <Card className="bg-white/10 backdrop-blur-sm border-barbershop-gold/30 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/admin')}>
              <CardHeader className="text-center">
                <User className="w-12 h-12 text-barbershop-gold mx-auto mb-4" />
                <CardTitle className="text-white text-xl">Soy Administrador</CardTitle>
                <CardDescription className="text-white/80">
                  Gestiona citas y configura tu disponibilidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline"
                  className="w-full border-barbershop-gold text-barbershop-gold hover:bg-barbershop-gold hover:text-barbershop-black font-semibold"
                  onClick={() => navigate('/admin')}
                >
                  <User className="w-4 h-4 mr-2" />
                  Panel Admin
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Información de contacto */}
          <div className="bg-barbershop-black/50 backdrop-blur-sm rounded-2xl p-6 border border-barbershop-gold/20 max-w-lg mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Scissors className="w-5 h-5 text-barbershop-gold" />
              <h3 className="text-white font-semibold">Información de Contacto</h3>
            </div>
            <div className="text-center space-y-1 text-sm text-white/80">
              <p>📍 Cra. 37 #71c-38, El Raizal</p>
              <p>Medellín, Antioquia, Colombia</p>
              <p>🕒 Lunes a Sábado: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-barbershop-gold/20 rounded-full animate-pulse"
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

export default Index;
