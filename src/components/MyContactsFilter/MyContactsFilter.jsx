import PropTypes from 'prop-types';

import css from './MyContactsFilter.module.css';

const MyContactsFilter = ({ handleChange, value }) => {
  return (
    <div className={css.filter_wrap}>
      <label>Find contacts by name</label>
      <input
        className={css.input}
        onChange={handleChange}
        name="filter"
        type="text"
        value={value}
      />
    </div>
  );
};

export default MyContactsFilter;

MyContactsFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
