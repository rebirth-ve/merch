import React from 'react';
import ShopProductCard from './ShopProductCard';

const ShopProductList = ({ products, onAddToCart, onNavigateToDetail }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 pt-24 bg-gray-950">
      {products.map(product => (
        <ShopProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onNavigateToDetail={onNavigateToDetail}
        />
      ))}
    </div>
  );
};

export default ShopProductList;