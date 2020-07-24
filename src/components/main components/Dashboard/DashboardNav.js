import React from 'react';
import { Link } from 'react-router-dom';

function DashboardNav({ user }) {
  const renderNavLinks = () => {
    if (user) {
      return (
        <div>
          <h3 className="dashboard-nav__head">User</h3>
          <ul className="dashboard-nav__links">
            <li className="dashboard-nav__links-item">
              <Link to="/user/dashboard">My Profile</Link>
            </li>
            <li className="dashboard-nav__links-item">
              <Link to="/user/purchase-history">
                Purchase History
              </Link>
            </li>
            <li className="dashboard-nav__links-item">
              <Link to="/user/addresses">Addresses</Link>
            </li>
            <li className="dashboard-nav__links-item">
              <Link to={`/user/edit`}>Update Profile</Link>
            </li>
            <li className="dashboard-nav__links-item">
              <Link to={`/user/change-password`}>
                Change Password
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  const renderAdminLinks = () => {
    if (user && user.role === 'admin') {
      return (
        <div>
          <h3 className="dashboard-nav__head">Admin</h3>
          <ul className="dashboard-nav__links">
            <li className="dashboard-nav__links-item">
              <Link to="/admin/products">Products</Link>
            </li>
            <li className="dashboard-nav__links-item">
              <Link to="/admin/orders">Orders</Link>
            </li>
            <li className="dashboard-nav__links-item">
              <Link to="/admin/create-category">Create Category</Link>
            </li>
            <li className="dashboard-nav__links-item">
              <Link to="/admin/create-product">Create Product</Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  return (
    <div>
      {renderAdminLinks()}
      {renderNavLinks()}
    </div>
  );
}

export default DashboardNav;
