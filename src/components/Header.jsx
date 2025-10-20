import React from 'react';
import { useNavigate } from 'react-router-dom';


const Header = ({ onCtaClick, onSmoothScroll }) => {
  const navigate = useNavigate();

  const handleCtaClick = (e) => {
    e.preventDefault();
    // Navegar a la ruta de creación de fotoimanes
    navigate('/crear-fotoimanes');
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
             src="/logo.png"
            alt="MagnetiCo Logo" 
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <span className="text-xl font-bold text-gray-800">MagnetiCo-Fotoimanes</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a 
            href="#inicio" 
            className="text-gray-600 hover:text-purple-600 font-medium"
            onClick={(e) => handleSmoothScroll(e, '#inicio')}
          >
            Inicio
          </a>
          <a 
            href="#galeria" 
            className="text-gray-600 hover:text-purple-600 font-medium"
            onClick={(e) => handleSmoothScroll(e, '#galeria')}
          >
            Galería
          </a>
          <a 
            href="#como-funciona" 
            className="text-gray-600 hover:text-purple-600 font-medium"
            onClick={(e) => handleSmoothScroll(e, '#como-funciona')}
          >
            Cómo Funciona
          </a>
          <a 
            href="#precios" 
            className="text-gray-600 hover:text-purple-600 font-medium"
            onClick={(e) => handleSmoothScroll(e, '#precios')}
          >
            Precios
          </a>
        </nav>
        
        <button 
          onClick={handleCtaClick}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition duration-300"
        >
          Crear Mis Fotoimanes
        </button>
      </div>
    </header>
  );
};

export default Header;