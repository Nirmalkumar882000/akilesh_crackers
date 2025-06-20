import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, quantity);
    setQuantity(1);
  };
  
  return (
    <div 
      className="card group cursor-pointer hover:shadow-lg"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {(product.isNewArrival || product.isPopular) && (
          <div className="absolute top-2 left-2 z-10">
            {product.isNewArrival && (
              <span className="bg-secondary-500 text-white text-xs font-semibold px-2 py-1 rounded-full mr-2">
                NEW
              </span>
            )}
            {product.isPopular && (
              <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                POPULAR
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{product.category} - {product.unit}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold">₹{discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded">
                {product.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <button 
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button 
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <button
            className="p-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors flex items-center"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;