import React from 'react';
import { Route, Switch, Router, Redirect, BrowserRouter } from 'react-router-dom';

import App from './views/App';
import Login from './views/Login';
import Types from './views/Types';
import Users from './views/Users';
import Clients from './views/Clients';
import NewMachine from './views/NewMachine';
import FindMachine from './views/FindMachine';

import { createBrowserHistory } from "history";

import { isValidUser } from './services/user';
const hist = createBrowserHistory();


export default class Routes extends React.Component {
    render() {
        return (
            <Router history={hist}>
                <Switch>
                    <Route path='/sign' render={() => !isValidUser() ? <Login/>: <Redirect to="/" />}/>
                    <Route path='/' exact render={() => isValidUser() ? <App/>: <Redirect to="/sign" />}/>
                    <Route path='/categories' render={() => isValidUser() ? <Types/>: <Redirect to="/sign" />}/>
                    <Route path='/users' render={() => isValidUser() ? <Users/>: <Redirect to="/sign" />}/>
                    <Route path='/clients' render={() => isValidUser() ? <Clients/>: <Redirect to="/sign" />}/>
                    <Route path='/newmachine' render={() => isValidUser() ? <NewMachine/>: <Redirect to="/sign" />}/>
                    <Route path='/find' render={() => isValidUser() ? <FindMachine/>: <Redirect to="/sign" />}/>
                    <Route path='/find/:id' render={() => isValidUser() ? <FindMachine/>: <Redirect to="/sign" />}/>
                    <Route render={() => <Redirect to="/sign" />}/>                
                </Switch>
            </Router>
        )
    }
}