# Лабораторная работа 18

## Цель работы
Создать интернет-магазин товаров, используя компоненты React и передачу данных через пропы.

---

## Этап 0: Очистка стартового проекта

### 0.1 Удалите ненужные файлы
После инициализации Vite-проекта удалите следующие файлы:
- `src/App.css` - будем использовать отдельные CSS файлы для каждого компонента
- `src/assets/` - папку с примерами можно удалить полностью

### 0.2 Очистите App.jsx
Откройте `src/App.jsx` и замените содержимое на минимальную структуру:

```jsx
const App = () => {
  return (
    <div className="app">
      <h1>Мой магазин</h1>
    </div>
  );
};

export default App;
```

**Объяснение:**
- `const App = () => { ... }` - стрелочная функция, современный синтаксис для создания компонентов
- `return (...)` - возвращает JSX разметку, которую React отрендерит на странице
- `export default App` - экспортирует компонент, чтобы его можно было импортировать в других файлах

### 0.3 Очистите index.css
Откройте `src/index.css` и удалите всё содержимое. Мы заполним его позже.

---

## Этап 1: Подготовка данных

### 1.1 Создайте файл с данными
В папке `src` создайте файл `data.js` со следующим содержимым:

```javascript
export const products = [
  {
    id: 1,
    name: "Ноутбук ASUS",
    price: 85000,
    category: "Электроника",
    inStock: true,
    image: "https://via.placeholder.com/200x150/4A90E2/ffffff?text=Laptop",
    rating: 4.5,
    description: "Мощный ноутбук для работы и игр"
  },
  {
    id: 2,
    name: "Беспроводные наушники",
    price: 12000,
    category: "Электроника",
    inStock: true,
    image: "https://via.placeholder.com/200x150/50C878/ffffff?text=Headphones",
    rating: 4.8,
    description: "Качественный звук и долгая автономность"
  },
  {
    id: 3,
    name: "Умные часы",
    price: 25000,
    category: "Электроника",
    inStock: false,
    image: "https://via.placeholder.com/200x150/FF6B6B/ffffff?text=Watch",
    rating: 4.3,
    description: "Отслеживание активности и уведомления"
  },
  {
    id: 4,
    name: "Рюкзак для ноутбука",
    price: 4500,
    category: "Аксессуары",
    inStock: true,
    image: "https://via.placeholder.com/200x150/9B59B6/ffffff?text=Backpack",
    rating: 4.6,
    description: "Вместительный и удобный рюкзак"
  },
  {
    id: 5,
    name: "Механическая клавиатура",
    price: 8900,
    category: "Электроника",
    inStock: true,
    image: "https://via.placeholder.com/200x150/F39C12/ffffff?text=Keyboard",
    rating: 4.7,
    description: "RGB подсветка и приятные переключатели"
  },
  {
    id: 6,
    name: "Настольная лампа",
    price: 3200,
    category: "Аксессуары",
    inStock: false,
    image: "https://via.placeholder.com/200x150/1ABC9C/ffffff?text=Lamp",
    rating: 4.2,
    description: "Регулируемая яркость и цвет света"
  }
];
```

**Объяснение:**
- `export` - экспортируем переменную, чтобы использовать её в других файлах
- Каждый товар - это объект с полями: `id`, `name`, `price`, `category`, `inStock`, `image`, `rating`, `description`
- Это массив объектов - типичная структура данных в React приложениях

---

## Этап 2: Создание компонента Badge (Бейдж)

### 2.1 Создайте папку components
В папке `src` создайте папку `components`.

### 2.2 Создайте компонент Badge
В папке `components` создайте файл `Badge.jsx`:

```jsx
import './Badge.css';

const Badge = ({ text, type }) => {
  return (
    <span className={`badge badge-${type}`}>
      {text}
    </span>
  );
};

export default Badge;
```

**Объяснение работы компонента:**

**Что принимает (пропы):**
- `text` - текст, который будет отображаться внутри бейджа
- `type` - тип бейджа для разной стилизации (success, danger, category)

**Как это работает:**
1. `import './Badge.css'` - импортируем стили для этого компонента
2. `const Badge = ({ text, type }) => { ... }` - стрелочная функция с деструктуризацией пропов
3. `{ text, type }` - деструктуризация означает "достань `text` и `type` из объекта `props`"
4. `` className={`badge badge-${type}`} `` - шаблонная строка создаёт динамический класс
   - Если `type="success"`, получится класс `badge badge-success`
   - Если `type="danger"`, получится класс `badge badge-danger`
