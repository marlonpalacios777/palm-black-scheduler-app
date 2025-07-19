import { useState, useEffect } from "react";
import { IntroAnimation } from "@/components/cliente/IntroAnimation";
import { CalendarioAgendamiento } from "@/components/cliente/CalendarioAgendamiento";

// Página principal del cliente - maneja la presentación inicial y el calendario
const ClienteHome = () => {
  const [showIntro, setShowIntro] = useState(true);

  // Efecto para mostrar la animación de intro por 4 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Mostrar animación de introducción o calendario principal */}
      {showIntro ? (
        <IntroAnimation />
      ) : (
        <CalendarioAgendamiento />
      )}
    </div>
  );
};

export default ClienteHome;