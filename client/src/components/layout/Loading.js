import React, { Fragment } from 'react';
import loading2 from './loading2.gif';

const Loading = () => (
  <Fragment>
    <img
      src={loading2}
      style={{ width: '300px', margin: 'auto', display: 'block' }}
      alt=""
    />
  </Fragment>
);

export default Loading;