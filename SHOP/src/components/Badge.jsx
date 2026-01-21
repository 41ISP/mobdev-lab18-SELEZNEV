import './Badge.css';

const Badge = ({ text, type }) => {
  return (
    <span className={`badge badge-${type}`}>
      {text}
    </span>
  );
};

export default Badge;
