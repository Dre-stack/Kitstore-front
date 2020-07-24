import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout';
import DashboardHeader from './DashboardHeader';
import { connect } from 'react-redux';
import { createCategory } from '../../../actions/adminActions';

function CreateCategory({ user, history }) {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    errStatus: false,
    errMesaage: '',
  });

  useEffect(() => {
    if (user && user.role !== 'admin') {
      history.push('/');
    }
  }, [user, history]);

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    setCategory(value);
  };

  const renderSuccess = () => {
    if (success) {
      return (
        <div className="message-wrapper">
          <p className="message success">
            New Category {category} has been created succesfully
          </p>
        </div>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory(category)
      .then((data) => {
        setLoading(false);
        setSuccess(true);
        setError({ errStatus: false, errMesaage: '' });
      })
      .catch((err) => {
        setError({
          ...error,
          errMesaage: err.response.data.message,
          errStatus: true,
        });
        setCategory('');
      });
  };

  const renderError = () => {
    if (error.errStatus) {
      return (
        <div className="message-wrapper">
          <p className="message error">{error.errMesaage}</p>
        </div>
      );
    }
  };

  const renderForm = () => {
    return (
      <div className="full-width">
        <form
          onSubmit={handleSubmit}
          className="form-wrapper"
          onBlur={() =>
            setError({ ...error, errStatus: false, errMesaage: '' })
          }
        >
          <label className="form-label full-width mhalf">
            {' '}
            Enter Category
          </label>
          <input
            className="text-input"
            name={category}
            type="text"
            value={category}
            required
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-type half-width">
            Create Category
          </button>
        </form>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Create New Category" />

      <div className="full-width">
        {renderError()}
        {success ? renderSuccess() : renderForm()}
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(CreateCategory);
