import React from 'react';
import { useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

const Input = ({ name, label, type = 'text', required = false }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block text-lg font-semibold mb-2">{label}</label>
      <input
        {...register(name, { required })}
        type={type}
        className={`w-full p-2 border rounded ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm block mt-1">
          {label} es obligatorio
        </span>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default Input;
