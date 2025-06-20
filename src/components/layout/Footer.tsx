import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary-500" />
              <span className="text-xl font-bold">Sri Akilesh Agency</span>
            </div>
            <p className="text-gray-300 mb-2">
              <span className="font-semibold text-primary-400">Most Popular Cracker Shop in Sivakasi</span>
            </p>
            <p className="text-gray-300 mb-4">
              Premium firecrackers for all your celebration needs. Retail and wholesale options available since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/price-list" className="text-gray-300 hover:text-white transition-colors">Price List</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">🏪 Retail Sales</span></li>
              <li><span className="text-gray-300">📦 Wholesale Supply</span></li>
              <li><span className="text-gray-300">🚚 Home Delivery</span></li>
              <li><span className="text-gray-300">🎁 Gift Packaging</span></li>
              <li><span className="text-gray-300">💰 Bulk Discounts</span></li>
              <li><span className="text-gray-300">🔥 Premium Quality</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5" />
                <span className="text-gray-300">
                  Sri Akilesh Agency<br />
                  Sivakasi, Tamil Nadu<br />
                  India - 626123
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500" />
                <a href="tel:+919363453590" className="text-gray-300 hover:text-white transition-colors">+91 93634 53590</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500" />
                <a href="mailto:info@sriakileshagency.com" className="text-gray-300 hover:text-white transition-colors">info@sriakileshagency.com</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-6" />

        {/* Copyright */}
        <div className="text-center text-gray-400">
          <p>&copy; 2025 Sri Akilesh Agency, Sivakasi. All rights reserved.</p>
          <p className="text-sm mt-1">Most Popular Cracker Shop in Sivakasi | Retail & Wholesale</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;