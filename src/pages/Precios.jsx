import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Precios = () => {
  const [planSeleccionado, setPlanSeleccionado] = useState("basico");
  const navigate = useNavigate();

  const planes = [
    {
      id: "basico",
      nombre: "Básico",
      precio: 16000,
      precioOriginal: 16000,
      cantidad: 4,
      descripcion: "Ideal para comenzar",
      caracteristicas: [
        "4 fotoimanes personalizados",
        "Material premium incluido",
        "Medida 78 x 53 mm",
        "Entrega estándar",
        "Calidad profesional garantizada",
        "Envío a coordinar",
      ],
      popular: false,
      color: "blue",
    },
    {
      id: "estandar",
      nombre: "Estándar",
      precio: 140000,
      precioOriginal: 160000,
      cantidad: 40,
      descuento: 13,
      descripcion: "El más elegido",
      caracteristicas: [
        "40 fotoimanes personalizados",
        "Material premium incluido",
        "Medida 78 x 53 mm",
        "Entrega estándar",
        "Calidad profesional garantizada",
        "Ahorro por cantidad",
        "Envío a coordinar",
      ],
      popular: true,
      color: "purple",
    },
    {
      id: "premium",
      nombre: "Premium",
      precio: 300000,
      precioOriginal: 400000,
      cantidad: 100,
      descuento: 25,
      descripcion: "Máximo valor",
      caracteristicas: [
        "100 fotoimanes personalizados",
        "Material premium incluido",
        "Medida 78 x 53 mm",
        "Entrega estándar",
        "Calidad profesional garantizada",
        "Máximo ahorro por volumen",
        "Envío a coordinar",
      ],
      popular: false,
      color: "green",
    },
  ];

  const handleComprar = (plan) => {
    console.log("🎯 Botón clickeado - Plan:", plan.nombre);

    navigate("/crear-fotoimanes", {
      state: {
        planSeleccionado: {
          plan: plan.nombre,
          cantidad: plan.cantidad,
          precio_total: plan.precio,
          precio_original: plan.precioOriginal,
          descuento: plan.descuento || 0,
          precio_unitario: plan.precio / plan.cantidad,
        },
      },
    });
  };

  // 🔥 NUEVA FUNCIÓN PARA VOLVER
  const handleVolver = () => {
    navigate(-1); // Vuelve a la página anterior
    // O si prefieres ir a una página específica:
    // navigate('/'); // Para ir al home
    // navigate('/inicio'); // Para ir a una página específica
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-500 text-blue-800",
      purple: "bg-purple-50 border-purple-500 text-purple-800",
      green: "bg-green-50 border-green-500 text-green-800",
    };
    return colors[color] || colors.blue;
  };

  const getButtonColor = (color) => {
    const colors = {
      blue: "bg-blue-600 hover:bg-blue-700",
      purple: "bg-purple-600 hover:bg-purple-700",
      green: "bg-green-600 hover:bg-green-700",
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="precios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* 🔥 BOTÓN VOLVER AGREGADO */}
        <div className="mb-8">
          <button
            onClick={handleVolver}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition duration-300 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver
          </button>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            “Imanes premium, precios magnéticos 💫”
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elige la cantidad que necesitas. Todos incluyen material premium,
            misma medida y calidad garantizada.
          </p>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-yellow-800 font-medium">
              📦 <strong>Envío:</strong> El costo de envío se coordina
              directamente con el vendedor según tu ubicación.
            </p>
          </div>
        </div>

        {/* Resto del código se mantiene igual */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 ${
                plan.popular
                  ? "border-purple-500 transform scale-105 shadow-xl"
                  : "border-gray-200"
              } bg-white p-8 transition-all duration-300 hover:shadow-lg`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}

              {plan.descuento && (
                <div className="absolute -top-2 -right-2">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {plan.descuento}% OFF
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.nombre}
                </h3>
                <p className="text-gray-600 mb-4">{plan.descripcion}</p>

                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-800">
                    {formatPrice(plan.precio)}
                  </span>
                </div>

                {plan.descuento && (
                  <div className="mb-2">
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(plan.precioOriginal)}
                    </span>
                    <span className="ml-2 text-sm font-semibold text-green-600">
                      Ahorrás {formatPrice(plan.precioOriginal - plan.precio)}
                    </span>
                  </div>
                )}

                <div className="text-sm text-gray-600">
                  {formatPrice(plan.precio / plan.cantidad)} por fotoimán
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.caracteristicas.map((caracteristica, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span className="text-gray-700">{caracteristica}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleComprar(plan)}
                className={`w-full py-3 px-6 rounded-full text-white font-medium transition duration-300 ${
                  plan.popular
                    ? "bg-purple-600 hover:bg-purple-700"
                    : getButtonColor(plan.color)
                }`}
              >
                Comprar {plan.nombre}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            ¿Necesitas una cantidad diferente?
          </h3>
          <p className="text-gray-600 mb-6">
            Contáctanos por WhatsApp para pedidos personalizados
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/5492254414211?text=Hola!%20Me%20interesa%20solicitar%20un%20presupuesto%20personalizado%20para%20fotoimanes",
                  "_blank"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.464" />
              </svg>
              WhatsApp Presupuesto
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/5492254414211?text=Hola!%20Tengo%20una%20consulta%20sobre%20los%20fotoimanes",
                  "_blank"
                )
              }
              className="border border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full font-medium transition duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.189-1.248-6.189-3.515-8.464" />
              </svg>
              WhatsApp Consultas
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Precios;
