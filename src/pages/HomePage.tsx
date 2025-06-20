import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductCard from '../components/product/ProductCard';
import ProductDetails from '../components/product/ProductDetails';
import CategoryCard from '../components/ui/CategoryCard';
import FireworkEffect from '../components/ui/FireworkEffect';
import { Product } from '../types';

const HomePage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showFirework, setShowFirework] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const backgroundImages = [
    "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    "https://images.pexels.com/photos/769525/pexels-photo-769525.jpeg",
    "https://images.pexels.com/photos/1573324/pexels-photo-1573324.jpeg"
  ];

  useEffect(() => {
    const fireworkInterval = setInterval(() => {
      setShowFirework(true);
      setTimeout(() => setShowFirework(false), 2000);
    }, 8000);

    const bgInterval = setInterval(() => {
      setCurrentBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => {
      clearInterval(fireworkInterval);
      clearInterval(bgInterval);
    };
  }, []);

  const popularProducts = products.filter(product => product.isPopular).slice(0, 4);
  const newArrivals = products.filter(product => product.isNewArrival).slice(0, 4);

  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const heroAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="pt-16">
      {showFirework && <FireworkEffect />}

      {/* Hero Section with Dynamic Background */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={heroAnimation}
        className="relative h-[700px] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={backgroundImages[currentBgIndex]}
              alt="Sri Akilesh Agency - Celebration background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          </motion.div>
        </AnimatePresence>
        
        <div className="container-custom h-full flex items-center relative z-10">
          <motion.div 
            className="max-w-4xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="mb-6"
              variants={itemAnimation}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
                Sri Akilesh Agency
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-400 mb-4">
                Sivakasi's Most Popular Cracker Shop
              </h2>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
              variants={itemAnimation}
            >
              Illuminating celebrations since 2010 with premium quality firecrackers. 
              Serving both retail and wholesale customers across Tamil Nadu from the heart of India's fireworks capital.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mb-8"
              variants={itemAnimation}
            >
              <Link 
                to="/products" 
                className="btn btn-primary text-lg px-8 py-4 hover:scale-105 transition-transform"
              >
                Shop Retail
              </Link>
              <Link 
                to="/price-list" 
                className="btn bg-white/10 text-white hover:bg-white/20 text-lg px-8 py-4"
              >
                Wholesale Prices
              </Link>
              <Link 
                to="/contact" 
                className="btn bg-primary-600/20 text-white hover:bg-primary-600/30 text-lg px-8 py-4"
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white"
              variants={itemAnimation}
            >
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🏪 Retail Excellence</h3>
                <p className="text-sm">Perfect for families and celebrations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">📦 Wholesale Supply</h3>
                <p className="text-sm">Bulk orders for dealers and events</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">🎆 Since 2010</h3>
                <p className="text-sm">15+ years of trusted service</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary-500 rounded-full"
                initial={{ 
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 10
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -20,
                  transition: {
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.section>
      
      {/* Categories Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl font-bold text-white mb-4"
              variants={itemAnimation}
            >
              Explore Our Premium Collection
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              variants={itemAnimation}
            >
              From dazzling sparklers to thunderous shots, discover authentic Sivakasi fireworks 
              available for both retail purchase and wholesale orders.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemAnimation}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Popular Products Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-custom">
          <motion.div 
            className="flex justify-between items-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white"
              variants={itemAnimation}
            >
              Popular Products
            </motion.h2>
            <motion.div variants={itemAnimation}>
              <Link 
                to="/products" 
                className="flex items-center text-primary-500 hover:text-primary-400 transition-colors"
              >
                View All <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {popularProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemAnimation}
                whileHover={{ scale: 1.05 }}
                className="transform transition-transform duration-300"
              >
                <ProductCard 
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* New Arrivals Section */}
      <motion.section 
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container-custom">
          <motion.div 
            className="flex justify-between items-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl font-bold text-white"
              variants={itemAnimation}
            >
              New Arrivals 2025
            </motion.h2>
            <motion.div variants={itemAnimation}>
              <Link 
                to="/products" 
                className="flex items-center text-primary-500 hover:text-primary-400 transition-colors"
              >
                View All <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {newArrivals.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemAnimation}
                whileHover={{ scale: 1.05 }}
                className="transform transition-transform duration-300"
              >
                <ProductCard 
                  product={product}
                  onViewDetails={setSelectedProduct}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Call to Action Section */}
      <motion.section 
        className="py-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg"
            alt="Sri Akilesh Agency celebration background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl font-bold text-white mb-6"
              variants={itemAnimation}
            >
              Ready to Light Up Your Celebration?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              variants={itemAnimation}
            >
              Join thousands of satisfied customers who trust Sri Akilesh Agency for their celebration needs.
              Experience authentic Sivakasi fireworks with 15+ years of expertise from the most popular cracker shop in the region.
            </motion.p>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              variants={itemAnimation}
            >
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 text-white">🏪 Retail Customers</h3>
                <p className="text-gray-300 mb-4">Perfect for families, weddings, and personal celebrations</p>
                <Link to="/products" className="btn bg-white text-primary-600 hover:bg-gray-100">
                  Shop Now
                </Link>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="font-bold text-xl mb-3 text-white">📦 Wholesale Dealers</h3>
                <p className="text-gray-300 mb-4">Bulk orders with special pricing for resellers and event organizers</p>
                <Link to="/price-list" className="btn bg-primary-600 text-white hover:bg-primary-700">
                  View Wholesale Prices
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={itemAnimation}
            >
              <Link 
                to="/contact" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-3"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default HomePage;