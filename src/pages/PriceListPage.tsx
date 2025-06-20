import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Send, Download } from 'lucide-react';
import { products } from '../data/products';
import FireworkEffect from '../components/ui/FireworkEffect';
import { useCart } from '../context/CartContext';

interface ProductQuantity {
  id: string;
  quantity: number;
}

const PriceListPage: React.FC = () => {
  const [showFirework, setShowFirework] = useState(false);
  const [quantities, setQuantities] = useState<ProductQuantity[]>([]);
  const { addToCart } = useCart();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [overallTotal, setOverallTotal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirework(true);
      setTimeout(() => setShowFirework(false), 2000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [quantities]);

  const calculateTotals = () => {
    let productsCount = 0;
    let savings = 0;
    let total = 0;

    quantities.forEach(item => {
      if (item.quantity > 0) {
        const product = products.find(p => p.id === item.id);
        if (product) {
          productsCount += item.quantity;
          const originalTotal = product.price * item.quantity;
          const discountedTotal = calculateTotal(product.price, product.discountPercentage, item.quantity);
          savings += originalTotal - discountedTotal;
          total += discountedTotal;
        }
      }
    });

    setTotalProducts(productsCount);
    setTotalSavings(savings);
    setOverallTotal(total);
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = Math.max(0, parseInt(value) || 0);
    setQuantities(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity } : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  };

  const calculateTotal = (price: number, discount: number, quantity: number): number => {
    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    return finalPrice * quantity;
  };

  const handleAddAllToCart = () => {
    let addedCount = 0;
    quantities.forEach(item => {
      if (item.quantity > 0) {
        const product = products.find(p => p.id === item.id);
        if (product) {
          addToCart(product, item.quantity);
          addedCount++;
        }
      }
    });
    
    if (addedCount > 0) {
      setShowFirework(true);
      setTimeout(() => setShowFirework(false), 2000);
    }
  };

  const handleShareOnWhatsApp = () => {
    const selectedProducts = quantities
      .filter(item => item.quantity > 0)
      .map(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          const total = calculateTotal(product.price, product.discountPercentage, item.quantity);
          const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
          return `${product.name} (${item.quantity} x ₹${discountedPrice.toFixed(2)}) = ₹${total.toFixed(2)}`;
        }
        return null;
      })
      .filter(Boolean);

    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }

    const message = encodeURIComponent(
      `*🎆 New Order from Sri Akilesh Agency*\n\n` +
      `*Selected Products:*\n${selectedProducts.join('\n')}\n\n` +
      `*Order Summary:*\n` +
      `Total Products: ${totalProducts}\n` +
      `Total Savings: ₹${totalSavings.toFixed(2)}\n` +
      `*Final Amount: ₹${overallTotal.toFixed(2)}*\n\n` +
      `Minimum Order Value: Rs.3000\n\n` +
      `Thank you for choosing Sri Akilesh Agency! 🎉\n` +
      `Happy Diwali - Festival of Light 2025! ✨`
    );

    window.open(`https://wa.me/919363453590?text=${message}`, '_blank');
  };

  // Group products by category
  const categories = [
    'one sound crackers 90 %',
    'ground chakkars 90 %',
    'flower pots 90 %',
    'bombs 90 %',
    'rocket bombs 90 %',
    'bijili crackers 90 %',
    'adiyal paper bomb 90 %',
    'twingle star & pencil 90 %',
    'sony ring guns 90 %',
    'lakshmi sri crackers 90 %',
    'night aerial attractions fancy 90 %',
    'different sparklers 90 %',
    'gift boxes 20 % discount',
    'shinish crackers 90 %'
  ];

  return (
    <div className="pt-24 pb-32 min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {showFirework && <FireworkEffect />}
      
      {/* Header */}
      <div className="container-custom mb-8">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-red-600 mb-2">SRI AKILESH AGENCY</h1>
          <p className="text-xl text-orange-600 font-semibold mb-4">Happy Diwali - Festival of Light 2025</p>
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">
              Minimum Order Value: Rs.3000
            </p>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-4 mb-6 bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-xl sticky top-20 z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-lg font-bold">Products</div>
            <div className="text-3xl font-extrabold">{totalProducts}</div>
          </div>
          <div className="text-center border-x border-red-400">
            <div className="text-lg font-bold">You Save</div>
            <div className="text-3xl font-extrabold">₹{totalSavings.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">Total</div>
            <div className="text-3xl font-extrabold">₹{overallTotal.toFixed(2)}</div>
          </div>
        </motion.div>
      </div>

      {/* Product Categories */}
      <div className="container-custom space-y-8">
        {categories.map((category, idx) => {
          const categoryProducts = products.filter(
            product => product.category.toLowerCase() === category.toLowerCase()
          );

          if (categoryProducts.length === 0) return null;

          return (
            <motion.div 
              key={idx} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 text-center sticky top-40 z-10">
                <h2 className="text-xl font-bold uppercase tracking-wide">
                  {category}
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                    <tr>
                      <th className="w-20 p-3 text-left font-bold text-sm">Image</th>
                      <th className="w-16 p-3 text-center font-bold text-sm">Code</th>
                      <th className="w-64 p-3 text-left font-bold text-sm">Product Name</th>
                      <th className="w-20 p-3 text-center font-bold text-sm">Content</th>
                      <th className="w-24 p-3 text-right font-bold text-sm">Price</th>
                      <th className="w-20 p-3 text-center font-bold text-sm">Discount</th>
                      <th className="w-24 p-3 text-center font-bold text-sm">Quantity</th>
                      <th className="w-24 p-3 text-right font-bold text-sm">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {categoryProducts.map((product, index) => {
                      const quantity = quantities.find(q => q.id === product.id)?.quantity || 0;
                      const total = calculateTotal(product.price, product.discountPercentage, quantity);
                      const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
                      
                      return (
                        <motion.tr 
                          key={product.id} 
                          className={`${
                            index % 2 === 0 
                              ? 'bg-yellow-50 dark:bg-yellow-900/10' 
                              : 'bg-white dark:bg-gray-800'
                          } hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors duration-200`}
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          <td className="w-20 p-3">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-14 h-14 object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-600" 
                            />
                          </td>
                          <td className="w-16 p-3 text-center font-bold text-gray-600 dark:text-gray-300 text-sm">
                            {parseInt(product.id)}
                          </td>
                          <td className="w-64 p-3 font-semibold text-gray-800 dark:text-gray-200 text-sm">
                            <div className="truncate" title={product.name}>
                              {product.name}
                            </div>
                          </td>
                          <td className="w-20 p-3 text-center font-medium text-gray-600 dark:text-gray-300 text-sm">
                            {product.unit}
                          </td>
                          <td className="w-24 p-3 text-right">
                            <div className="flex flex-col items-end">
                              <span className="line-through text-gray-500 text-xs">₹{product.price}</span>
                              <span className="font-bold text-green-600 dark:text-green-400 text-sm">
                                ₹{discountedPrice.toFixed(2)}
                              </span>
                            </div>
                          </td>
                          <td className="w-20 p-3 text-center">
                            <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-xs font-bold">
                              {product.discountPercentage}%
                            </span>
                          </td>
                          <td className="w-24 p-3">
                            <input
                              type="number"
                              min="0"
                              value={quantity || ''}
                              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                              className="w-full px-2 py-1 text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-red-500 dark:focus:border-red-400 focus:outline-none dark:bg-gray-700 dark:text-white transition-colors duration-200 text-sm"
                              placeholder="Qty"
                            />
                          </td>
                          <td className="w-24 p-3 text-right font-bold text-green-600 dark:text-green-400 text-sm">
                            ₹{total.toFixed(2)}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-2xl border-t-2 border-red-200 dark:border-red-800 z-30">
        <div className="container-custom flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.button
            onClick={handleAddAllToCart}
            className="flex-1 max-w-xs btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center gap-2 py-4 text-lg font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="h-6 w-6" />
            Add All to Cart
          </motion.button>
          
          <motion.button
            onClick={handleShareOnWhatsApp}
            className="flex-1 max-w-xs btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center gap-2 py-4 text-lg font-bold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="h-6 w-6" />
            Share on WhatsApp
          </motion.button>
        </div>
        
        <div className="text-center mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            🎆 Happy Diwali! Festival of Light 2025 ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceListPage;