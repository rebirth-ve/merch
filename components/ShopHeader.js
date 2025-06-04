import React from 'react';

const ShopHeader = ({ onNavigate, cartItemCount }) => {
  return (
    <header className="bg-black text-white p-4 shadow-lg fixed w-full z-10 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-widest cursor-pointer text-blue-400" onClick={() => onNavigate('home')}>
          REBIRTH
        </h1>
        <nav className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-lg font-medium hover:text-blue-400 transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('products')}
            className="text-lg font-medium hover:text-blue-400 transition-colors"
          >
            Productos
          </button>
          <button
            onClick={() => onNavigate('cart')}
            className="relative text-lg font-medium hover:text-blue-400 transition-colors"
          >
            Carrito
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('adminLogin')}
            className="text-lg font-medium hover:text-blue-400 transition-colors"
          >
            Admin
          </button>
        </nav>
      </div>
    </header>
  );
};

export default ShopHeader;