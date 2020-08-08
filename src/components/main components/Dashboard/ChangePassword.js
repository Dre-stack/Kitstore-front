import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import { updateUserPassword, loadUser } from '../../../actions';
import { Field, reduxForm } from 'redux-form';
import { SignOut } from '../../../actions';

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

const ChangePassword = ({
  user,
  loadUser,
  handleSubmit,
  history,
  SignOut,
}) => {
  const [data, setData] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });
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
            Your password has been changed succesfully, You will be
            redirected to sign in with your new password shortly
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

  const redirectToLogin = () => {
    SignOut();
    history.push('/signin');
  };

  const onSubmit = (values) => {
    console.log(values);

    updateUserPassword(values)
      .then((data) => {
        setError({ ...error, errMsg: '', errStatus: false });
        setSuccess(true);
        setLoading(false);
        setTimeout(redirectToLogin, 2000);
      })
      .catch((err) => {
        console.log(err.response);
        setError({
          errStatus: true,
          errMsg: err.response.data.message,
        });
        setLoading(false);
      });
  };

  const renderUserInfo = () => {
    if (user) {
      return (
        <div className="user-profile">
          {success ? (
            renderSuccess()
          ) : (
            <React.Fragment>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-wrapper"
                onBlur={() =>
                  setError({ errMsg: '', errStatus: false })
                }
              >
                <Field
                  name="currentPassword"
                  component={renderInput}
                  label="Current Password"
                  type="password"
                />
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
                <input
                  type="submit"
                  className="btn btn-type"
                  value="Update Password"
                />
              </form>
            </React.Fragment>
          )}
        </div>
      );
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Change Password" />
      {renderError()}
      {success ? (
        renderSuccess()
      ) : (
        <div className="p3rem">{renderUserInfo()}</div>
      )}
    </DashboardLayout>
  );
};

const validate = (values) => {
  const error = {};
  if (values.password && values.password.length < 6) {
    error.password = 'Please enter at least 6 characters';
  }

  if (values.password !== values.confirmPassword) {
    error.confirmPassword = 'Passwords do not match';
  }
  return error;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, SignOut })(
  reduxForm({
    form: 'changePassword',
    validate,
  })(ChangePassword)
);
