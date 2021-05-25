import React, { Fragment } from 'react';
import loading from './loading.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={loading}
      style={{ width: '300px', margin: 'auto', display: 'block' }}
      alt=""
    />
  </Fragment>
);

export default Spinner;