5. `{text}` - вставляет значение пропа `text` в JSX

**Пример использования:**
```jsx
<Badge text="В наличии" type="success" />
// Превратится в: <span class="badge badge-success">В наличии</span>
```

### 2.3 Создайте стили для Badge
В папке `components` создайте файл `Badge.css`:

```css
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.badge-success {
  background-color: #d4edda;
  color: #155724;
}

.badge-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.badge-category {
  background-color: #e7f3ff;
  color: #004085;
}
```

---

## Этап 3: Создание компонента Rating (Рейтинг)

### 3.1 Создайте компонент Rating
В папке `components` создайте файл `Rating.jsx`:

```jsx
import './Rating.css';

const Rating = ({ value }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(value)) {
      stars.push(<span key={i} className="star star-full">★</span>);
    } else if (i === Math.ceil(value) && value % 1 !== 0) {
      stars.push(<span key={i} className="star star-half">★</span>);
    } else {
      stars.push(<span key={i} className="star star-empty">☆</span>);
    }
  }
  
  return (
    <div className="rating">
      {stars}
      <span className="rating-value">{value}</span>
    </div>
  );
};

export default Rating;
```

**Объяснение работы компонента:**

**Что принимает (пропы):**
- `value` - числовое значение рейтинга от 0 до 5 (например, 4.5)

**Как это работает:**
1. `const stars = []` - создаём пустой массив для хранения JSX элементов звёзд
2. `for (let i = 1; i <= 5; i++)` - цикл от 1 до 5 (для 5 звёзд)
3. **Логика отображения звёзд:**
   - `if (i <= Math.floor(value))` - если номер звезды меньше или равен целой части рейтинга
     - Пример: рейтинг 4.5, `Math.floor(4.5) = 4`, значит первые 4 звезды будут полными ★
   - `else if (i === Math.ceil(value) && value % 1 !== 0)` - если это следующая звезда и рейтинг дробный
     - `Math.ceil(4.5) = 5`, `value % 1 !== 0` проверяет наличие дробной части
     - Пятая звезда будет половинной ★ (визуально полупрозрачная)
   - `else` - остальные звезды пустые ☆
4. `stars.push(...)` - добавляем JSX элемент в массив
5. `key={i}` - уникальный ключ для каждого элемента списка (требование React)
6. `{stars}` - React автоматически отрендерит все элементы из массива

**Пример работы:**
```jsx
<Rating value={4.5} />
// Создаст: ★★★★☆ 4.5
// (первые 4 полные, 5-я половинная с opacity)
```

### 3.2 Создайте стили для Rating
В папке `components` создайте файл `Rating.css`:

```css
.rating {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 8px 0;
}

.star {
  font-size: 18px;
}

.star-full {
  color: #ffc107;
}

.star-half {
  color: #ffc107;
  opacity: 0.5;
}

.star-empty {
  color: #e0e0e0;
}

.rating-value {
  margin-left: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
```

---

## Этап 4: Создание компонента ProductCard (Карточка товара)

### 4.1 Создайте компонент ProductCard
В папке `components` создайте файл `ProductCard.jsx`:

```jsx
import './ProductCard.css';
import Badge from './Badge';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
        {!product.inStock && (
          <div className="out-of-stock-overlay">
            Нет в наличии
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-header">
          <h3 className="product-name">{product.name}</h3>
          <Badge text={product.category} type="category" />
        </div>
        
        <p className="product-description">{product.description}</p>
        
        <Rating value={product.rating} />
        
        <div className="product-footer">
          <span className="product-price">
            {product.price.toLocaleString()} ₽
          </span>
          {product.inStock ? (
            <Badge text="В наличии" type="success" />
          ) : (
            <Badge text="Нет в наличии" type="danger" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
```

**Объяснение работы компонента:**

**Что принимает (пропы):**
- `product` - объект с данными одного товара (из массива `products`)
  - Внутри объекта: `id`, `name`, `price`, `category`, `inStock`, `image`, `rating`, `description`

**Как это работает:**

1. **Импорты других компонентов:**
   ```jsx
   import Badge from './Badge';
   import Rating from './Rating';
   ```
   - Импортируем созданные ранее компоненты
   - Теперь можем использовать их внутри ProductCard
   - Это называется **композицией компонентов** - компоненты внутри компонентов

