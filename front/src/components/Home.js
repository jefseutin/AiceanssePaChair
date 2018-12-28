import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('user') !== null
        }
    }

    setLogged(value) {
        this.setState({ loggedIn: value });
    }

    render() {

        return (
            <div>

                <Header
                    loggedIn={this.state.loggedIn}
                    setLogged={this.setLogged.bind(this)} />

                {
                    this.state.loggedIn &&
                    <Dashboard />
                }

            </div>
        );
    }

}