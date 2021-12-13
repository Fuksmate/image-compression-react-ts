import React from 'react';
import ReactDOM from 'react-dom';
import Compressor from './Compressor';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Compressor />, div);
  ReactDOM.unmountComponentAtNode(div);
});