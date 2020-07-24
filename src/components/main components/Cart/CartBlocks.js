import React from 'react';

const url = 'http://localhost:3001/img/products';

const CartBlocks = ({
  list,
  removeItem,
  decrementQuantity,
  incrementQuantity,
}) => {
  const renderCartItems = () => {
    if (list) {
      return list.map((item) => (
        <div key={item._id} className="cart-block">
          <div className="cart-block__left">
            <div className="cart-block__left-image">
              <img
                src={`${url}/${item.photo[0]}`}
                loading="lazy"
                alt={item.name}
              />
            </div>
            <div className="cart-block__left-title">{item.name}</div>
          </div>
          <div className="cart-block__right">
            <div>{item.size ? item.size : 'S'}</div>
            <div className="cart-block__right-quantity">
              <button
                className="cart-block__buttons"
                onClick={() => decrementQuantity(item._id)}
              >
                <i className="fas fa-minus"></i>
              </button>
              <div>{item.quantity}</div>
              <button
                className="cart-block__buttons"
                onClick={() => incrementQuantity(item._id)}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div>{`$${item.price}`}</div>
            <div>{item.color ? item.color : 'Red'}</div>
            <div>
              <button
                onClick={() => removeItem(item._id)}
                className="cart-block__buttons"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      ));
    }
  };

  return <div>{renderCartItems()}</div>;
};

export default CartBlocks;
