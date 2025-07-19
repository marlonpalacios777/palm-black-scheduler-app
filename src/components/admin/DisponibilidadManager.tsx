import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Clock, Calendar, Save, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DisponibilidadDia {
  activo: boolean;
  horaInicio: string;
  horaFin: string;
  descanso: {
    activo: boolean;
    horaInicio: string;
    horaFin: string;
  };
}

interface Disponibilidad {
  lunes: DisponibilidadDia;
  martes: DisponibilidadDia;
  miercoles: DisponibilidadDia;
  jueves: DisponibilidadDia;
  viernes: DisponibilidadDia;
  sabado: DisponibilidadDia;
  domingo: DisponibilidadDia;
}

// Componente para gestionar la disponibilidad del barbero
export const DisponibilidadManager = () => {
  const { toast } = useToast();

  // Configuración por defecto
  const disponibilidadPorDefecto: Disponibilidad = {
    lunes: { activo: true, horaInicio: "09:00", horaFin: "18:00", descanso: { activo: true, horaInicio: "12:00", horaFin: "13:00" } },
    martes: { activo: true, horaInicio: "09:00", horaFin: "18:00", descanso: { activo: true, horaInicio: "12:00", horaFin: "13:00" } },
    miercoles: { activo: true, horaInicio: "09:00", horaFin: "18:00", descanso: { activo: true, horaInicio: "12:00", horaFin: "13:00" } },
    jueves: { activo: true, horaInicio: "09:00", horaFin: "18:00", descanso: { activo: true, horaInicio: "12:00", horaFin: "13:00" } },
    viernes: { activo: true, horaInicio: "09:00", horaFin: "18:00", descanso: { activo: true, horaInicio: "12:00", horaFin: "13:00" } },
    sabado: { activo: true, horaInicio: "08:00", horaFin: "17:00", descanso: { activo: true, horaInicio: "12:00", horaFin: "13:00" } },
    domingo: { activo: false, horaInicio: "10:00", horaFin: "16:00", descanso: { activo: false, horaInicio: "12:00", horaFin: "13:00" } }
  };

  const [disponibilidad, setDisponibilidad] = useState<Disponibilidad>(disponibilidadPorDefecto);
  const [hasChanges, setHasChanges] = useState(false);

  // Cargar disponibilidad desde localStorage
  useEffect(() => {
    const disponibilidadGuardada = localStorage.getItem('palmblack_disponibilidad');
    if (disponibilidadGuardada) {
      setDisponibilidad(JSON.parse(disponibilidadGuardada));
    }
  }, []);

  // Función para actualizar disponibilidad de un día
  const updateDisponibilidad = (dia: keyof Disponibilidad, campo: string, valor: any) => {
    setDisponibilidad(prev => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        ...(campo.includes('.') 
          ? { descanso: { ...prev[dia].descanso, [campo.split('.')[1]]: valor } }
          : { [campo]: valor }
        )
      }
    }));
    setHasChanges(true);
  };

  // Función para guardar cambios
  const guardarCambios = () => {
    localStorage.setItem('palmblack_disponibilidad', JSON.stringify(disponibilidad));
    setHasChanges(false);
    toast({
      title: "Disponibilidad actualizada",
      description: "Los cambios han sido guardados correctamente",
    });
  };

  // Función para resetear a valores por defecto
  const resetearDisponibilidad = () => {
    setDisponibilidad(disponibilidadPorDefecto);
    setHasChanges(true);
  };

  // Función para generar horarios disponibles
  const generarHorarios = (inicio: string, fin: string, descanso?: { horaInicio: string; horaFin: string; activo: boolean }) => {
    const horarios = [];
    const [horaInicio, minInicio] = inicio.split(':').map(Number);
    const [horaFin, minFin] = fin.split(':').map(Number);
    
    let hora = horaInicio;
    let min = minInicio;
    
    while (hora < horaFin || (hora === horaFin && min < minFin)) {
      const horaStr = `${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      
      // Verificar si está en horario de descanso
      const enDescanso = descanso?.activo && 
        horaStr >= descanso.horaInicio && 
        horaStr < descanso.horaFin;
      
      if (!enDescanso) {
        horarios.push(horaStr);
      }
      
      // Incrementar 30 minutos
      min += 30;
      if (min >= 60) {
        hora += 1;
        min = 0;
      }
    }
    
    return horarios;
  };

  const diasSemana = [
    { key: 'lunes' as keyof Disponibilidad, label: 'Lunes' },
    { key: 'martes' as keyof Disponibilidad, label: 'Martes' },
    { key: 'miercoles' as keyof Disponibilidad, label: 'Miércoles' },
    { key: 'jueves' as keyof Disponibilidad, label: 'Jueves' },
    { key: 'viernes' as keyof Disponibilidad, label: 'Viernes' },
    { key: 'sabado' as keyof Disponibilidad, label: 'Sábado' },
    { key: 'domingo' as keyof Disponibilidad, label: 'Domingo' }
  ];

  return (
    <div className="space-y-6">
      {/* Header con acciones */}
      <Card className="border-barbershop-gold/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2 text-barbershop-black">
                <Clock className="w-5 h-5 text-barbershop-gold" />
                <span>Gestionar Disponibilidad</span>
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Configura tus horarios de trabajo para cada día de la semana
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={resetearDisponibilidad}
                size="sm"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Resetear
              </Button>
              
              <Button 
                onClick={guardarCambios}
                disabled={!hasChanges}
                className="bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold/90"
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar cambios
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Configuración por día */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {diasSemana.map(({ key, label }) => {
          const diaConfig = disponibilidad[key];
          const horarios = diaConfig.activo 
            ? generarHorarios(diaConfig.horaInicio, diaConfig.horaFin, diaConfig.descanso)
            : [];

          return (
            <Card key={key} className="border-barbershop-gold/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-barbershop-black">{label}</h3>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={`${key}-activo`} className="text-sm">
                      {diaConfig.activo ? 'Abierto' : 'Cerrado'}
                    </Label>
                    <Switch
                      id={`${key}-activo`}
                      checked={diaConfig.activo}
                      onCheckedChange={(checked) => updateDisponibilidad(key, 'activo', checked)}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {diaConfig.activo ? (
                  <>
                    {/* Horarios de trabajo */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">Hora de inicio</Label>
                        <input
                          type="time"
                          value={diaConfig.horaInicio}
                          onChange={(e) => updateDisponibilidad(key, 'horaInicio', e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-barbershop-gold/30 rounded-md focus:border-barbershop-gold focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm">Hora de fin</Label>
                        <input
                          type="time"
                          value={diaConfig.horaFin}
                          onChange={(e) => updateDisponibilidad(key, 'horaFin', e.target.value)}
                          className="w-full mt-1 px-3 py-2 border border-barbershop-gold/30 rounded-md focus:border-barbershop-gold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Descanso */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Horario de descanso</Label>
                        <Switch
                          checked={diaConfig.descanso.activo}
                          onCheckedChange={(checked) => updateDisponibilidad(key, 'descanso.activo', checked)}
                        />
                      </div>
                      
                      {diaConfig.descanso.activo && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Inicio descanso</Label>
                            <input
                              type="time"
                              value={diaConfig.descanso.horaInicio}
                              onChange={(e) => updateDisponibilidad(key, 'descanso.horaInicio', e.target.value)}
                              className="w-full mt-1 px-2 py-1 text-sm border border-barbershop-gold/30 rounded focus:border-barbershop-gold focus:outline-none"
                            />
                          </div>
                          
                          <div>
                            <Label className="text-xs text-muted-foreground">Fin descanso</Label>
                            <input
                              type="time"
                              value={diaConfig.descanso.horaFin}
                              onChange={(e) => updateDisponibilidad(key, 'descanso.horaFin', e.target.value)}
                              className="w-full mt-1 px-2 py-1 text-sm border border-barbershop-gold/30 rounded focus:border-barbershop-gold focus:outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Vista previa de horarios */}
                    <div className="border-t pt-4">
                      <Label className="text-sm font-medium mb-2 block">
                        Horarios disponibles ({horarios.length} slots)
                      </Label>
                      <div className="flex flex-wrap gap-1">
                        {horarios.slice(0, 8).map((hora, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {hora}
                          </Badge>
                        ))}
                        {horarios.length > 8 && (
                          <Badge variant="secondary" className="text-xs">
                            +{horarios.length - 8} más
                          </Badge>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Día no laborable</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumen semanal */}
      <Card className="border-barbershop-gold/20">
        <CardHeader>
          <CardTitle className="text-barbershop-black">Resumen Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-barbershop-gold">
                {diasSemana.filter(({ key }) => disponibilidad[key].activo).length}
              </p>
              <p className="text-sm text-muted-foreground">Días laborables</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-barbershop-gold">
                {diasSemana.reduce((total, { key }) => {
                  const dia = disponibilidad[key];
                  if (!dia.activo) return total;
                  return total + generarHorarios(dia.horaInicio, dia.horaFin, dia.descanso).length;
                }, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Slots semanales</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-barbershop-gold">
                {diasSemana.filter(({ key }) => disponibilidad[key].descanso.activo && disponibilidad[key].activo).length}
              </p>
              <p className="text-sm text-muted-foreground">Días con descanso</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};