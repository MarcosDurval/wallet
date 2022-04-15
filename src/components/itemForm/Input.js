import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { type, name, id, value, onChange, label, step } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <input
          type={ type }
          name={ name }
          id={ id }
          step={ step }
          value={ value }
          onChange={ onChange }
          required
        />
      </label>
    );
  }
}
Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  step: PropTypes.string,
};

Input.defaultProps = {
  value: undefined,
  step: undefined,
};

export default Input;
