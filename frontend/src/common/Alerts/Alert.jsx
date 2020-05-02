import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = (props) => {
  const { alerts } = props;
  if (alerts !== null && alerts.length > 0) {
    return alerts.map((alert) => {
      return (
        <div key={alert.id} class={`ui ${alert.alertType} message`}>
          <div class="header">{alert.msg}</div>
        </div>
      );
    });
  } else {
    return <Fragment />;
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return { alerts: state.alertReducer };
};

export default connect(mapStateToProps)(Alert);
