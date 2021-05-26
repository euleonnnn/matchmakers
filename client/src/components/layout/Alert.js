import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Functional component for alerts. Destructured props into 
 * alerts. 
 * @param alerts takes in an array of alerts and show it to 
 * client on the frontend based on alertType, id and msg
 */
const Alert = ( {alerts} ) => 
    alerts !== null && alerts.length >= 1 && alerts.map(a => (
        <div key = {a.id} className = {"alert alert-"+a.alertType}> 
            {a.msg}
        </div>
    ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);