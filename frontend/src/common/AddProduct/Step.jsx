import React from 'react';
import PropTypes from 'prop-types';

const Step = ({ active, icon, description, title }) => {
  return (
    <div className={active ? 'active step' : 'step'}>
      {icon ? <i className={`${icon} icon`}></i> : null}
      <div className="content">
        <div className="title">{title}</div>
        <div className="description">{description? description: null}</div>
      </div>
    </div>
  );
};

Step.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
};

export default Step;
