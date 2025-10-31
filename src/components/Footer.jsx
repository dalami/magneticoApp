import React from "react";

const Footer = ({ onSmoothScroll }) => {
  return (
    <footer className="py-12 text-white bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-8 h-8 mr-2 font-bold text-white bg-purple-600 rounded-full">
                FM
              </div>
              <span className="text-xl font-bold">Fotoimanes</span>
            </div>
            <p className="text-gray-400">
              Transformamos tus momentos especiales en recuerdos duraderos.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-400 transition hover:text-white"
                  onClick={(e) => onSmoothScroll(e, "#inicio")}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  className="text-gray-400 transition hover:text-white"
                  onClick={(e) => onSmoothScroll(e, "#galeria")}
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-gray-400 transition hover:text-white"
                  onClick={(e) => onSmoothScroll(e, "#como-funciona")}
                >
                  Cómo Funciona
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-white"
                >
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terminos-condiciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition hover:text-white"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="/politica-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition hover:text-white"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="/politica-envios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition hover:text-white"
                >
                  Política de Envíos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="mr-2 text-white fas fa-envelope"></i>
                <span className="text-white">
                  pedidos.magnetico@gmail.com
                </span>
              </li>
              <li className="flex items-center">
                <i className="mr-2 text-white fas fa-phone"></i>
                <span className="text-white">+549 2254 414211</span>
              </li>
              <li className="mt-4">
                <h4 className="mb-3 font-medium text-white">Síguenos</h4>
                <div className="flex gap-2">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61582249576096"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 text-white transition duration-300 transform bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:scale-110"
                    title="Síguenos en Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/magnetico.fotoimanes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 text-white transition duration-300 transform rounded-full shadow-md bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-110"
                    title="Síguenos en Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@magntico.fotoimane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 text-white transition duration-300 transform bg-black rounded-full shadow-md hover:bg-gray-800 hover:scale-110"
                    title="Síguenos en TikTok"
                  >
                    <i className="fab fa-tiktok"></i>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/5492254414211?text=Hola, me interesa crear fotoimanes personalizados"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 text-white transition duration-300 transform bg-green-500 rounded-full shadow-md hover:bg-green-600 hover:scale-110"
                    title="Contactar por WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-700">
          <p>&copy; 2025 Fotoimanes. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;