import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="pb-4 mb-6 text-3xl font-bold text-gray-800 border-b">
            Términos y Condiciones de Uso
          </h1>
          
          <div className="space-y-8 leading-relaxed text-gray-600">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">1. Identidad del Titular</h2>
              <p>El sitio <span className="font-medium text-purple-600">www.magnetico-fotoimanes.com</span> es propiedad de <strong>MagnetiCo Fotoimanes</strong>, emprendimiento dedicado a la producción y venta de imanes fotográficos personalizados y productos relacionados.</p>
              <div className="mt-2 space-y-1">
                <p><strong>Correo de contacto:</strong> pedidos.magnetico@gmail.com</p>
                <p><strong>Ubicación:</strong> Argentina</p>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">2. Aceptación de los Términos</h2>
              <p>Al acceder al sitio o realizar una compra, el usuario declara haber leído, entendido y aceptado los presentes Términos y Condiciones. En caso de no estar de acuerdo, deberá abstenerse de utilizar el sitio.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">3. Productos y Personalización</h2>
              <p>Nuestros productos son personalizados, creados a partir de las imágenes que el cliente carga o envía.</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li>El cliente es responsable del contenido de las imágenes y declara tener los derechos de uso.</li>
                <li>MagnetiCo Fotoimanes no se responsabiliza por el uso indebido de imágenes protegidas por derechos de autor.</li>
                <li>Los colores y tonalidades pueden variar levemente respecto a la visualización digital, debido a diferencias de calibración de pantallas e impresión.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">4. Proceso de Compra</h2>
              <ol className="ml-4 space-y-2 list-decimal list-inside">
                <li>El usuario selecciona el producto deseado y carga sus imágenes.</li>
                <li>Completa los datos de envío y pago.</li>
                <li>Una vez acreditado el pago, el pedido entra en proceso de producción.</li>
                <li>Los tiempos de entrega varían según el destino y volumen del pedido.</li>
              </ol>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">5. Precios y Formas de Pago</h2>
              <p>Todos los precios están expresados en pesos argentinos (ARS) e incluyen impuestos cuando corresponde.</p>
              <p>Los pagos pueden realizarse mediante los métodos disponibles en el sitio (Mercado Pago, transferencias bancarias u otros medios habilitados).</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">6. Envíos</h2>
              <ul className="ml-4 space-y-2 list-disc list-inside">
                <li>Realizamos envíos a todo el país a través de servicios de mensajería o correo postal.</li>
                <li>El envío se coordina entre las partes y debe ser abonado por el comprador.</li>
                <li>MagnetiCo Fotoimanes no se responsabiliza por demoras ocasionadas por el servicio de transporte una vez despachado el pedido.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">7. Cambios y Devoluciones</h2>
              <p className="mb-3">Dado que los productos son personalizados, no se aceptan devoluciones ni cambios, salvo en los siguientes casos:</p>
              <ul className="mb-3 ml-4 space-y-2 list-disc list-inside">
                <li>Error de impresión atribuible a MagnetiCo Fotoimanes.</li>
                <li>Producto dañado durante el envío (debe reportarse dentro de las 48 hs de recibido).</li>
              </ul>
              <p>En estos casos, se deberá enviar evidencia fotográfica al correo <span className="text-purple-600">pedidos.magnetico@gmail.com</span> y se procederá a la reposición sin costo.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">8. Propiedad Intelectual</h2>
              <p>Todo el contenido del sitio (textos, imágenes, logos, diseño, fotografías de muestra) pertenece a MagnetiCo Fotoimanes y está protegido por leyes de propiedad intelectual.</p>
              <p>Está prohibida su reproducción total o parcial sin autorización expresa.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">9. Privacidad y Protección de Datos</h2>
              <p>Respetamos la privacidad de nuestros usuarios. La información personal recopilada se utiliza únicamente para procesar pedidos, realizar envíos y mejorar la experiencia del cliente.</p>
              <p>Más detalles en nuestra <a href="/politica-privacidad" className="text-purple-600 underline hover:text-purple-800">Política de Privacidad</a>.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">10. Limitación de Responsabilidad</h2>
              <p>MagnetiCo Fotoimanes no será responsable por daños directos o indirectos derivados del uso del sitio o de los productos, más allá de los límites establecidos por la ley.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">11. Modificaciones</h2>
              <p>Nos reservamos el derecho de modificar en cualquier momento los presentes Términos y Condiciones. Las modificaciones entrarán en vigencia a partir de su publicación en el sitio.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">12. Ley Aplicable y Jurisdicción</h2>
              <p>Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier controversia será sometida a los tribunales competentes del país.</p>
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

export default TermsAndConditions;