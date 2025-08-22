import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserCategory.css';
import Navbar from './RNavbar';


const CategoryForm = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [clickedCategory, setClickedCategory] = useState(null);

  const categories = [
    { id: 'Cake', name: 'Cake', icon: '🎂' },
    { id: 'Music', name: 'Music', icon: '🎵' },
    { id: 'Decoration', name: 'Decoration', icon: '🎨' },
    { id: 'Photography', name: 'Photography', icon: '📷' }
  ];

  const handleCategoryClick = (categoryId) => {
    setClickedCategory(categoryId);
    setTimeout(() => setClickedCategory(null), 300);
    setSelectedCategory(categoryId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      // Navigate to booking page with category as parameter
      navigate(`/booking/${selectedCategory}`);
    }
  };

  return (
    <div className='body'>
      <Navbar/>
    <div className="category-form-container">
      
      <h2>Select Your Event Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="category-options">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`category-option ${
                selectedCategory === category.id ? 'selected' : ''
              } ${
                clickedCategory === category.id ? 'clicked' : ''
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <input
                type="radio"
                id={category.id}
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => {}}
                className="visually-hidden"
              />
              <label htmlFor={category.id}>
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </label>
            </div>
          ))}
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={!selectedCategory}
        >
          Explore Packages
        </button>
      </form>
    </div>
    </div>
  );
};

export default CategoryForm;