2. **Доступ к данным товара:**
   ```jsx
   product.image
   product.name
   product.category
   ```
   - Обращаемся к свойствам объекта через точку
   - `product` - это весь объект, `product.name` - конкретное поле

3. **Условный рендеринг с помощью `&&`:**
   ```jsx
   {!product.inStock && (
     <div className="out-of-stock-overlay">Нет в наличии</div>
   )}
   ```
   - `!product.inStock` - если товара НЕТ в наличии (`false`)
   - `&&` - логический оператор "И"
   - Если условие `true`, то отрендерится правая часть (overlay)
   - Если условие `false`, то ничего не отрендерится
   - **Пример:** если `inStock: false`, то overlay появится

4. **Передача пропов в дочерние компоненты:**
   ```jsx
   <Badge text={product.category} type="category" />
   ```
   - Передаём значение `product.category` (например, "Электроника") в проп `text`
   - Передаём строку "category" в проп `type`
   - Badge получит эти данные и отобразит бейдж с категорией

   ```jsx
   <Rating value={product.rating} />
   ```
   - Передаём число `product.rating` (например, 4.5) в компонент Rating
   - Rating создаст звёзды на основе этого числа

5. **Форматирование цены:**
   ```jsx
   {product.price.toLocaleString()} ₽
   ```
   - `toLocaleString()` - метод JavaScript для форматирования чисел
   - Превращает `85000` в `85 000` (с пробелами)

6. **Тернарный оператор (условный рендеринг):**
   ```jsx
   {product.inStock ? (
     <Badge text="В наличии" type="success" />
   ) : (
     <Badge text="Нет в наличии" type="danger" />
   )}
   ```
   - `условие ? вариант1 : вариант2`
   - Если `product.inStock === true`, рендерится первый Badge (зелёный)
   - Если `product.inStock === false`, рендерится второй Badge (красный)

**Поток данных (как передаются данные):**
```
App.jsx передаёт объект product
    ↓
ProductCard получает product через пропы
    ↓
ProductCard достаёт данные: product.name, product.price и т.д.
    ↓
ProductCard передаёт данные дальше:
    - product.category → Badge
    - product.rating → Rating
```

### 4.2 Создайте стили для ProductCard
В папке `components` создайте файл `ProductCard.css`:

```css
.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  background: white;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.product-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  flex: 1;
}

.product-description {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
}
```

---

## Этап 5: Создание компонента ProductList (Список товаров)

### 5.1 Создайте компонент ProductList
В папке `components` создайте файл `ProductList.jsx`:

```jsx
import './ProductList.css';
import ProductCard from './ProductCard';

const ProductList = ({ products, title }) => {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">{title}</h2>
      
      {products.length === 0 ? (
        <p className="no-products">Товары не найдены</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
```

**Объяснение работы компонента:**

**Что принимает (пропы):**
- `products` - массив объектов товаров (например, 6 товаров из `data.js`)
- `title` - строка с заголовком списка (например, "Наши товары")

**Как это работает:**

1. **Условный рендеринг пустого списка:**
   ```jsx
   {products.length === 0 ? (
     <p className="no-products">Товары не найдены</p>
   ) : (
     <div className="product-grid">...</div>
   )}
   ```
   - `products.length === 0` - проверяем, пустой ли массив
   - Если массив пустой - показываем сообщение "Товары не найдены"
   - Если массив НЕ пустой - рендерим сетку товаров

2. **Метод `.map()` для отрисовки списка:**
   ```jsx
   {products.map((product) => (
     <ProductCard key={product.id} product={product} />
   ))}
   ```
   
   **Что делает `.map()`:**
   - Перебирает каждый элемент массива `products`
   - Для каждого элемента выполняет функцию
   - Возвращает новый массив JSX элементов
   
   **Пошаговый пример:**
   ```javascript
   // Исходный массив
   products = [
     { id: 1, name: "Ноутбук", ... },
     { id: 2, name: "Наушники", ... },
     { id: 3, name: "Часы", ... }
   ]
   
   // map() превращает его в массив компонентов:
   [
     <ProductCard key={1} product={{ id: 1, name: "Ноутбук", ... }} />,
     <ProductCard key={2} product={{ id: 2, name: "Наушники", ... }} />,
     <ProductCard key={3} product={{ id: 3, name: "Часы", ... }} />
   ]
   ```

