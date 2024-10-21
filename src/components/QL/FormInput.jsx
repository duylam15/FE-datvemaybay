import React from 'react';

const FormInput = ({ label, name, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type='text'
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'input-error' : ''}
      />
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

export default FormInput;
