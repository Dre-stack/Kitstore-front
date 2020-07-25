import React from 'react';

export default ({ input, label, type, meta: { error, touched } }) => {
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
