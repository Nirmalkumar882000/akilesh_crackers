import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import CheckoutForm from '../components/checkout/CheckoutForm';
import Invoice from '../components/checkout/Invoice';
import { CustomerInfo } from '../types';
import FireworkEffect from '../components/ui/FireworkEffect';

const CartPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [orderId, setOrderId] = useState('');
  const [showFirework, setShowFirework] = useState(false);
  
  const handleCheckout = () => {
    setIsCheckout(true);
  };
  
  const handleFormSubmit = (customerData: CustomerInfo) => {
    setCustomerInfo(customerData);
    setOrderId(`ORD${Math.floor(100000 + Math.random() * 900000)}`);
    setShowInvoice(true);
    setShowFirework(true);
    setTimeout(() => setShowFirework(false), 3000);
  };
  
  const handleInvoiceShare = (pdfBlob: Blob) => {
    // Create a temporary URL to the PDF
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Create WhatsApp share URL
    // Note: This is just a simulation as direct file sharing via WhatsApp Web API isn't supported
    // In a real app, you would save the file to server and share the download link
    const whatsappMessage = encodeURIComponent(
      `Here is your invoice #${orderId} from Shots Firecracker Shop. Thank you for your purchase!`
    );
    
    window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
    
    // Revoke the URL to avoid memory leaks
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
  };
  
  const startNewOrder = () => {
    setShowInvoice(false);
    setIsCheckout(false);
    setCustomerInfo(null);
    clearCart();
  };
  
  if (cartItems.length === 0 && !showInvoice) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <div className="text-center py-16 max-w-lg mx-auto">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      {showFirework && <FireworkEffect />}
      
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          {!showInvoice && (
            <>
              <h1 className="text-3xl font-bold mb-2">
                {isCheckout ? 'Checkout' : 'Your Cart'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isCheckout 
                  ? 'Complete your purchase by providing delivery information'
                  : `You have ${cartItems.reduce((total, item) => total + item.quantity, 0)} items in your cart`
                }
              </p>
            </>
          )}
          
          {showInvoice && (
            <h1 className="text-3xl font-bold mb-2">Your Order Confirmation</h1>
          )}
        </div>
        
        {!showInvoice ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items or Checkout Form */}
            <div className="lg:col-span-2">
              {!isCheckout ? (
                <div className="card p-6">
                  {cartItems.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="card p-6">
                  <CheckoutForm onSubmit={handleFormSubmit} />
                </div>
              )}
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              {!isCheckout ? (
                <CartSummary onCheckout={handleCheckout} />
              ) : (
                <div className="mb-6">
                  <Link 
                    to="/cart" 
                    className="flex items-center text-primary-500 hover:text-primary-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsCheckout(false);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to cart
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Invoice
          <div>
            {customerInfo && (
              <Invoice 
                customerInfo={customerInfo} 
                orderId={orderId}
                onShare={handleInvoiceShare} 
              />
            )}
            
            <div className="text-center mt-8">
              <button 
                className="btn btn-primary"
                onClick={startNewOrder}
              >
                Place New Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;