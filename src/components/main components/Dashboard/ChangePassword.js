import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import { updateUserPassword, loadUser } from '../../../actions';

const ChangePassword = ({ user, loadUser, history }) => {
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

  const handleChange = (e) => {
    const { value } = e.target;

    setData({ ...data, [e.target.name]: value });
  };
  const redirectToLogin = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUserPassword(data)
      .then((data) => {
        setError({ ...error, errMsg: '', errStatus: false });
        setSuccess(true);
        setLoading(false);
        setTimeout(redirectToLogin, 2000);
      })
      .catch((err) => {
        setError({
          errStatus: true,
          errMsg: err.response.data.message,
        });
        setLoading(false);
      });
  };

  const renderUserInfo = () => {
    const { lastname, firstname, photo } = data;
    if (user) {
      return (
        <div className="user-profile">
          <form onSubmit={handleSubmit} className="form-wrapper">
            <label className="form-label full-width m1rem">
              Current Password
            </label>
            <input
              className="text-input"
              name="currentPassword"
              defaultValue={firstname}
              onChange={(e) => handleChange(e)}
              type="password"
            />
            <label className="form-label full-width m1rem">
              New Password
            </label>
            <input
              className="text-input"
              name="password"
              defaultValue={lastname}
              onChange={(e) => handleChange(e)}
              type="password"
            />
            <label className="form-label full-width m1rem">
              Confirm New Password
            </label>
            <input
              className="text-input"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
              type="password"
              required
            />
            <input
              type="submit"
              className="btn btn-type"
              value="Update Password"
            />
          </form>
          <div className="user-profile__action"></div>
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { loadUser })(ChangePassword);
