import React from "react";

const Footer = ({ onSmoothScroll }) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-2">
                FM
              </div>
              <span className="text-xl font-bold">Fotoimanes</span>
            </div>
            <p className="text-gray-400">
              Transformamos tus momentos especiales en recuerdos duraderos.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  className="text-gray-400 hover:text-white transition"
                  onClick={(e) => onSmoothScroll(e, "#inicio")}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  className="text-gray-400 hover:text-white transition"
                  onClick={(e) => onSmoothScroll(e, "#galeria")}
                >
                  Galería
                </a>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="text-gray-400 hover:text-white transition"
                  onClick={(e) => onSmoothScroll(e, "#como-funciona")}
                >
                  Cómo Funciona
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Política de Envíos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-envelope text-white mr-2"></i>
                <span className="text-white">
                  pedidos.magnetico@gmail.com
                </span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-white mr-2"></i>
                <span className="text-white">+549 2254 414211</span>
              </li>
              <li className="mt-4">
                <h4 className="text-white font-medium mb-3">Síguenos</h4>
                <div className="flex gap-2">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61582249576096"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full transition duration-300 inline-flex items-center justify-center transform hover:scale-110 shadow-md"
                    title="Síguenos en Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/magnetico.fotoimanes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-10 h-10 rounded-full transition duration-300 inline-flex items-center justify-center transform hover:scale-110 shadow-md"
                    title="Síguenos en Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@magntico.fotoimane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black hover:bg-gray-800 text-white w-10 h-10 rounded-full transition duration-300 inline-flex items-center justify-center transform hover:scale-110 shadow-md"
                    title="Síguenos en TikTok"
                  >
                    <i className="fab fa-tiktok"></i>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/5492254414211?text=Hola, me interesa crear fotoimanes personalizados"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white w-10 h-10 rounded-full transition duration-300 inline-flex items-center justify-center transform hover:scale-110 shadow-md"
                    title="Contactar por WhatsApp"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Fotoimanes. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;