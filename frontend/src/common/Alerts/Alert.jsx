import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = (props) => {
  const { alerts } = props;
  if (alerts !== null && alerts.length > 0) {
    return (
      <div
        className="ui container"
        style={{ marginTop: '.2rem', marginBottom: '.2rem' }}
      >
        {alerts.map((alert) => {
          return (
            <div key={alert.id} class={`ui ${alert.alertType} message`}>
              <div class="header">{alert.msg}</div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div
        className="ui container"
        style={{ marginTop: '.2rem', marginBottom: '.2rem' }}
      ></div>
    );
  }
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return { alerts: state.alertReducer };
};

export default connect(mapStateToProps)(Alert);
