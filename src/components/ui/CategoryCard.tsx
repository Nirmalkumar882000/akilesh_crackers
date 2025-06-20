import React from 'react';
import { Category } from '../../types';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/products?category=${category.id}`} 
      className="block group"
    >
      <div className="card h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <h3 className="text-white text-xl font-bold p-4">{category.name}</h3>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
          <div className="mt-3 text-primary-500 font-medium text-sm flex items-center group-hover:translate-x-2 transition-transform duration-300">
            Browse Products
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;