3. **Почему нужен `key`:**
   ```jsx
   <ProductCard key={product.id} product={product} />
   ```
   - React требует уникальный `key` для каждого элемента в списке
   - `key` помогает React понять, какие элементы изменились, добавились или удалились
   - Используем `product.id`, так как `id` уникален для каждого товара
   - **Важно:** никогда не используйте индекс массива как `key`, только уникальные id

4. **Передача целого объекта в проп:**
   ```jsx
   product={product}
   ```
   - Передаём весь объект товара в компонент ProductCard
   - ProductCard получит его и сможет обратиться к `product.name`, `product.price` и т.д.

**Поток данных:**
```
App.jsx: массив из 6 товаров
    ↓
ProductList получает весь массив через проп products
    ↓
ProductList.map() перебирает массив
    ↓
Для каждого товара создаётся ProductCard
    ↓
Каждый ProductCard получает свой объект product
    ↓
На экране появляется 6 карточек товаров
```

### 5.2 Создайте стили для ProductList
В папке `components` создайте файл `ProductList.css`:

```css
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-list-title {
  font-size: 32px;
  margin-bottom: 24px;
  color: #2c3e50;
  text-align: center;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.no-products {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 40px;
}
```

---

## Этап 6: Создание компонента CategoryFilter (Фильтр категорий)

### 6.1 Создайте компонент CategoryFilter
В папке `components` создайте файл `CategoryFilter.jsx`:

```jsx
import './CategoryFilter.css';
import Badge from './Badge';

const CategoryFilter = ({ categories, activeCategory }) => {
  return (
    <div className="category-filter">
      <h3 className="filter-title">Категории:</h3>
      <div className="category-list">
        {categories.map((category) => (
          <div 
            key={category}
            className={`category-item ${activeCategory === category ? 'active' : ''}`}
          >
            <Badge text={category} type="category" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
```

**Объяснение работы компонента:**

**Что принимает (пропы):**
- `categories` - массив строк с названиями категорий (например, `["Все", "Электроника", "Аксессуары"]`)
- `activeCategory` - строка с названием активной (выбранной) категории (например, `"Все"`)

**Как это работает:**

1. **Рендеринг списка категорий:**
   ```jsx
   {categories.map((category) => (
     <div key={category}>...</div>
   ))}
   ```
   - Используем `.map()` для создания элемента для каждой категории
   - `key={category}` - используем название категории как ключ (так как названия уникальны)

2. **Условное добавление класса `active`:**
   ```jsx
   className={`category-item ${activeCategory === category ? 'active' : ''}`}
   ```
   - Шаблонная строка с условием внутри
   - Всегда добавляем класс `category-item`
   - Проверяем: `activeCategory === category`
   - Если `true` - добавляем класс `active`
   - Если `false` - добавляем пустую строку (ничего не добавляем)
   
   **Пример:**
   ```javascript
   // Если activeCategory = "Электроника" и category = "Электроника"
   className="category-item active"
   
   // Если activeCategory = "Электроника" и category = "Аксессуары"
   className="category-item "
   ```

3. **Вложенный компонент Badge:**
   ```jsx
   <Badge text={category} type="category" />
   ```
   - Передаём название категории в Badge
   - Badge отобразит красивый бейдж с названием

**Визуальный пример работы:**
```
categories = ["Все", "Электроника", "Аксессуары"]
activeCategory = "Электроника"

Результат на экране:
[Все] [Электроника (выделен)] [Аксессуары]
```

### 6.2 Создайте стили для CategoryFilter
В папке `components` создайте файл `CategoryFilter.css`:

```css
.category-filter {
  max-width: 1200px;
  margin: 0 auto 32px;
  padding: 0 20px;
}

.filter-title {
  font-size: 18px;
  margin-bottom: 12px;
  color: #2c3e50;
}

.category-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.category-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.category-item:hover {
  transform: scale(1.05);
}

.category-item.active {
  transform: scale(1.1);
}

.category-item.active .badge {
  box-shadow: 0 2px 8px rgba(0, 64, 133, 0.3);
}
```

---

## Этап 7: Сборка приложения в App.jsx

### 7.1 Обновите файл App.jsx
Замените содержимое `src/App.jsx`:

