import React from 'react';
import DashboardLayout from './DashboardLayout';
import { connect } from 'react-redux';
import emptyimg from '../../../img/Empty.jpeg';
import { Link } from 'react-router-dom';
import { profilePictureFromServer } from '../../utils/apiLinks';

const DashBoard = ({ user }) => {
  const renderUserInfo = () => {
    if (user) {
      return (
        <div className="user-profile">
          <div className="user-profile__image">
            <img
              src={
                user.photo
                  ? `${profilePictureFromServer}/${user.photo}`
                  : emptyimg
              }
              alt={user.firstname}
            />
          </div>
          <div className="user-profile__name">
            <h3>
              {user.firstname} {user.lastname}
            </h3>
            <h5>{user.role === 'admin' ? 'Admin' : 'Buyer'}</h5>
          </div>
          <div className="user-profile__action">
            <Link to={`/user/edit`} className="btn">
              Edit Profile
            </Link>
          </div>
        </div>
      );
    }
  };

  return <DashboardLayout>{renderUserInfo()}</DashboardLayout>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(DashBoard);
