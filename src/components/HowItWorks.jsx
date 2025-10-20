import React from 'react';

const HowItWorks = ({ onCtaClick }) => {
  const steps = [
    {
      icon: 'fas fa-cloud-upload-alt',
      color: 'purple',
      title: '1. Sube tus fotos',
      description: 'Selecciona las mejores fotos desde tu dispositivo. Aceptamos los formatos más comunes.'
    },
    {
      icon: 'fas fa-edit',
      color: 'blue',
      title: '2. Personaliza',
      description: 'Elige el tamaño, forma y cantidad. Añade textos o marcos si lo deseas.'
    },
    {
      icon: 'fas fa-shipping-fast',
      color: 'green',
      title: '3. Recibe en casa',
      description: 'Realiza el pago de forma segura y recibe tus fotoimanes en la puerta de tu hogar.'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Cómo Crear Tus Fotoimanes</h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Solo necesitas seguir estos 3 simples pasos para tener tus fotoimanes personalizados.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="step-card bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className={`w-20 h-20 bg-${step.color}-100 rounded-full flex items-center justify-center mx-auto mb-6`}>
                <i className={`${step.icon} text-${step.color}-600 text-3xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="#" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full inline-block transition duration-300"
            onClick={onCtaClick}
          >
            Comenzar Ahora
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;