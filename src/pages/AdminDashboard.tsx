import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminWelcome } from "@/components/admin/AdminWelcome";
import { CitasManager } from "@/components/admin/CitasManager";
import { DisponibilidadManager } from "@/components/admin/DisponibilidadManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Dashboard principal del administrador
const AdminDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [adminName, setAdminName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar autenticación y obtener datos del admin
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    const name = localStorage.getItem("adminName");
    
    if (!isLoggedIn) {
      navigate("/admin");
      return;
    }
    
    setAdminName(name || "Administrador");
    
    // Mostrar bienvenida por 3 segundos
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminName");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate("/admin");
  };

  // Mostrar pantalla de bienvenida
  if (showWelcome) {
    return <AdminWelcome adminName={adminName} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-barbershop-cream">
      {/* Header del dashboard */}
      <header className="bg-white border-b border-barbershop-gold/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-barbershop-black">
                Palm Black - Panel Admin
              </h1>
              <span className="text-barbershop-gold">|</span>
              <span className="text-muted-foreground">Bienvenido, {adminName}</span>
            </div>
            
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2 border-destructive/20 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="citas" className="space-y-6">
          {/* Navegación de pestañas */}
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="citas" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Gestionar Citas</span>
            </TabsTrigger>
            <TabsTrigger value="disponibilidad" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Disponibilidad</span>
            </TabsTrigger>
          </TabsList>

          {/* Contenido de las pestañas */}
          <TabsContent value="citas" className="space-y-6">
            <CitasManager />
          </TabsContent>

          <TabsContent value="disponibilidad" className="space-y-6">
            <DisponibilidadManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;