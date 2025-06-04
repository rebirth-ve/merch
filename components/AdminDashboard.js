import React, { useState } from 'react';

const AdminDashboard = ({ products, onAddProduct, onUpdateProduct, onDeleteProduct, onLogout }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    image: '',
    description: '',
    category: '',
    sizes: '',
    colors: ''
  });
  const [newProductImageFile, setNewProductImageFile] = useState(null);
  const [editingProductImageFile, setEditingProductImageFile] = useState(null);

  const handleEditClick = (product) => {
    setEditingProduct({
      ...product,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : ''
    });
    setEditingProductImageFile(null); // Reset file input
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditingProductImageFile(null);
  };

  const handleImageChange = (e, isNewProduct) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isNewProduct) {
          setNewProductImageFile(reader.result);
          setNewProduct(prev => ({ ...prev, image: reader.result }));
        } else {
          setEditingProductImageFile(reader.result);
          setEditingProduct(prev => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...editingProduct,
      price: parseFloat(editingProduct.price),
      sizes: editingProduct.sizes.split(',').map(s => s.trim()).filter(s => s),
      colors: editingProduct.colors.split(',').map(c => c.trim()).filter(c => c),
      image: editingProductImageFile || editingProduct.image // Use file if uploaded, else existing URL
    };
    onUpdateProduct(updatedProduct);
    setEditingProduct(null);
    setEditingProductImageFile(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newProductImageFile) {
      alert('Por favor, sube una imagen para el nuevo producto.');
      return;
    }
    const productToAdd = {
      ...newProduct,
      id: String(products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1),
      price: parseFloat(newProduct.price),
      sizes: newProduct.sizes.split(',').map(s => s.trim()).filter(s => s),
      colors: newProduct.colors.split(',').map(c => c.trim()).filter(c => c),
      image: newProductImageFile
    };
    onAddProduct(productToAdd);
    setNewProduct({
      id: '',
      name: '',
      price: '',
      image: '',
      description: '',
      category: '',
      sizes: '',
      colors: ''
    });
    setNewProductImageFile(null);
  };

  const renderProductForm = (productData, setProductData, handleSubmit, isNew = false, currentImageFile = null, setImageFile = null) => (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-inner border border-gray-700 mb-8">
      <h3 className="text-2xl font-bold text-white mb-4">{isNew ? 'Añadir Nuevo Producto' : 'Editar Producto'}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre del Producto"
          value={productData.name}
          onChange={(e) => setProductData({ ...productData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="md:col-span-2">
          <label htmlFor={isNew ? "new-image-upload" : "edit-image-upload"} className="block text-gray-300 text-sm font-bold mb-2">
            Subir Imagen (o usar URL existente):
          </label>
          <input
            type="file"
            id={isNew ? "new-image-upload" : "edit-image-upload"}
            accept="image/*"
            onChange={(e) => handleImageChange(e, isNew)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {productData.image && (
            <div className="mt-2">
              <img src={productData.image} alt="Previsualización" className="h-24 w-24 object-cover rounded-md border border-gray-700" />
            </div>
          )}
        </div>
        <input
          type="text"
          placeholder="Categoría"
          value={productData.category}
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Tallas (separadas por coma: S, M, L)"
          value={productData.sizes}
          onChange={(e) => setProductData({ ...productData, sizes: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Colores (separados por coma: Rojo, Azul)"
          value={productData.colors}
          onChange={(e) => setProductData({ ...productData, colors: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Descripción del Producto"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2 resize-none"
          rows="3"
          required
        ></textarea>
      </div>
      <div className="flex justify-end space-x-4 mt-6">
        {isNew ? (
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-lg"
          >
            Añadir Producto
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-colors transform hover:scale-105 shadow-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-lg"
            >
              Actualizar Producto
            </button>
          </>
        )}
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-white">Panel de Administración</h2>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors transform hover:scale-105 shadow-lg"
          >
            Cerrar Sesión
          </button>
        </div>

        {renderProductForm(newProduct, setNewProduct, handleAddSubmit, true, newProductImageFile, setNewProductImageFile)}

        {editingProduct && renderProductForm(editingProduct, setEditingProduct, handleUpdateSubmit, false, editingProductImageFile, setEditingProductImageFile)}

        <h3 className="text-3xl font-bold text-white mb-6">Productos Existentes</h3>
        <div className="bg-gray-900 rounded-xl shadow-2xl p-6 border border-gray-800">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Imagen</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-md border border-gray-700" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-500 hover:text-blue-700 mr-4 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;