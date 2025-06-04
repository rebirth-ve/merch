import React, { useState, useEffect } from 'react';

const ShopProductDetail = ({ productId, products, onAddToCart, onNavigate }) => {
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedSize(foundProduct.sizes && foundProduct.sizes.length > 0 ? foundProduct.sizes[0] : '');
      setSelectedColor(foundProduct.colors && foundProduct.colors.length > 0 ? foundProduct.colors[0] : '');
    }
  }, [productId, products]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white pt-24">
        <p className="text-xl">Producto no encontrado.</p>
        <button
          onClick={() => onNavigate('products')}
          className="ml-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver a Productos
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('Por favor, selecciona una talla.');
      return;
    }
    if (product.colors && !selectedColor) {
      alert('Por favor, selecciona un color.');
      return;
    }
    onAddToCart({ ...product, selectedSize, selectedColor });
    alert(`${product.name} añadido al carrito.`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pt-24 flex flex-col items-center">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-8 max-w-4xl w-full border border-gray-800">
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover shadow-md border border-gray-700"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-white mb-4">{product.name}</h2>
            <p className="text-gray-400 text-lg mb-4">{product.category}</p>
            <p className="text-gray-300 text-base leading-relaxed mb-6">{product.description}</p>
            <span className="text-5xl font-extrabold text-green-400 mb-6 block">
              ${product.price.toFixed(2)}
            </span>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-4">
                <label htmlFor="size-select" className="block text-gray-300 text-sm font-bold mb-2">
                  Talla:
                </label>
                <select
                  id="size-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label htmlFor="color-select" className="block text-gray-300 text-sm font-bold mb-2">
                  Color:
                </label>
                <select
                  id="color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="block w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-lg"
            >
              Añadir al Carrito
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="w-full bg-gray-700 text-gray-300 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-colors shadow-md"
            >
              Volver a Productos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductDetail;