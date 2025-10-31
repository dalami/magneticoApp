import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container max-w-4xl px-4 mx-auto">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="pb-4 mb-6 text-3xl font-bold text-gray-800 border-b">
            Política de Privacidad
          </h1>
          
          <div className="space-y-8 leading-relaxed text-gray-600">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">1. Información General</h2>
              <p>En <strong>MagnetiCo Fotoimanes</strong> nos comprometemos a proteger y respetar su privacidad. Esta política explica cómo recopilamos, usamos y protegemos su información personal.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">2. Información que Recopilamos</h2>
              <p>Podemos recopilar y procesar la siguiente información:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li><strong>Información de contacto:</strong> nombre, dirección de correo electrónico, número de teléfono</li>
                <li><strong>Información de envío:</strong> dirección de entrega, datos de facturación</li>
                <li><strong>Información de pago:</strong> datos necesarios para procesar transacciones (manejados por procesadores de pago seguros)</li>
                <li><strong>Imágenes y contenido:</strong> fotografías y archivos que usted sube para personalizar nuestros productos</li>
                <li><strong>Información técnica:</strong> dirección IP, tipo de navegador, páginas visitadas</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">3. Uso de la Información</h2>
              <p>Utilizamos su información para:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li>Procesar y enviar sus pedidos</li>
                <li>Personalizar los productos según sus especificaciones</li>
                <li>Comunicarnos sobre el estado de sus pedidos</li>
                <li>Brindar soporte al cliente</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">4. Protección de Datos</h2>
              <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">5. Compartir Información</h2>
              <p>No vendemos, comerciamos ni transferimos su información personal a terceros, excepto en los siguientes casos:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li>Proveedores de servicios de pago (Mercado Pago, etc.)</li>
                <li>Empresas de transporte y logística</li>
                <li>Cuando sea requerido por ley o para proteger nuestros derechos</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">6. Derechos del Usuario</h2>
              <p>Usted tiene derecho a:</p>
              <ul className="mt-2 ml-4 space-y-2 list-disc list-inside">
                <li>Acceder a su información personal</li>
                <li>Rectificar datos inexactos</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al procesamiento de sus datos</li>
                <li>Solicitar la portabilidad de sus datos</li>
              </ul>
              <p className="mt-2">Para ejercer estos derechos, contáctenos a: <span className="text-purple-600">pedidos.magnetico@gmail.com</span></p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">7. Conservación de Datos</h2>
              <p>Conservamos su información personal solo durante el tiempo necesario para cumplir con los fines descritos en esta política, a menos que la ley requiera un período de conservación más largo.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">8. Cookies y Tecnologías Similares</h2>
              <p>Utilizamos cookies para mejorar su experiencia en nuestro sitio web, analizar el tráfico y personalizar contenido. Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">9. Cambios en la Política de Privacidad</h2>
              <p>Nos reservamos el derecho de modificar esta política en cualquier momento. Las actualizaciones se publicarán en esta página con la fecha de última modificación.</p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-800">10. Contacto</h2>
              <p>Si tiene preguntas sobre esta Política de Privacidad, contáctenos en:</p>
              <div className="mt-2 space-y-1">
                <p><strong>Email:</strong> pedidos.magnetico@gmail.com</p>
                <p><strong>Sitio web:</strong> www.magnetico-fotoimanes.com</p>
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

export default PrivacyPolicy;