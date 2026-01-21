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
