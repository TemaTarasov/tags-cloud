import React from 'react';
import { render } from 'react-dom';

import App from './containers/App';

import './styles.css';

document.title = 'Tags cloud';

render(<App/>, document.getElementById('root'));
