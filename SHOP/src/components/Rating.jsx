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
