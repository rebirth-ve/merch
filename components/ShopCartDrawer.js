import React from 'react';

const ShopCartDrawer = ({ cartItems, onRemoveFromCart, onNavigate, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pt-24 flex flex-col items-center">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-3xl w-full border border-gray-800">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center">Tu Carrito de Compras</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-xl mb-6">Tu carrito está vacío. ¡Es hora de renovar tu estilo!</p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-lg"
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {cartItems.map((item, index) => (
                <div key={item.id + '-' + index} className="flex items-center bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mr-4 border border-gray-600"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {item.selectedSize && `Talla: ${item.selectedSize}`}
                      {item.selectedColor && ` | Color: ${item.selectedColor}`}
                    </p>
                    <span className="text-green-400 text-lg font-bold">${item.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(index)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 pt-6 mt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-3xl font-bold text-white">Total:</span>
                <span className="text-4xl font-extrabold text-green-400">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 shadow-lg"
              >
                Proceder al Pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopCartDrawer;