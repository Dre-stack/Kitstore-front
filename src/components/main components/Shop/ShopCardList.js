import React from 'react';
import ShopCard from './ShopCard';

function ShopCardList({ list }) {
  const renderCards = () => {
    if (list) {
      return list.map((product) => (
        <ShopCard
          key={product._id}
          productName={product.name}
          productId={product._id}
          productPrice={product.price}
          productImg={product.photo[0]}
          className="shop-products__list-card"
        />
      ));
    }
  };
  return <div className="shop-products__list">{renderCards()}</div>;
}

export default ShopCardList;
