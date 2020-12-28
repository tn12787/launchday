import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import netlifyidentity from 'netlify-identity-widget';
import LoggedOutApp from './LoggedOutApp';
import { ChakraProvider } from '@chakra-ui/react';
import { setupIdentity } from 'setupIdentity';

setupIdentity();
const user = netlifyidentity.currentUser();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>{user ? <App /> : <LoggedOutApp />}</ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
