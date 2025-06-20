import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const discountedPrice = item.price - (item.price * item.discountPercentage / 100);
  const itemTotal = discountedPrice * item.quantity;
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-3 sm:mb-0 sm:mr-4">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-medium">{item.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          {item.unit} • {item.category.replace('_', ' ')}
        </p>
        
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-medium">₹{discountedPrice.toFixed(2)}</span>
          {item.discountPercentage > 0 && (
            <>
              <span className="text-sm text-gray-500 line-through">₹{item.price.toFixed(2)}</span>
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded">
                {item.discountPercentage}% OFF
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="flex items-center mt-2 sm:mt-0">
        <div className="flex items-center border rounded-md mr-4">
          <button 
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button 
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center">
          <span className="font-medium mr-3">₹{itemTotal.toFixed(2)}</span>
          <button 
            className="p-1.5 text-gray-500 hover:text-red-500 transition-colors"
            onClick={() => removeFromCart(item.id)}
            aria-label="Remove item"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;