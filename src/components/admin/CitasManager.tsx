import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, Mail, Trash2, CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Cita {
  id: string;
  fecha: string;
  hora: string;
  cliente: {
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
  };
  estado: 'confirmada' | 'cancelada';
  fechaCreacion: string;
}

// Componente para gestionar las citas agendadas
export const CitasManager = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [filtroFecha, setFiltroFecha] = useState<'todas' | 'hoy' | 'proximas'>('proximas');
  const { toast } = useToast();

  // Cargar citas desde localStorage
  useEffect(() => {
    const citasGuardadas = localStorage.getItem('palmblack_citas');
    if (citasGuardadas) {
      const citasParseadas = JSON.parse(citasGuardadas);
      setCitas(citasParseadas.filter((cita: Cita) => cita.estado === 'confirmada'));
    }
  }, []);

  // Filtrar citas según el filtro seleccionado
  const citasFiltradas = citas.filter(cita => {
    const fechaCita = new Date(cita.fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    switch (filtroFecha) {
      case 'hoy':
        return fechaCita.toDateString() === hoy.toDateString();
      case 'proximas':
        return fechaCita >= hoy;
      default:
        return true;
    }
  }).sort((a, b) => {
    // Ordenar por fecha y hora
    if (a.fecha === b.fecha) {
      return a.hora.localeCompare(b.hora);
    }
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });

  // Función para cancelar una cita
  const cancelarCita = (citaId: string) => {
    const citasActualizadas = citas.map(cita => 
      cita.id === citaId 
        ? { ...cita, estado: 'cancelada' as const }
        : cita
    ).filter(cita => cita.estado === 'confirmada');
    
    setCitas(citasActualizadas);
    
    // Actualizar localStorage
    const todasLasCitas = JSON.parse(localStorage.getItem('palmblack_citas') || '[]');
    const citasActualizadasCompletas = todasLasCitas.map((cita: Cita) => 
      cita.id === citaId 
        ? { ...cita, estado: 'cancelada' }
        : cita
    );
    localStorage.setItem('palmblack_citas', JSON.stringify(citasActualizadasCompletas));
    
    toast({
      title: "Cita cancelada",
      description: "La cita ha sido cancelada exitosamente",
    });
  };

  // Función para obtener estadísticas
  const getEstadisticas = () => {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const citasHoy = citas.filter(cita => 
      new Date(cita.fecha).toDateString() === hoy.toDateString()
    ).length;
    
    const citasProximas = citas.filter(cita => 
      new Date(cita.fecha) >= hoy
    ).length;
    
    return { citasHoy, citasProximas, totalCitas: citas.length };
  };

  const estadisticas = getEstadisticas();

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-barbershop-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CalendarDays className="w-8 h-8 text-barbershop-gold" />
              <div>
                <p className="text-2xl font-bold text-barbershop-black">{estadisticas.citasHoy}</p>
                <p className="text-sm text-muted-foreground">Citas hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-barbershop-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-barbershop-gold" />
              <div>
                <p className="text-2xl font-bold text-barbershop-black">{estadisticas.citasProximas}</p>
                <p className="text-sm text-muted-foreground">Próximas citas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-barbershop-gold/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-barbershop-gold" />
              <div>
                <p className="text-2xl font-bold text-barbershop-black">{estadisticas.totalCitas}</p>
                <p className="text-sm text-muted-foreground">Total activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="border-barbershop-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-barbershop-black">
            <Calendar className="w-5 h-5 text-barbershop-gold" />
            <span>Gestionar Citas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={filtroFecha === 'todas' ? 'default' : 'outline'}
              onClick={() => setFiltroFecha('todas')}
              size="sm"
            >
              Todas las citas
            </Button>
            <Button 
              variant={filtroFecha === 'hoy' ? 'default' : 'outline'}
              onClick={() => setFiltroFecha('hoy')}
              size="sm"
            >
              Hoy
            </Button>
            <Button 
              variant={filtroFecha === 'proximas' ? 'default' : 'outline'}
              onClick={() => setFiltroFecha('proximas')}
              size="sm"
            >
              Próximas
            </Button>
          </div>

          {/* Lista de citas */}
          <div className="space-y-4">
            {citasFiltradas.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-lg text-muted-foreground">No hay citas para mostrar</p>
                <p className="text-sm text-muted-foreground">
                  {filtroFecha === 'hoy' 
                    ? 'No tienes citas programadas para hoy'
                    : 'No hay citas programadas en el rango seleccionado'
                  }
                </p>
              </div>
            ) : (
              citasFiltradas.map((cita) => (
                <Card key={cita.id} className="border-l-4 border-l-barbershop-gold">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Información de la cita */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg text-barbershop-black">
                            {cita.cliente.nombre} {cita.cliente.apellidos}
                          </h3>
                          <Badge variant="outline" className="border-green-500 text-green-700">
                            Confirmada
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4 text-barbershop-gold" />
                            <span>
                              {format(new Date(cita.fecha), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="w-4 h-4 text-barbershop-gold" />
                            <span>{cita.hora}</span>
                          </div>
                        </div>
                      </div>

                      {/* Información de contacto y acciones */}
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm">
                            <Mail className="w-4 h-4 text-barbershop-gold" />
                            <span className="break-all">{cita.cliente.email}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm">
                            <Phone className="w-4 h-4 text-barbershop-gold" />
                            <span>{cita.cliente.telefono}</span>
                          </div>
                        </div>

                        {/* Botón de cancelar */}
                        <div className="flex justify-end">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-destructive border-destructive/20 hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancelar cita
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Cancelar esta cita?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción cancelará la cita de {cita.cliente.nombre} {cita.cliente.apellidos} 
                                  para el {format(new Date(cita.fecha), "d 'de' MMMM", { locale: es })} a las {cita.hora}.
                                  Esta acción no se puede deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>No cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => cancelarCita(cita.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Sí, cancelar cita
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};