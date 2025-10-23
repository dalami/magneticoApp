import React from 'react';
import { useNavigate } from 'react-router-dom';



const Hero = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
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
    <section id="inicio" className="hero-bg text-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transforma tus momentos en <span className="text-yellow-300">imanes únicos</span>
          </h1>
         <p className="text-xl mb-8 text-white/95 drop-shadow-sm">
            Crea imanes personalizados con tus fotos favoritas en simples pasos. Calidad premium y entrega rápida.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleCtaClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg text-center transition duration-300"
            >
              Comenzar Ahora
            </button>
            <a 
              href="#galeria"
              onClick={(e) => handleSmoothScroll(e, '#galeria')}
              className="border-2 border-white hover:bg-white hover:text-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg text-center transition duration-300"
            >
              Ver Ejemplos
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative w-full max-w-lg">
            <video className="w-full h-78 object-cover rounded-2xl shadow-2xl" autoPlay muted loop playsInline>
              <source src="/images/2.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;