import React from 'react';

const ShopProductCard = ({ product, onAddToCart, onNavigateToDetail }) => {
  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 border border-gray-800">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover cursor-pointer border-b border-gray-800"
        onClick={() => onNavigateToDetail(product.id)}
      />
      <div className="p-5">
        <h3
          className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-blue-400 transition-colors"
          onClick={() => onNavigateToDetail(product.id)}
        >
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-extrabold text-green-400">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-lg"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;