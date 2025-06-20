import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Store, Truck } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  orderType: 'retail' | 'wholesale';
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    orderType: 'retail',
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send this data to a server
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        orderType: 'retail',
      });
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Sri Akilesh Agency</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Sivakasi's Most Popular Cracker Shop
          </p>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about our products or need assistance with retail or wholesale orders? 
            Get in touch with us and we'll be happy to help you celebrate in style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-6 text-primary-600">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary-500 mt-1" />
                  <div>
                    <p className="font-semibold text-lg">Sri Akilesh Agency</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sivakasi, Tamil Nadu<br />
                      India - 626123
                    </p>
                    <p className="text-sm text-primary-600 mt-1">
                      Located in the heart of India's fireworks capital
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary-500 mt-1" />
                  <div>
                    <p className="font-semibold">Phone Numbers</p>
                    <a href="tel:+919363453590" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 block">
                      +91 93634 53590 (Primary)
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available for retail and wholesale inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary-500 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <a href="mailto:info@sriakileshagency.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-500">
                      info@sriakileshagency.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary-500 mt-1" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-gray-600 dark:text-gray-300">Monday to Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Sunday: 10:00 AM - 6:00 PM</p>
                    <p className="text-sm text-primary-600 mt-1">Extended hours during festival seasons</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services */}
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Our Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <Store className="h-5 w-5 text-primary-500" />
                  <span className="font-medium">Retail Sales</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <Truck className="h-5 w-5 text-primary-500" />
                  <span className="font-medium">Wholesale Supply</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <span className="text-primary-500">🚚</span>
                  <span className="font-medium">Home Delivery</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <span className="text-primary-500">🎁</span>
                  <span className="font-medium">Gift Packaging</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="card p-6">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg\" className="h-8 w-8 text-green-500\" viewBox="0 0 20 20\" fill="currentColor">
                    <path fillRule="evenodd\" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z\" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your message has been submitted successfully. 
                  We'll get back to you as soon as possible for your {formData.orderType} inquiry.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="orderType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Inquiry Type*
                    </label>
                    <select
                      id="orderType"
                      name="orderType"
                      value={formData.orderType}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="retail">Retail Purchase</option>
                      <option value="wholesale">Wholesale Order</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`input ${errors.message ? 'border-red-500' : ''}`}
                      placeholder={`How can we help you with your ${formData.orderType} needs?`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    By submitting this form, you agree to be contacted by Sri Akilesh Agency regarding your inquiry.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-orange-50 dark:from-primary-900/20 dark:to-orange-900/20 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-primary-600">Why Choose Sri Akilesh Agency?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🏆 Most Popular in Sivakasi</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Trusted by thousands of customers since 2010
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏪 Retail & Wholesale</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Serving individual customers and bulk dealers
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎆 Premium Quality</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Authentic Sivakasi products with safety certifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;