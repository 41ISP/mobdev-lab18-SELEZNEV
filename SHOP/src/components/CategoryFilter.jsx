import './CategoryFilter.css';
import Badge from './Badge';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <h3 className="filter-title">Категории:</h3>
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category}
            className={`category-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            <Badge text={category} type="category" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
