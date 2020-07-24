import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
const url = 'http://localhost:3001/img/products';

const ProductImage = ({ product }) => {
  const getImageSrc = () => {
    if (product) {
      const images = product.photo;
      return images.map((image) => {
        return `${url}/${image}`;
      });
    }
  };

  const renderImage = () => {
    const imgSrc = getImageSrc();

    if (imgSrc) {
      // console.log(imgSrc);
      return imgSrc.map((source) => (
        <div key={source}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: 'Wristwatch by Ted Baker London',
                isFluidWidth: true,
                src: source,
              },
              largeImage: {
                src: source,
                width: 1200,
                height: 1200,
              },
              // enlargedImagePosition: 'over',
              imageClassName: 'product__images-image--small',
              imageStyle: { width: '100px' },
              isHintEnabled: true,
            }}
          />
        </div>
      ));
    }
  };

  return <div className="product__images-image">{renderImage()}</div>;
};

export default ProductImage;
