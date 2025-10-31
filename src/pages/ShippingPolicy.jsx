import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="pb-4 mb-6 text-3xl font-bold text-gray-800 border-b">
            Política de Envíos
          </h1>
          
          <div className="space-y-8 leading-relaxed text-gray-600">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">1. Áreas de Cobertura</h2>
              <p>Realizamos envíos Nacionales e Internacionales a través de servicios de mensajería y correo postal.</p>
              <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-blue-50">
                  <h3 className="mb-2 font-semibold text-blue-800">Envíos Estándar</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Capital Federal y GBA: Consultar</li>
                    <li>• Internacional: Consultar</li>
                    <li>• Interior del país: Consultar</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <h3 className="mb-2 font-semibold text-green-800">Envíos Express</h3>
                  <p className="text-sm">Disponible para algunas zonas - Consultar disponibilidad y costo adicional.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">2. Tiempos de Procesamiento</h2>
              <p>Todos los pedidos personalizados requieren un tiempo de producción antes del envío:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li><strong>Procesamiento estándar:</strong> 1-2 días hábiles</li>
                <li><strong>Pedidos complejos o grandes volúmenes:</strong> 3-5 días hábiles</li>
                <li><strong>Pedidos express:</strong> 24 horas (sujeto a disponibilidad)</li>
              </ul>
              <p className="mt-2 text-sm text-blue-600">Los tiempos comienzan a contar una vez confirmado el pago.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">3. Costos de Envío</h2>
              <p>El costo del envío se calcula en base a:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li>Ubicación del destinatario</li>
                <li>Peso y dimensiones del paquete</li>
                <li>Método de envío seleccionado</li>
                <li>Urgencia del pedido</li>
              </ul>
              <p className="mt-2">Los costos exactos se coordinaran con el vendedor.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">4. Seguimiento de Pedidos</h2>
              <p>Una vez despachado su pedido, recibirá por email:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li>Número de seguimiento</li>
                <li>Enlace para rastrear su paquete en tiempo real</li>
                <li>Información de contacto de la empresa de transporte</li>
                <li>Fecha estimada de entrega</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">5. Recepción del Pedido</h2>
              <div className="p-4 mb-4 border-l-4 border-yellow-400 bg-yellow-50">
                <p className="font-medium text-yellow-700">¡Importante!</p>
                <p className="mt-1 text-sm text-yellow-600">Verifique el estado del paquete al recibirlo. En caso de daños evidentes, no acepte el pedido y contáctenos inmediatamente.</p>
              </div>
              <p>Recomendaciones para la recepción:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li>Revise el paquete antes de firmar el recibo</li>
                <li>Verifique que coincida con su pedido</li>
                <li>En caso de irregularidades, tome fotografías como evidencia</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">6. Incidencias en la Entrega</h2>
              <p>Si experimenta problemas con la entrega:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li><strong>Paquete no recibido:</strong> Contáctenos dentro de los 5 días hábiles posteriores a la fecha estimada</li>
                <li><strong>Paquete dañado:</strong> Reporte dentro de las 48 horas con fotografía como evidencia</li>
                <li><strong>Error en la dirección:</strong> Notifique de inmediato para corregir la información</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">7. Política de Reembolsos por Envíos</h2>
              <p>En caso de cancelación antes del envío, se reembolsará el monto total menos los costos de procesamiento incurridos.</p>
              <p>Una vez despachado el pedido, no se realizan reembolsos por cambios de opinión, dado el carácter personalizado de nuestros productos.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">8. Contacto y Soporte</h2>
              <p>Para consultas sobre envíos:</p>
              <div className="mt-2 space-y-1">
                <p><strong>Email:</strong> pedidos.magnetico@gmail.com</p>
                <p><strong>WhatsApp:</strong> +54 9 2254 41-4211</p>
                <p><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 a 18:00 hs</p>
              </div>
            </section>
          </div>

          <div className="pt-6 mt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Última actualización: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;