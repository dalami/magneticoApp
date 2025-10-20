import React from 'react';

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
            <p className="text-gray-400">Transformamos tus momentos especiales en recuerdos duraderos.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#inicio" 
                  className="text-gray-400 hover:text-white transition"
                  onClick={(e) => onSmoothScroll(e, '#inicio')}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="#galeria" 
                  className="text-gray-400 hover:text-white transition"
                  onClick={(e) => onSmoothScroll(e, '#galeria')}
                >
                  Galería
                </a>
              </li>
              <li>
                <a 
                  href="#como-funciona" 
                  className="text-gray-400 hover:text-white transition"
                  onClick={(e) => onSmoothScroll(e, '#como-funciona')}
                >
                  Cómo Funciona
                </a>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Términos y Condiciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidad</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Política de Envíos</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <i className="fas fa-envelope text-gray-400 mr-2"></i>
                <span className="text-gray-400">pedidos.magnetico@gmail.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone text-gray-400 mr-2"></i>
                <span className="text-gray-400">+549 2254 414211</span>
              </li>
              <li className="flex items-center mt-4">
                <a href="#" className="text-gray-400 hover:text-white mr-4">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white mr-4">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-whatsapp"></i>
                </a>
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