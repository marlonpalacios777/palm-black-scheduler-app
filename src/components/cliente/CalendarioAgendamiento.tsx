import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { FormularioAgendamiento } from "./FormularioAgendamiento";
import { HorariosDisponibles } from "./HorariosDisponibles";
import palmBlackLogo from "@/assets/palm-black-logo.png";

// Componente principal del calendario de agendamiento
export const CalendarioAgendamiento = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  // Función para manejar la selección de fecha
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(""); // Resetear hora seleccionada
    setShowForm(false);  // Ocultar formulario
  };

  // Función para manejar la selección de hora
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowForm(true);
  };

  // Función para volver al calendario
  const handleBackToCalendar = () => {
    setShowForm(false);
    setSelectedTime("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-barbershop-cream to-background">
      {/* Header elegante */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-barbershop-gold/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4">
            <img src={palmBlackLogo} alt="Palm Black" className="w-12 h-12" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-barbershop-black">Palm Black</h1>
              <p className="text-barbershop-gold text-sm">Agenda tu cita</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {!showForm ? (
          // Vista del calendario y horarios
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Calendario */}
            <Card className="shadow-lg border-barbershop-gold/20">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2 text-barbershop-black">
                  <CalendarDays className="w-5 h-5 text-barbershop-gold" />
                  <span>Selecciona tu fecha</span>
                </CardTitle>
                <CardDescription>
                  Elige el día para tu cita en Palm Black
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border border-barbershop-gold/20"
                  locale={es}
                />
              </CardContent>
            </Card>

            {/* Información de la cita y horarios */}
            <div className="space-y-6">
              {selectedDate && (
                <>
                  {/* Información de la barbería */}
                  <Card className="shadow-lg border-barbershop-gold/20">
                    <CardHeader>
                      <CardTitle className="text-barbershop-black">Palm Black Barbería</CardTitle>
                      <CardDescription className="text-barbershop-gold font-medium">
                        {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-barbershop-gold mt-1" />
                        <div>
                          <p className="font-medium text-barbershop-black">Zona horaria</p>
                          <p className="text-sm text-muted-foreground">
                            (GMT-05:00) Hora estándar de Colombia
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-barbershop-gold mt-1" />
                        <div>
                          <p className="font-medium text-barbershop-black">Dirección</p>
                          <p className="text-sm text-muted-foreground">
                            Cra. 37 #71c-38, El Raizal<br />
                            Medellín, Antioquia, Colombia
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Horarios disponibles */}
                  <HorariosDisponibles 
                    selectedDate={selectedDate}
                    onTimeSelect={handleTimeSelect}
                  />
                </>
              )}

              {!selectedDate && (
                <Card className="shadow-lg border-barbershop-gold/20">
                  <CardContent className="text-center py-12">
                    <CalendarDays className="w-16 h-16 text-barbershop-gold/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-barbershop-black mb-2">
                      Selecciona una fecha
                    </h3>
                    <p className="text-muted-foreground">
                      Elige una fecha en el calendario para ver los horarios disponibles
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          // Vista del formulario de agendamiento
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Button 
                variant="outline" 
                onClick={handleBackToCalendar}
                className="mb-4"
              >
                ← Volver al calendario
              </Button>
            </div>
            
            <FormularioAgendamiento 
              selectedDate={selectedDate!}
              selectedTime={selectedTime}
              onBack={handleBackToCalendar}
            />
          </div>
        )}
      </div>
    </div>
  );
};