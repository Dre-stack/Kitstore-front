import React, { useEffect, useState } from 'react';
import { TextField } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  clearShippingPrice,
  sendAddressToOrder,
} from '../../../actions';
import {
  CountryDropdown,
  RegionDropdown,
} from 'react-country-region-selector';
// import { connect } from 'react-redux';
const styles = {
  // marginBottom: '2rem',
  margin: '0 0 2rem 0',
  fontSize: '1.6rem',
};

const CheckoutDetails = (props) => {
  const [addressDetails, setAddressDetails] = useState({
    firstname: '',
    lastname: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    region: '',
    phone: '',
  });
  const {
    firstname,
    lastname,
    address,
    apartment,
    city,
    country,
    region,
    phone,
  } = addressDetails;

  const { addressFromState, clearShippingPrice } = props;
  useEffect(() => {
    clearShippingPrice();
    if (addressFromState) {
      const {
        firstname,
        lastname,
        address,
        apartment,
        city,
        country,
        region,
        phone,
      } = addressFromState;
      setAddressDetails({
        ...addressDetails,
        firstname,
        lastname,
        address,
        apartment,
        city,
        country,
        region,
        phone,
      });
    }
  }, [addressFromState, clearShippingPrice]);

  const handleChange = (e) => {
    setAddressDetails({
      ...addressDetails,
      [e.target.name]: e.target.value,
    });
  };

  const selectCountry = (val) => {
    setAddressDetails({ ...addressDetails, country: val });
  };

  const selectRegion = (val) => {
    setAddressDetails({ ...addressDetails, region: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.sendAddressToOrder(addressDetails);
    props.handleSubmit();
  };

  return (
    <div className="checkout-main-form__form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="checkout-main-form__form-wrapper--namefield">
          <TextField
            style={styles}
            className="checkout-main-form__form-wrapper-input"
            variant="outlined"
            name="firstname"
            value={firstname}
            onChange={(e) => handleChange(e)}
            required
            label="First Name"
          />
          <TextField
            style={styles}
            className="checkout-main-form__form-wrapper-input"
            variant="outlined"
            name="lastname"
            value={lastname}
            onChange={(e) => handleChange(e)}
            required
            label="Last Name"
          />
        </div>
        <TextField
          style={styles}
          className="checkout-main-form__form-wrapper-input"
          variant="outlined"
          name="address"
          value={address}
          onChange={(e) => handleChange(e)}
          required
          label="address"
        />
        <TextField
          style={styles}
          className="checkout-main-form__form-wrapper-input"
          variant="outlined"
          name="apartment"
          value={apartment}
          onChange={(e) => handleChange(e)}
          placeholder="Apartment, suite etc (optional)"
        />
        <TextField
          style={styles}
          className="checkout-main-form__form-wrapper-input"
          variant="outlined"
          name="city"
          value={city}
          onChange={(e) => handleChange(e)}
          placeholder="city"
          required
        />
        <CountryDropdown
          className="checkout-main-form__form-wrapper-input"
          value={country}
          onChange={(val) => selectCountry(val)}
        />
        <RegionDropdown
          className="checkout-main-form__form-wrapper-input"
          value={region}
          country={country}
          onChange={(val) => selectRegion(val)}
        />
        <TextField
          style={styles}
          className="checkout-main-form__form-wrapper-input"
          variant="outlined"
          name="phone"
          value={phone}
          onChange={(e) => handleChange(e)}
          label="Phone Number"
          required
        />
        <div className="checkout-main-form__form-wrapper--actions">
          <Link to="/user/cart" className="btn btn-secondary">
            Edit Cart
          </Link>
          <button className="btn btn-type">Continue</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  addressFromState: state.order.address,
});

export default connect(mapStateToProps, {
  clearShippingPrice,
  sendAddressToOrder,
})(CheckoutDetails);
