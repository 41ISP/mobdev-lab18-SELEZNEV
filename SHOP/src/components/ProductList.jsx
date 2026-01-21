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
