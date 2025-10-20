import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-award',
      color: 'purple',
      title: 'Alta Calidad',
      description: 'Impresión nítida y colores vibrantes que duran.'
    },
    {
      icon: 'fas fa-shield-alt',
      color: 'blue',
      title: 'Resistentes',
      description: 'Material duradero que mantiene su forma y adhesión.'
    },
    {
      icon: 'fas fa-shipping-fast',
      color: 'green',
      title: 'Entrega Rápida',
      description: 'Recibe tus pedidos en tiempo récord.'
    },
    {
      icon: 'fas fa-lock',
      color: 'yellow',
      title: 'Pago Seguro',
      description: 'Transacciones protegidas y datos cifrados.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">¿Por Qué Elegir Nuestros Fotoimanes?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <i className={`${feature.icon} text-${feature.color}-600 text-2xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;