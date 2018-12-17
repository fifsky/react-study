import React from 'react';
import { getAccessToken } from '../util';
import Redirect from 'umi/redirect';

export default ({ children }) => (
  !getAccessToken() ? <Redirect to="/login" /> : <div>{children}</div>
);