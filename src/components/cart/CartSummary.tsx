import React from 'react';
import { useCart } from '../../context/CartContext';

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { getCartTotal, getCartTotalWithDiscount, getTotalDiscount } = useCart();
  
  const subtotal = getCartTotal();
  const discount = getTotalDiscount();
  const total = getCartTotalWithDiscount();
  
  return (
    <div className="card p-5">
      <h3 className="text-lg font-bold mb-4">Order Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-green-600 dark:text-green-400">
          <span>Discount</span>
          <span>-₹{discount.toFixed(2)}</span>
        </div>
        
        <hr className="border-gray-200 dark:border-gray-700" />
        
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </button>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Wholesale pricing available for bulk orders. Contact us for more information.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;