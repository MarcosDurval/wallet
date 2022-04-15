import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { value, name, id, onChange, data, label } = this.props;
    return (
      <label htmlFor={ id }>
        {label}
        <select
          required
          value={ value }
          name={ name }
          id={ id }
          onChange={ onChange }
        >
          <option value="">------</option>
          { data.map((coin, index) => (
            <option
              value={ coin }
              key={ index }
            >
              {coin}
            </option>)) }
        </select>
      </label>
    );
  }
}
Select.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,

};

Select.defaultProps = {
  data: undefined,
  value: undefined,
};

export default Select;
