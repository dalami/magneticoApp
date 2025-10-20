import React from 'react';

const Hero = ({ onCtaClick, onSmoothScroll }) => {
  return (
    <section id="inicio" className="hero-bg text-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transforma tus momentos en <span className="text-yellow-300">imanes únicos</span>
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Crea imanes personalizados con tus fotos favoritas en simples pasos. Calidad premium y entrega rápida.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg text-center transition duration-300"
              onClick={onCtaClick}
            >
              Comenzar Ahora
            </a>
            <a 
              href="#galeria" 
              className="border-2 border-white hover:bg-white hover:text-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg text-center transition duration-300"
              onClick={(e) => onSmoothScroll(e, '#galeria')}
            >
              Ver Ejemplos
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative w-full max-w-lg">
            <div className="bg-black bg-opacity-20 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-78 bg-gray-800 rounded-2xl shadow-2xl flex items-center justify-center text-white">
                <p>Vista previa del video</p>
              </div>
            </div>
          </div>
          {/* Elementos decorativos */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-400 rounded-full opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;