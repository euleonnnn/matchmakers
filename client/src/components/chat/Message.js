import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {format} from 'timeago.js'

const Message = ({auth: { user }, sent, message, model}) => {

  const [toxic, setToxic] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const isToxic = async (model, message) => {
    // Get predictions
    const predictions = await model.classify(message);
    // Check if there are toxic messages in the predictions
    // Match is true when the message is toxic
    const toxicPredictions = predictions.filter((p) => p.results[0].match);
    return toxicPredictions.length > 0;
  };

  useEffect(() => {
    const getToxic = async () => {
      if (model) {
        // Get toxicity of message
        const textToxicity = await isToxic(model, message.text); 
        // Save toxicity into state
        setToxic(textToxicity);
        // Display toxicity
        setLoading(false);
      }
    };
    getToxic();
  });

  return (
    <Fragment>
       <div className={sent ? "message sent" : "message"}>
        <div className="toptext">
          <p className="messagetext">{message.text}</p>
        </div>
        <div className="text-muted btmtext">{format(message.createdAt)}</div>
        {loading ? <span className="toptext">...</span> : null}
        {!loading && toxic ? <span className="warntext">Warning: Inappropriate language detected. Please chat politely.</span> : null}
      </div>
      </Fragment>
  );
}


Message.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ 
    auth: state.auth,
});

  
export default connect(mapStateToProps, {})(Message);
