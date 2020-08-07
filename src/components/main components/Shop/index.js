import React, { Fragment } from 'react';
import Header from '../Header';
import { connect } from 'react-redux';
import {
  getAllCategories,
  getProductsToShop,
} from '../../../actions';
import ShowCheckbox from './ShowCheckbox';
import PageTop from '../../utils/PageTop';
import ShowRadioGroup from './ShowRadioGroup';
import { price } from '../../utils/fixedCategories';
import ShopCardList from './ShopCardList';
import Loader from '../../utils/Loader';

class Shop extends React.Component {
  state = {
    limit: 6,
    skip: 0,
    filters: {
      category: [],
      price: [],
    },
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.getAllCategories();
    this.props
      .getProductsToShop(
        this.state.skip,
        this.state.limit,
        this.state.filters
      )
      .then(() => this.setState({ loading: false }));
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10))
        array = data[key].array;
    }
    return array;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;
    if (category === 'price') {
      let priceValue = this.handlePrice(filters);
      newFilters[category] = priceValue;
    }
    this.showFilteredProducts(newFilters);

    this.setState({ filters: newFilters });
  };

  showFilteredProducts = (filters) => {
    this.setState({ loading: true });
    this.props
      .getProductsToShop(0, this.state.limit, filters)
      .then(() => this.setState({ skip: 0, loading: false }));
  };

  showLoadMoreButton = () => {
    if (this.props.products.shopSize >= this.state.limit) {
      return (
        <div>
          <button
            className="btn btn-type"
            onClick={this.loadMoreProducts}
          >
            Load More
          </button>
        </div>
      );
    }
  };
  loadMoreProducts = () => {
    // this.setState({ loading: true });
    let skip = this.state.skip + this.state.limit;
    this.props
      .getProductsToShop(
        skip,
        this.state.limit,
        this.state.filters,
        this.props.products.toShop
      )
      .then(() => this.setState({ skip }));
  };

  render() {
    const products = this.props.products;
    return (
      <div>
        <Header BgColor="white" />
        <PageTop title="Browse All Products" />
        <div className="shop">
          <div className="shop-filters">
            <ShowCheckbox
              initstate={false}
              title="Categories"
              list={products.categories}
              handleFilters={(filters) =>
                this.handleFilters(filters, 'category')
              }
            />
            <ShowRadioGroup
              initstate={false}
              title="Price"
              list={price}
              handleFilters={(filters) =>
                this.handleFilters(filters, 'price')
              }
            />
          </div>
          <div className="shop-products">
            {this.state.loading ? (
              <Loader />
            ) : (
              <Fragment>
                {' '}
                <ShopCardList list={this.props.products.toShop} />
                {this.showLoadMoreButton()}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products };
};

export default connect(mapStateToProps, {
  getAllCategories,
  getProductsToShop,
})(Shop);
