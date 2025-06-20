import React, { useState } from 'react';
import { CustomerInfo } from '../../types';

interface CheckoutFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const validate = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};
    
    if (!customerInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customerInfo.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!customerInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (customerInfo.email && !/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(customerInfo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
          className={`input ${errors.name ? 'border-red-500' : ''}`}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerInfo.email}
          onChange={handleChange}
          className={`input ${errors.email ? 'border-red-500' : ''}`}
          placeholder="Enter your email address (optional)"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customerInfo.phone}
          onChange={handleChange}
          className={`input ${errors.phone ? 'border-red-500' : ''}`}
          placeholder="Enter your 10-digit phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Delivery Address *
        </label>
        <textarea
          id="address"
          name="address"
          value={customerInfo.address}
          onChange={handleChange}
          rows={3}
          className={`input ${errors.address ? 'border-red-500' : ''}`}
          placeholder="Enter your complete delivery address"
        />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
      </div>

      <button
        type="submit"
        className="w-full btn btn-primary py-3"
      >
        Complete Order
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        By completing this order, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
};

export default CheckoutForm;