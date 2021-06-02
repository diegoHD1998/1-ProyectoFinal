import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './components/Seguridad/Login';
import Home from './Home';


export default function App() {
    return (
    
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path="/home"  component={Home} />
                
            </Switch>
        </BrowserRouter>
        
    );
}

