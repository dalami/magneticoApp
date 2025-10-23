import React from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/crear-fotoimanes');
  };

  const galleryItems = [
  { id: 1, title: 'Familia', bgColor: 'bg-purple-200', image: '/images/familia.jpeg' },
  { id: 2, title: 'Mascotas', bgColor: 'bg-blue-200', image: '/images/mascotas.jpeg' },
  { id: 3, title: 'Bodas', bgColor: 'bg-green-200', image: '/images/boda.jpeg' },
  { id: 4, title: 'Viajes', bgColor: 'bg-yellow-200', image: '/images/viajes.jpeg' },
  { id: 5, title: 'Amigos', bgColor: 'bg-red-200', image: '/images/amigos.jpeg' },
  { id: 6, title: 'Eventos', bgColor: 'bg-indigo-200', image: '/images/eventos.jpeg' },
  { id: 7, title: 'Corporativo', bgColor: 'bg-pink-200', image: '/images/corporativo.jpeg' },
  { id: 8, title: 'Vacaciones', bgColor: 'bg-teal-200', image: '/images/vacaciones.jpeg' }
];

  return (
    <section id="galeria" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Nuestros Fotoimanes</h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Descubre la variedad de diseños y estilos que puedes crear con tus fotos favoritas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full h-64 relative group">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-medium text-lg">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleCtaClick}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full inline-block transition duration-300"
          >
            Crear Mis Fotoimanes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;