```jsx
import { products } from './data';
import ProductList from './components/ProductList';
import CategoryFilter from './components/CategoryFilter';
import './App.css';

const App = () => {
  // Получаем уникальные категории из всех товаров
  const categories = ['Все', ...new Set(products.map(p => p.category))];
  
  // Пока используем статическую фильтрацию (на следующих парах добавите состояние)
  const activeCategory = 'Все';
  
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
      />
      
      <ProductList 
        products={filteredProducts}
        title="Наши товары"
      />
    </div>
  );
};

export default App;
```

**Объяснение работы App.jsx:**

**Это главный компонент приложения - "корень", который собирает всё вместе.**

1. **Импорты:**
   ```jsx
   import { products } from './data';
   ```
   - Импортируем массив товаров из файла `data.js`
   - Фигурные скобки `{}` используем, потому что это именованный экспорт

   ```jsx
   import ProductList from './components/ProductList';
   import CategoryFilter from './components/CategoryFilter';
   ```
   - Импортируем созданные нами компоненты
   - Без фигурных скобок, потому что это экспорт по умолчанию (default export)

2. **Создание массива уникальных категорий:**
   ```jsx
   const categories = ['Все', ...new Set(products.map(p => p.category))];
   ```
   
   **Разбор по шагам:**
   
   а) `products.map(p => p.category)` - создаём массив из всех категорий:
   ```javascript
   ["Электроника", "Электроника", "Электроника", "Аксессуары", "Электроника", "Аксессуары"]
   ```
   
   б) `new Set(...)` - создаём Set (множество уникальных значений):
   ```javascript
   Set { "Электроника", "Аксессуары" }
   ```
   
   в) `...new Set(...)` - spread оператор превращает Set обратно в массив:
   ```javascript
   ["Электроника", "Аксессуары"]
   ```
   
   г) `['Все', ...]` - добавляем "Все" в начало массива:
   ```javascript
   ["Все", "Электроника", "Аксессуары"]
   ```

3. **Статическая активная категория:**
   ```jsx
   const activeCategory = 'Все';
   ```
   - Пока используем фиксированное значение "Все"
   - На следующих занятиях вы замените это на состояние (useState)
   - Это позволит менять категорию при клике

4. **Фильтрация товаров:**
   ```jsx
   const filteredProducts = activeCategory === 'Все' 
     ? products 
     : products.filter(p => p.category === activeCategory);
   ```
   
   **Как работает:**
   - Тернарный оператор: `условие ? если_true : если_false`
   - Если `activeCategory === 'Все'` - возвращаем все товары
   - Если нет - используем `.filter()` для фильтрации
   
   **Пример работы `.filter()`:**
   ```javascript
   // Если activeCategory = "Электроника"
   products.filter(p => p.category === "Электроника")
   
   // Вернёт только товары где category === "Электроника"
   // Результат: [Ноутбук, Наушники, Часы, Клавиатура]
   ```

5. **Передача данных в компоненты:**
   ```jsx
   <CategoryFilter 
     categories={categories} 
     activeCategory={activeCategory}
   />
   ```
   - Передаём массив категорий: `["Все", "Электроника", "Аксессуары"]`
   - Передаём активную категорию: `"Все"`
   - CategoryFilter получит эти данные через пропы

   ```jsx
   <ProductList 
     products={filteredProducts}
     title="Наши товары"
   />
   ```
   - Передаём отфильтрованный массив товаров
   - Передаём заголовок списка
   - ProductList отрисует карточки товаров

**Полная цепочка передачи данных:**

```
1. data.js экспортирует массив products
       ↓
2. App.jsx импортирует products
       ↓
3. App.jsx создаёт categories из products
       ↓
4. App.jsx фильтрует products → filteredProducts
       ↓
5. App.jsx передаёт данные в компоненты:
   - categories + activeCategory → CategoryFilter
   - filteredProducts + title → ProductList
       ↓
6. ProductList передаёт каждый product → ProductCard
       ↓
7. ProductCard передаёт данные в Badge и Rating
       ↓
8. Всё отрисовывается на экране!
```

### 7.2 Создайте стили для App
В папке `src` создайте файл `App.css`:

```css
* {
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  padding-bottom: 40px;
}

.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
}

.app-subtitle {
  margin: 8px 0 0;
  font-size: 18px;
  opacity: 0.9;
}
```

