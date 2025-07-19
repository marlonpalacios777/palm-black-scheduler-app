import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import palmBlackLogo from "@/assets/palm-black-logo.png";

interface HorariosDisponiblesProps {
  selectedDate: Date;
  onTimeSelect: (time: string) => void;
}

// Componente que muestra los horarios disponibles para una fecha específica
export const HorariosDisponibles = ({ selectedDate, onTimeSelect }: HorariosDisponiblesProps) => {
  
  // Generar horarios de trabajo (9:00 AM - 6:00 PM, intervalos de 30 min)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) { // No agregar :30 para la última hora
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  // Obtener citas ya agendadas para la fecha seleccionada
  const getBookedSlots = () => {
    const citasStorage = localStorage.getItem('palmblack_citas');
    if (!citasStorage) return [];
    
    const citas = JSON.parse(citasStorage);
    const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
    
    return citas
      .filter((cita: any) => cita.fecha === selectedDateStr)
      .map((cita: any) => cita.hora);
  };

  const timeSlots = generateTimeSlots();
  const bookedSlots = getBookedSlots();

  return (
    <Card className="shadow-lg border-barbershop-gold/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-barbershop-black">
          <Clock className="w-5 h-5 text-barbershop-gold" />
          <span>Horarios disponibles</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {timeSlots.map((time) => {
            const isBooked = bookedSlots.includes(time);
            
            if (isBooked) {
              // Mostrar horario ocupado con miniatura
              return (
                <div
                  key={time}
                  className="relative p-3 border border-muted rounded-lg bg-muted/50 text-center cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <img 
                      src={palmBlackLogo} 
                      alt="Ocupado" 
                      className="w-6 h-6 opacity-50"
                    />
                    <UserCheck className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {time}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ocupado
                  </p>
                </div>
              );
            }

            // Mostrar horario disponible
            return (
              <Button
                key={time}
                variant="outline"
                onClick={() => onTimeSelect(time)}
                className="h-auto p-3 border-barbershop-gold/30 hover:border-barbershop-gold hover:bg-barbershop-gold/10 transition-all duration-200"
              >
                <div className="text-center">
                  <p className="font-medium text-barbershop-black">
                    {time}
                  </p>
                  <p className="text-xs text-barbershop-gold mt-1">
                    {time.endsWith(':00') 
                      ? `${time} - ${(parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`
                      : `${time} - ${time.split(':')[0]}:30`
                    }
                  </p>
                </div>
              </Button>
            );
          })}
        </div>

        {timeSlots.every(time => bookedSlots.includes(time)) && (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-lg font-medium text-muted-foreground mb-2">
              No hay horarios disponibles
            </p>
            <p className="text-sm text-muted-foreground">
              Todos los horarios para {format(selectedDate, "d 'de' MMMM", { locale: es })} están ocupados.
              <br />Por favor selecciona otra fecha.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};