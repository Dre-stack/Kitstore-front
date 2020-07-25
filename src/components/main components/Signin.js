import React, { useEffect, useState } from 'react';
// import { SubmissionError } from 'redux-form';

import { Field, reduxForm } from 'redux-form';
import { useLocation, useHistory } from 'react-router-dom';
// import history from '../../history';
import { connect } from 'react-redux';
import { signIN } from '../../actions';
import Loader from '../utils/Loader';
// import signinSubmit from '../utils/signinSubmit';

import Header from './Header';
import { Link } from 'react-router-dom';

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
      <input {...input} type={type} className={className} />
      <div className="signin__form-error">
        {error && touched ? error : ''}
      </div>
    </div>
  );
};

const Signin = ({
  isSignedIn,
  error,
  signIN,
  handleSubmit,
  submitting,
}) => {
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const history = useHistory();

  let { from } = location.state || { from: { pathname: '/' } };
  useEffect(() => {
    if (isSignedIn) {
      history.replace(from);
    }
  }, [isSignedIn, from, history]);

  const onSubmit = (values) => {
    // setloading(true);
    return signIN(values, from.pathname);
    // } catch (err) {
    //   // setloading(false);
    //   // if (err.response) {
    //   //   throw new SubmissionError({
    //   //     _error: err.response.data.message,
    //   //   });
    //   // }
    // }
  };
  const renderSubmissionError = () => {
    // console.log(error);
    if (error) {
      return <div className="signin__form-error">{error}</div>;
    }
  };

  return (
    <div>
      <Header bgColor="white" />
      <div className="signin">
        {loading ? (
          <Loader />
        ) : (
          <div className="signin__form-wrapper">
            <h1>Sign In</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
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
              <button className="btn btn-type  full-width margin-bottom-small">
                Sign In
              </button>
            </form>
            <Link
              to="/user/forgot-password"
              className="signin__form-label links"
            >
              {' '}
              Forgot Password?
            </Link>
            <div className="signin__form-label ">
              Don't have an account?{' '}
              <Link
                to="user/register"
                className="signin__form-label links"
              >
                Create a New Accout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

export default connect(mapStateToProps, { signIN })(
  reduxForm({
    form: 'signin',
    validate,
  })(Signin)
);
