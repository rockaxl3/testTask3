import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import ChipsInput from './components/ChipsInput';
import Chip from './components/Chip';


ReactDOM.render(<ChipsInput value=''></ChipsInput>, document.getElementById('root'));
// ReactDOM.render(<ChipsInput value='это первый чипс, это "второй," чипс'></ChipsInput>, document.getElementById('root'));
