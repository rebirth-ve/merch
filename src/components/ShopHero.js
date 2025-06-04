import React from 'react';

const ShopHero = ({ onNavigate }) => {
  return (
    <div className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080/0a0a0a/FFFFFF?text=Rebirth+Collection)' }}>
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 text-center p-8">
        <h2 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up text-blue-400">
          REBIRTH
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 font-light text-gray-300">
          Renueva tu estilo, renace tu actitud.
          Descubre la colección que redefine el streetwear.
        </p>
        <button
          onClick={() => onNavigate('products')}
          className="bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-up animation-delay-400"
        >
          Explorar Colección
        </button>
      </div>
    </div>
  );
};

export default ShopHero;