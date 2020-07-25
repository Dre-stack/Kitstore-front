import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import { addNewAddress, loadUser } from '../../../actions';
import { TextField } from '@material-ui/core/';
// import { Link } from 'react-router-dom';
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

const Addresses = ({ user, loadUser, history }) => {
  const [addressDetails, setAddressDetails] = useState({
    alias: '',
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
    alias,
    firstname,
    lastname,
    address,
    apartment,
    city,
    country,
    region,
    phone,
  } = addressDetails;

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    errMsg: '',
    errStatus: false,
  });
  const [success, setSuccess] = useState(false);

  const renderSuccess = () => {
    if (success) {
      return (
        <div className="message-wrapper">
          <p className="message success">
            New Address Created Succesfully
          </p>
        </div>
      );
    }
  };

  const renderError = () => {
    if (error.errStatus) {
      return (
        <div className="message-wrapper">
          <p className="message error">{error.errMsg}</p>
        </div>
      );
    }
  };

  const handleChange = (e) => {
    setAddressDetails({
      ...addressDetails,
      [e.target.name]: e.target.value,
    });
  };
  const resetState = () => {
    setShowForm(false);
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { address: addressDetails };
    addNewAddress(addressDetails)
      .then((data) => {
        setError({ ...error, errMsg: '', errStatus: false });
        setSuccess(true);
        setLoading(false);
        loadUser();
        setTimeout(() => resetState(), 2000);
      })
      .catch((err) => {
        setError({
          errStatus: true,
          errMsg: err.response.data.message,
        });
        setLoading(false);
      });
  };
  const selectCountry = (val) => {
    setAddressDetails({ ...addressDetails, country: val });
  };

  const selectRegion = (val) => {
    setAddressDetails({ ...addressDetails, region: val });
  };

  const renderUserInfo = () => {
    if (user) {
      return (
        <div className="user-profile">
          <form
            onSubmit={handleSubmit}
            onBlur={() => setError({ errStatus: '' })}
          >
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
              name="alias"
              value={alias}
              onChange={(e) => handleChange(e)}
              required
              label="Alias"
              placeholder="Give this address an Alias e.g Home, Work"
            />
            <TextField
              style={styles}
              className="checkout-main-form__form-wrapper-input"
              variant="outlined"
              name="address"
              value={address}
              onChange={(e) => handleChange(e)}
              required
              label="Adress"
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
              <button className="btn btn-type">
                Add New Address
              </button>
            </div>
          </form>
          <div className="user-profile__action"></div>
        </div>
      );
    }
  };

  const renderAddresses = () => {
    if (user) {
      return (
        <div className="center-contents  ">
          {user.address.length > 0 ? (
            <React.Fragment>
              {user.address.map((item, i) => (
                <div
                  key={i}
                  className="center-contents m1rem address-card"
                >
                  <h2>{item.alias && item.alias.toUpperCase()}</h2>
                  <h3>
                    {item.firstname} {item.lastname}
                  </h3>
                  <p>Apartment number: {item.apartment}</p>
                  <p>{item.address}</p>
                  <p>{item.city}</p>
                  <p>
                    {item.region}, {item.country}
                  </p>
                  <p>{item.phone}</p>
                </div>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="message m1rem p1rem">
                <h3>No address Available</h3>
                <h3>Create a new address</h3>
              </div>
            </React.Fragment>
          )}
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-type"
          >
            Add New Address
          </button>
        </div>
      );
    }
  };

  const renderPage = () => {
    if (showForm) {
      return <div className="p3rem">{renderUserInfo()}</div>;
    } else {
      return <React.Fragment>{renderAddresses()}</React.Fragment>;
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="My Addresses" />
      {renderError()}
      {success ? renderSuccess() : renderPage()}
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { loadUser })(Addresses);
