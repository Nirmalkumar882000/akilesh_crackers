import React, { useState } from 'react';
import { X, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import FireworkEffect from '../ui/FireworkEffect';

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [showFirework, setShowFirework] = useState(false);
  const { addToCart } = useCart();
  
  if (!product) return null;

  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const totalPrice = discountedPrice * quantity;
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowFirework(true);
    setTimeout(() => setShowFirework(false), 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {showFirework && <FireworkEffect />}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto shadow-xl relative">
        <button 
          className="absolute right-4 top-4 z-10 p-1.5 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[300px] md:h-full">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded text-sm">
                  Category: {product.category.replace('_', ' ')}
                </span>
                <span className="bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded text-sm">
                  Unit: {product.unit}
                </span>
                <span className="bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded text-sm">
                  In Stock: {product.stockQuantity}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl font-bold">₹{discountedPrice.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
                    <span className="text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button 
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-l-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                    onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-t border-b border-gray-300 dark:border-gray-600 h-[38px] bg-white dark:bg-gray-700"
                  />
                  <button 
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" 
                    onClick={() => setQuantity(prev => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 mb-6">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span>Price ({quantity} {quantity === 1 ? 'item' : 'items'})</span>
                  <span>₹{(product.price * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-₹{((product.price * product.discountPercentage / 100) * quantity).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold">
                  <span>Total Amount</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors flex items-center justify-center space-x-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;