import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import palmBlackLogo from "@/assets/palm-black-logo.png";

// Página de login para el administrador Stiven
const AdminLogin = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Función para manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular verificación de credenciales (en producción sería con backend)
    setTimeout(() => {
      if (usuario === "stiven" && password === "palmblack123") {
        // Guardar estado de sesión en localStorage
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminName", "Jhojan Mosquera");
        
        toast({
          title: "¡Bienvenido!",
          description: "Iniciando sesión en Palm Black...",
        });
        
        // Redirigir al dashboard
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Error de autenticación",
          description: "Usuario o contraseña incorrectos",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-barbershop-black via-barbershop-black to-zinc-900 p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo de la barbería */}
        <div className="text-center mb-8">
          <img 
            src={palmBlackLogo} 
            alt="Palm Black Logo" 
            className="w-20 h-20 mx-auto mb-4 animate-zoom-in"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Palm Black</h1>
          <p className="text-barbershop-gold">Panel de Administración</p>
        </div>

        {/* Formulario de login */}
        <Card className="border-barbershop-gold/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-barbershop-black">Iniciar Sesión</CardTitle>
            <CardDescription>
              Accede al panel de administración de tu barbería
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Campo de usuario */}
              <div className="space-y-2">
                <Label htmlFor="usuario">Usuario</Label>
                <Input
                  id="usuario"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  required
                  className="border-barbershop-gold/30 focus:border-barbershop-gold"
                />
              </div>

              {/* Campo de contraseña */}
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-barbershop-gold/30 focus:border-barbershop-gold"
                />
              </div>

              {/* Botón de login */}
              <Button 
                type="submit" 
                className="w-full bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold/90 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>

              {/* Enlaces adicionales */}
              <div className="text-center space-y-2 text-sm">
                <a 
                  href="#" 
                  className="text-barbershop-gold hover:text-barbershop-gold/80 block"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Funcionalidad no disponible",
                      description: "Esta opción estará disponible próximamente",
                    });
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </a>
                <a 
                  href="#" 
                  className="text-barbershop-gold hover:text-barbershop-gold/80 block"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Funcionalidad no disponible",
                      description: "Esta opción estará disponible próximamente",
                    });
                  }}
                >
                  Cambiar contraseña
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Credenciales de demo */}
        <div className="mt-6 p-4 bg-barbershop-gold/10 rounded-lg border border-barbershop-gold/20">
          <h3 className="text-white font-semibold mb-2">Demo - Credenciales:</h3>
          <p className="text-barbershop-cream text-sm">Usuario: <span className="text-barbershop-gold">stiven</span></p>
          <p className="text-barbershop-cream text-sm">Contraseña: <span className="text-barbershop-gold">palmblack123</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;