import React, { useState, useEffect } from 'react';
import ShopHeader from './components/ShopHeader';
import ShopProductList from './components/ShopProductList';
import ShopProductDetail from './components/ShopProductDetail';
import ShopCartDrawer from './components/ShopCartDrawer';
import ShopHero from './components/ShopHero';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { defaultProducts } from './mock/products';
import { useLocalStorage } from './utils/storage';
import { isAuthenticated, isAdmin, logout, getCurrentUser } from './utils/auth';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cartItems, setCartItems] = useLocalStorage('rebirthCart', []);
  // Usamos useLocalStorage para que los productos se persistan
  const [products, setProducts] = useLocalStorage('rebirthProducts', defaultProducts);
  const [loggedInUser, setLoggedInUser] = useState(getCurrentUser());

  // Efecto para manejar la persistencia de la sesión al cargar la app
  useEffect(() => {
    const user = getCurrentUser();
    if (user && isAdmin()) {
      setLoggedInUser(user);
    } else {
      setLoggedInUser(null);
    }
    setCurrentPage('home'); // Asegura que la página inicial sea siempre 'home'
  }, []);

  const handleNavigate = (page, productId = null) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
  };

  const handleCheckout = () => {
    alert('¡Gracias por tu compra en REBIRTH! Tu pedido ha sido procesado.');
    setCartItems([]);
    setCurrentPage('home');
  };

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setCurrentPage('adminDashboard');
  };

  const handleLogout = () => {
    logout();
    setLoggedInUser(null);
    setCurrentPage('home');
  };

  // Las funciones de manejo de productos ya actualizan el estado 'products'
  // que está vinculado a localStorage gracias a useLocalStorage.
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  };

  const renderPage = () => {
    if (currentPage === 'adminLogin') {
      return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
    }

    if (currentPage === 'adminDashboard') {
      if (loggedInUser && isAdmin()) {
        return (
          <AdminDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onLogout={handleLogout}
          />
        );
      } else {
        setCurrentPage('adminLogin');
        return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
      }
    }

    switch (currentPage) {
      case 'home':
        return <ShopHero onNavigate={handleNavigate} />;
      case 'products':
        return (
          <ShopProductList
            products={products}
            onAddToCart={handleAddToCart}
            onNavigateToDetail={(id) => handleNavigate('productDetail', id)}
          />
        );
      case 'productDetail':
        return (
          <ShopProductDetail
            productId={selectedProductId}
            products={products}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      case 'cart':
        return (
          <ShopCartDrawer
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onNavigate={handleNavigate}
            onCheckout={handleCheckout}
          />
        );
      default:
        return <ShopHero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <ShopHeader onNavigate={handleNavigate} cartItemCount={cartItems.length} />
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;