import React, { useEffect, useState } from 'react';
// import { SubmissionError } from 'redux-form';

import { Field, reduxForm } from 'redux-form';
import { useLocation, useHistory } from 'react-router-dom';
// import history from '../../history';
import { connect } from 'react-redux';
import { resetPassword } from '../../../actions';

import Loader from '../../utils/Loader';
// import signinSubmit from '../utils/signinSubmit';

import Header from '../Header';

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

const ResetPassword = ({
  isSignedIn,
  error,
  resetPassword,
  match: {
    params: { token },
  },
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState({
  //   errMsg: '',
  //   errStatus: false,
  // });
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const history = useHistory();

  let { from } = location.state || { from: { pathname: '/' } };
  useEffect(() => {
    if (isSignedIn) {
      history.replace(from);
    }
  }, [isSignedIn, from, history]);

  // const renderSuccess = () => {
  //   if (success) {
  //     return (
  //       <div className="message-wrapper">
  //         <p className="message success">
  //           We have sent you an email containing instructions on how
  //           to reset your password
  //         </p>
  //       </div>
  //     );
  //   }
  // };

  // const renderError = () => {
  //   if (error.errStatus) {
  //     return (
  //       <div className="message-wrapper">
  //         <p className="message error">{error.errMsg}</p>
  //       </div>
  //     );
  //   }
  // };

  const onSubmit = (values) => {
    return resetPassword(values, token);
    // .then((data) => {
    //   setError({ ...error, errMsg: '', errStatus: false });
    //   setSuccess(true);
    //   setLoading(false);
    //   // setTimeout(() => history.push('/user/dashboard'), 2000);
    // })
    // .catch((err) => {
    //   setError({
    //     errStatus: true,
    //     errMsg: err.response.data.message,
    //   });
    //   setLoading(false);
    // });
  };
  const renderSubmissionError = () => {
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
            <h1>Reset Password</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="signin__form"
            >
              {renderSubmissionError()}
              <Field
                name="password"
                component={renderInput}
                label="New Password"
                type="password"
              />
              <Field
                name="confirmPassword"
                component={renderInput}
                label="Confirm Password"
                type="password"
              />

              <button className="btn btn-type  full-width m1rem">
                Reset Password
              </button>
            </form>
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

export default connect(mapStateToProps, { resetPassword })(
  reduxForm({
    form: 'resetpassword',
    validate,
  })(ResetPassword)
);