### 7.3 Обновите глобальные стили
Откройте `src/index.css` и добавьте базовые стили:

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f9fa;
}
```

---

## Этап 8: Запуск проекта

### 8.1 Запустите проект
В терминале выполните:
```bash
npm run dev
```

### 8.2 Проверьте результат
Откройте в браузере ваше приложение и убедитесь, что:
- ✅ Отображается заголовок магазина с градиентом
- ✅ Видны все категории (Все, Электроника, Аксессуары)
- ✅ Товары отображаются в виде сетки карточек
- ✅ У каждого товара есть:
  - Изображение
  - Название
  - Бейдж категории
  - Описание
  - Рейтинг со звёздами
  - Цена
  - Бейдж наличия
- ✅ Товары без наличия имеют затемненное изображение с текстом "Нет в наличии"
- ✅ При наведении карточки товара поднимаются вверх

---

## Структура проекта

После выполнения всех этапов структура должна быть следующей:

```
src/
├── components/
│   ├── Badge.jsx
│   ├── Badge.css
│   ├── Rating.jsx
│   ├── Rating.css
│   ├── ProductCard.jsx
│   ├── ProductCard.css
│   ├── ProductList.jsx
│   ├── ProductList.css
│   ├── CategoryFilter.jsx
│   └── CategoryFilter.css
├── data.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Ключевые концепции

### 1. Компоненты как функции
```jsx
const Badge = ({ text, type }) => {
  return <span>{text}</span>;
};
```
- Компонент - это функция, которая возвращает JSX
- Стрелочная функция - современный синтаксис

### 2. Пропы (Props)
```jsx
// Передача пропов
<Badge text="В наличии" type="success" />

// Получение пропов с деструктуризацией
const Badge = ({ text, type }) => { ... }
```
- Пропы - это объект с данными, которые компонент получает
- Деструктуризация `{ text, type }` достаёт нужные поля из объекта

### 3. Условный рендеринг

**Оператор `&&`:**
```jsx
{!product.inStock && <div>Нет в наличии</div>}
```
- Если условие `true`, рендерится правая часть
- Если `false` - ничего не рендерится

**Тернарный оператор:**
```jsx
{product.inStock ? <Badge type="success" /> : <Badge type="danger" />}
```
- `условие ? если_true : если_false`
- Позволяет выбрать между двумя вариантами

### 4. Рендеринг списков
```jsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```
- Метод `.map()` создаёт новый массив JSX элементов
- `key` обязателен для каждого элемента списка
- Использовать уникальный `id`, а не индекс массива

### 5. Композиция компонентов
```
App
 ├── CategoryFilter
 │    └── Badge
 └── ProductList
      └── ProductCard
           ├── Badge
           └── Rating
```
- Компоненты могут содержать другие компоненты
- Данные передаются сверху вниз через пропы
- Это создаёт иерархию компонентов

---

## Дополнительные задания

### Задание 1: Компонент ProductStats
Создайте компонент `ProductStats.jsx`, который показывает статистику:
- Общее количество товаров
- Количество товаров в наличии
- Средний рейтинг всех товаров

**Подсказка:** Компонент должен принимать проп `products` и вычислять статистику.

### Задание 2: Компонент PriceTag  
Вынесите отображение цены в отдельный компонент `PriceTag.jsx`:
- Принимает `price` и `currency`
- Форматирует цену с разделителями
- Можно добавить проп `oldPrice` для отображения скидки

### Задание 3: Компонент StockIndicator
Создайте визуальный индикатор остатка товара `StockIndicator.jsx`:
- Принимает `stockCount` (количество на складе)
- Цвета:
  - Зелёный: `stockCount > 10` - "Много"
  - Жёлтый: `3 <= stockCount <= 10` - "Мало"
  - Красный: `1 <= stockCount <= 2` - "Очень мало"
  - Серый: `stockCount === 0` - "Нет в наличии"

# Как сдавать

- Создайте форк репозитория в организации 41ISP с названием webdev-{номерлабы}-вашафамилия
- Используя ветку wip сделайте задание
- Зафиксируйте изменения в вашем репозитории
- Когда документ будет готов - создайте пул реквест из ветки wip (вашей) на ветку main (тоже вашу) и укажите меня (ktkv419) как reviewer

Не мержите сами коммит, это сделаю я после проверки задания
