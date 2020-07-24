import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import { updateUser, loadUser } from '../../../actions';

const UpdateUser = ({ user, loadUser, history }) => {
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    photo: null,
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
            Your Profile has been updated succesfully
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

  useEffect(() => {
    if (user) {
      setData({
        ...data,
        firstname: user.firstname,
        lastname: user.lastname,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const value =
      e.target.name === 'photo' ? e.target.files[0] : e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstname, lastname, photo } = data;
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    if (photo) {
      formData.append('photo', photo);
    }
    updateUser(formData, user._id)
      .then((data) => {
        setError({ ...error, errMsg: '', errStatus: false });
        setSuccess(true);
        setLoading(false);
        loadUser();
        setTimeout(() => history.push('/user/dashboard'), 2000);
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
              First Name
            </label>
            <input
              className="text-input"
              name="firstname"
              defaultValue={firstname}
              onChange={(e) => handleChange(e)}
              type="text"
            />
            <label className="form-label full-width m1rem">
              Last Name
            </label>
            <input
              className="text-input"
              name="lastname"
              defaultValue={lastname}
              onChange={(e) => handleChange(e)}
              type="text"
            />
            <label className="form-label full-width m1rem">
              User Image
            </label>
            <input
              className="file-input"
              name="photo"
              onChange={(e) => handleChange(e)}
              type="file"
              accept=".jpeg, .png, .jpg"
            />
            <input
              type="submit"
              className="btn btn-type"
              value="Update Profile"
            />
          </form>
          <div className="user-profile__action"></div>
        </div>
      );
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Update Profile" />
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
export default connect(mapStateToProps, { loadUser })(UpdateUser);
