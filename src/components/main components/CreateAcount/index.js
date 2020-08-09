import React, {
  // useLocation,
  // useHistory,
  // useEffect,
  useState,
} from 'react';
import Header from '../Header';
import PageTop from '../../utils/PageTop';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { signUp } from '../../../actions';

const renderInput = ({
  input,
  label,
  type,
  meta: { error, touched },
}) => {
  // const className = `signin__form-input ${
  //   error && touched ? 'error' : ''
  // } `;
  return (
    <React.Fragment>
      <label className="form-label full-width">{label}</label>
      <input
        autoComplete="off"
        {...input}
        type={type}
        className="text-input full-width"
      />
      <div className="form-error">
        {error && touched ? error : ''}
      </div>
    </React.Fragment>
  );
};

function CreateAcount({ isSignedIn, error, handleSubmit, signUp }) {
  // const location = useLocation();
  // const history = useHistory();
  const [loading, setloading] = useState(false);

  // let { from } = location.state || { from: { pathname: '/' } };
  // useEffect(() => {
  //   if (isSignedIn) {
  //     history.replace(from);
  //   }
  // }, [isSignedIn, from, history]);

  const renderSubmissionError = () => {
    // console.log(error);
    if (error) {
      return <div className="signin__form-error">{error}</div>;
    }
  };

  const submitSignUpForm = (formValues) => {
    const {
      address,
      apartment,
      city,
      country,
      region,
      phone,
      firstname,
      lastname,
      password,
      confirmPassword,
      email,
    } = formValues;
    const addressDetails = {
      address,
      apartment,
      city,
      country,
      region,
      phone,
      firstname,
      lastname,
    };
    const formData = {
      email: email.toLowerCase().trim(),
      password,
      confirmPassword,
      firstname,
      lastname,
      address: addressDetails,
    };
    window.scroll(0, 0);
    return signUp(formData);
  };

  return (
    <div>
      <Header />
      <PageTop title="Create Acount" />
      <div className="signup center-contents">
        {loading ? (
          <div> Loading...</div>
        ) : (
          <div className="signup-form">
            <form
              autoComplete="off"
              onSubmit={handleSubmit(submitSignUpForm)}
              className="form-wrapper"
            >
              {renderSubmissionError()}
              <Field
                name="email"
                component={renderInput}
                label="Email Address"
                type="email"
              />
              <Field
                name="password"
                component={renderInput}
                label="Password"
                type="password"
              />
              <Field
                name="confirmPassword"
                component={renderInput}
                label="Confirm Password"
                type="password"
              />
              <Field
                name="firstname"
                component={renderInput}
                label="First Name"
                type="text"
              />
              <Field
                name="lastname"
                component={renderInput}
                label="Last Name"
                type="text"
              />
              <Field
                name="address"
                component={renderInput}
                label="Address"
                type="text"
              />
              <Field
                name="apartment"
                component={renderInput}
                label="Apartment Number"
                type="text"
              />
              <Field
                name="city"
                component={renderInput}
                label="City"
                type="text"
              />
              <Field
                name="country"
                component={renderInput}
                label="Country"
                type="text"
              />
              <Field
                name="region"
                component={renderInput}
                label="Region/State"
                type="text"
              />
              <Field
                name="phone"
                component={renderInput}
                label="Phone Number"
                type="text"
              />
              <input
                type="submit"
                className="btn btn-type   margin-bottom-small"
                value="Sign UP"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const validate = (formValues) => {
  const emailRx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors = {};
  if (!formValues.email) {
    errors.email = 'Please enter your email';
  }
  if (
    formValues.email &&
    !emailRx.test(formValues.email.toLowerCase())
  ) {
    errors.email = 'Please enter a valid email';
  }
  if (!formValues.password) {
    errors.password = 'Please enter your password';
  }
  if (formValues.password && formValues.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  }
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  if (!formValues.country) {
    errors.country = 'Please enter your country';
  }
  if (!formValues.region) {
    errors.region = 'Please enter your region';
  }
  if (!formValues.phone) {
    errors.phone = 'Please enter your phone number';
  }
  if (!formValues.address) {
    errors.address = 'Please enter your address';
  }
  if (!formValues.firstname) {
    errors.firstname = 'Please enter your firstname';
  }
  if (!formValues.lastname) {
    errors.lastname = 'Please enter your lastname';
  }
  return errors;
};

const mapStateToProps = (state) => {
  const { isSignedIn, loading } = state.auth;
  return { isSignedIn, loading };
};

export default connect(mapStateToProps, { signUp })(
  reduxForm({
    form: 'signup',
    validate,
  })(CreateAcount)
);
