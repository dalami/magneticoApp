import React from 'react';

const Header = ({ onCtaClick, onSmoothScroll }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
            FM
          </div>
          <span className="text-xl font-bold text-gray-800">MagnetiCo-Fotoimanes</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a 
            href="#inicio" 
            className="text-gray-600 hover:text-purple-600 font-medium"
            onClick={(e) => onSmoothScroll(e, '#inicio')}
          >
            Inicio
          </a>
          <a 
            href="#galeria" 
            className="text-gray-600 hover:text-purple-600 font-medium"
            onClick={(e) => onSmoothScroll(e, '#galeria')}
          >
            Galería
          </a>
          <a 
            href="#como-funciona" 
            className="text-gray-600 hover:text-purple-600 font-medium"
            onClick={(e) => onSmoothScroll(e, '#como-funciona')}
          >
            Cómo Funciona
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-600 font-medium">
            Precios
          </a>
        </nav>
        <a 
          href="#" 
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-medium transition duration-300"
          onClick={onCtaClick}
        >
          Crear Mis Fotoimanes
        </a>
      </div>
    </header>
  );
};

export default Header;