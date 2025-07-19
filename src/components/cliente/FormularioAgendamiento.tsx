import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Clock, MapPin, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface FormularioAgendamientoProps {
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
}

// Componente del formulario para completar el agendamiento de la cita
export const FormularioAgendamiento = ({ selectedDate, selectedTime, onBack }: FormularioAgendamientoProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  // Función para manejar cambios en los inputs
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Función para validar el formulario
  const validateForm = () => {
    const errors = [];
    
    if (!formData.nombre.trim()) errors.push("El nombre es obligatorio");
    if (!formData.apellidos.trim()) errors.push("Los apellidos son obligatorios");
    if (!formData.email.trim()) errors.push("El correo electrónico es obligatorio");
    if (!formData.telefono.trim()) errors.push("El teléfono es obligatorio");
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("El correo electrónico no es válido");
    }
    
    // Validación básica de teléfono
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (formData.telefono && !phoneRegex.test(formData.telefono)) {
      errors.push("El teléfono contiene caracteres no válidos");
    }
    
    return errors;
  };

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulario
    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Error en el formulario",
        description: errors.join(", "),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simular envío (en producción sería una API)
    setTimeout(() => {
      // Guardar cita en localStorage
      const nuevaCita = {
        id: Date.now().toString(),
        fecha: format(selectedDate, 'yyyy-MM-dd'),
        hora: selectedTime,
        cliente: formData,
        estado: 'confirmada',
        fechaCreacion: new Date().toISOString()
      };

      // Obtener citas existentes
      const citasExistentes = JSON.parse(localStorage.getItem('palmblack_citas') || '[]');
      citasExistentes.push(nuevaCita);
      localStorage.setItem('palmblack_citas', JSON.stringify(citasExistentes));

      setIsSubmitting(false);
      setIsSuccess(true);
      
      toast({
        title: "¡Cita agendada con éxito!",
        description: `Tu cita para el ${format(selectedDate, "d 'de' MMMM", { locale: es })} a las ${selectedTime} ha sido confirmada.`,
      });
    }, 1500);
  };

  // Función para agendar otra cita
  const handleNewAppointment = () => {
    setIsSuccess(false);
    setFormData({
      nombre: "",
      apellidos: "",
      email: "",
      telefono: ""
    });
    onBack();
  };

  if (isSuccess) {
    return (
      <Card className="shadow-lg border-barbershop-gold/20">
        <CardContent className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-barbershop-black mb-4">
            ¡Cita confirmada!
          </h2>
          <div className="bg-barbershop-gold/10 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-barbershop-black mb-4">Detalles de tu cita:</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CalendarDays className="w-5 h-5 text-barbershop-gold" />
                <span>{format(selectedDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-barbershop-gold" />
                <span>{selectedTime} - {selectedTime.endsWith(':30') ? selectedTime.replace(':30', ':60').replace('60', '00').replace(/^(\d+)/, (m) => (parseInt(m) + 1).toString()) : (parseInt(selectedTime.split(':')[0]) + 1).toString().padStart(2, '0') + ':00'}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-barbershop-gold mt-1" />
                <div className="text-sm">
                  <p>Palm Black Barbería</p>
                  <p className="text-muted-foreground">Cra. 37 #71c-38, El Raizal, Medellín</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            Recibirás un recordatorio por correo electrónico antes de tu cita.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={handleNewAppointment}
              className="w-full bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold/90"
            >
              Agendar otra cita
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-barbershop-gold/20">
      <CardHeader>
        <CardTitle className="text-barbershop-black text-center">
          Confirma tu cita
        </CardTitle>
        <div className="bg-barbershop-gold/10 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-center space-x-3 text-barbershop-black">
            <CalendarDays className="w-5 h-5 text-barbershop-gold" />
            <span className="font-medium">
              {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-barbershop-black">
            <Clock className="w-5 h-5 text-barbershop-gold" />
            <span className="font-medium">{selectedTime}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos del formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                required
                className="border-barbershop-gold/30 focus:border-barbershop-gold"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos *</Label>
              <Input
                id="apellidos"
                type="text"
                placeholder="Tus apellidos"
                value={formData.apellidos}
                onChange={(e) => handleInputChange('apellidos', e.target.value)}
                required
                className="border-barbershop-gold/30 focus:border-barbershop-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico *</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              className="border-barbershop-gold/30 focus:border-barbershop-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              type="tel"
              placeholder="+57 300 123 4567"
              value={formData.telefono}
              onChange={(e) => handleInputChange('telefono', e.target.value)}
              required
              className="border-barbershop-gold/30 focus:border-barbershop-gold"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col space-y-3 pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-barbershop-gold text-barbershop-black hover:bg-barbershop-gold/90 font-semibold"
            >
              {isSubmitting ? "Agendando cita..." : "Confirmar cita"}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              disabled={isSubmitting}
              className="w-full"
            >
              Cambiar horario
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};