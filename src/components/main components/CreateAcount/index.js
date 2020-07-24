import React, {
  useLocation,
  useHistory,
  useEffect,
  useState,
} from 'react';
import Header from '../Header';
import PageTop from '../../utils/PageTop';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp } from '../../../actions';

const renderInput = ({
  input,
  label,
  type,
  meta: { error, touched },
}) => {
  const className = `signin__form-input ${
    error && touched ? 'error' : ''
  } `;
  return (
    <div>
      <label className="signin__form-label">{label}</label>
      <input autoComplete="off" {...input} type={type} className="" />
      <div className="signin__form-error">
        {error && touched ? error : ''}
      </div>
    </div>
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
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
      address: addressDetails,
    };

    return signUp(formData);
  };

  return (
    <div>
      <Header />
      <PageTop title="Create Acount" />
      <div className="">
        {loading ? (
          <div> Loading...</div>
        ) : (
          <div className="form-wrapper">
            <h1>Sign Up</h1>
            <form
              autoComplete="off"
              onSubmit={handleSubmit(submitSignUpForm)}
              className="signin__form"
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
            <Link
              to="/user/forgotpassword"
              className="signin__form-label links"
            >
              {' '}
              Forgot Password?
            </Link>
            <div className="signin__form-label ">
              Do you have an account?{' '}
              <Link
                to="user/register"
                className="signin__form-label links"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = 'Please enter your email';
  }
  if (!formValues.password) {
    errors.password = 'Please enter your password';
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
