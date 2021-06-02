import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import Login from './components/Seguridad/Login';


ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <App/>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);

