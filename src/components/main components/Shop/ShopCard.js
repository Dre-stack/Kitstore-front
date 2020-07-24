import { Link } from 'react-router-dom';
import React from 'react';
import { pictureFromServer as url } from '../../utils/apiLinks';

const ShopCard = ({
  productId,
  productName,
  productImg,
  productPrice,
  className,
}) => {
  return (
    <Link
      to={`/products/${productId}`}
      className="highlight__card-textlink"
    >
      <div className={`highlight__card ${className}`}>
        <div
          className="highlight__card-image"
          // style={{
          //   backgroundImage: `url('http://localhost:3001/img/products/')`,
          //   backgroundSize: 'cover',
          // }}
        >
          <img src={`${url}/${productImg}`} alt={productName} />
        </div>
        <div className="highlight__card-text">
          <h3>{productName}</h3>
          <h3>${productPrice}</h3>
        </div>
      </div>
    </Link>
  );
};

export default ShopCard;
