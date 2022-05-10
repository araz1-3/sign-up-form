import React from 'react';

import {Route,Switch,Redirect} from "react-router-dom"
import SignUp from "./SignUP";
import Login from "./Login";

const Links = () => {
    return (
        <div>
            <Switch>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login}/>
                <Redirect from="/" to="/SignUp"/>
            </Switch>
        </div>
    );
};

export default Links;