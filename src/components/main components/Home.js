import React from 'react';
import Showcase from './Showcase';
import Highlights from './Highlights';
import { connect } from 'react-redux';
import {
  getProductByArrival,
  getProductBySold,
  clearProducts,
} from '../../actions';

import Header from './Header';

class Home extends React.Component {
  componentDidMount() {
    this.props.getProductByArrival();
    this.props.getProductBySold();
  }
  // componentWillUnmount() {
  //   this.props.clearProducts();
  // }

  renderNewArivals() {
    const { prodByArrival } = this.props.products;
    if (prodByArrival) {
      const arrivalList = prodByArrival.products;
      // console.log(arrivalList);
      return <Highlights title="Latest Arrival" list={arrivalList} />;
    }
  }
  renderBestSelling() {
    const { prodBySold } = this.props.products;
    if (prodBySold) {
      const soldList = prodBySold.products;
      // console.log(soldList);
      return <Highlights title="Best Selling" list={soldList} />;
    }
  }

  render() {
    return (
      <div className="home">
        <Header />
        <Showcase />
        {this.renderNewArivals()}
        {this.renderBestSelling()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { products } = state;

  return {
    products,
  };
};

export default connect(mapStateToProps, {
  getProductByArrival,
  getProductBySold,
  clearProducts,
})(Home);
