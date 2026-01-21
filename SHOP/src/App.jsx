import { useState } from 'react';
import { products } from './data';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

const App = () => {
  // Получаем уникальные категории из всех товаров
  const categories = ['Все', ...new Set(products.map(p => p.category))];

  // Состояние для активной категории
  const [activeCategory, setActiveCategory] = useState('Все');

  // Функция для изменения активной категории
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Фильтруем товары по категории
  const filteredProducts = activeCategory === 'Все'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🛒 Интернет-магазин</h1>
        <p className="app-subtitle">Лучшие товары для вас</p>
      </header>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ProductList
        products={filteredProducts}
        title="Наши товары"
      />
    </div>
  );
};

export default App;
