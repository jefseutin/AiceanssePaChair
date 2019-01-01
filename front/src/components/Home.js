import React, { Component } from 'react';
import Header from './Header';
import Dashboard from './Dashboard';
import CarManager from './CarManager';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('user') !== null,
            component: 1
        }
    }

    setLogged(value) {
        this.setState({ loggedIn: value });
    }

    setComponent(value) {
        this.setState({ component: value })
    }

    render() {
        return (
            <div>

                <Header
                    loggedIn={this.state.loggedIn}
                    setComponent={this.setComponent.bind(this)}
                    setLogged={this.setLogged.bind(this)} />

                {
                    this.state.loggedIn &&
                    (this.state.component === 1 ? <Dashboard /> : <CarManager back={e => this.setState({ component: 1 })} />)
                }

            </div>
        );
    }

}