import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/crear-fotoimanes');
  };

  return (
    <section className="py-16 hero-bg text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para crear tus fotoimanes?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/95 drop-shadow-sm">
          Sube tus fotos ahora y en pocos días tendrás tus momentos favoritos convertidos en imanes únicos.
        </p>
        <button 
          onClick={handleCtaClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-10 rounded-full text-lg inline-block transition duration-300"
        >
          Comenzar a Crear
        </button>
      </div>
    </section>
  );
};

export default CTA;