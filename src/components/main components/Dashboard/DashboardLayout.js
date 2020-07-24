import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import PageTop from '../../utils/PageTop';
import { connect } from 'react-redux';
import DashboardNav from './DashboardNav';

export class DashboardLayout extends Component {
  render() {
    return (
      <div>
        <Header bgColor="white" />
        <PageTop title="My Dashboard" />
        <div className="dashboard">
          <div className="dashboard-nav">
            <DashboardNav user={this.props.user} />
          </div>
          <div className="dashboard-main">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(DashboardLayout);
