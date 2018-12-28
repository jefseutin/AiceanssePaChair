import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import Register from './Register';
import Login from './Login';

export default class Header extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            component: 1,
            accountCreated: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render() {
        let loggedIn = this.props.loggedIn;
        return (
            <div>
                <Navbar color="light" light expand="md">

                    <NavbarBrand href="#">Jiléjone</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />

                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                            <NavItem>
                                <NavLink
                                    href="#"
                                    onClick={e => {
                                        if (loggedIn) {
                                            sessionStorage.clear();
                                            this.props.setLogged(false);
                                        }
                                        else
                                            this.setState({ component: 1 });
                                    }}>
                                    {loggedIn ? 'Se déconnecter' : 'Connexion'}</NavLink>
                            </NavItem>

                            {
                                !loggedIn &&
                                < NavItem >
                                    <NavLink href="#" onClick={e => this.setState({ component: 2 })}>Inscription</NavLink>
                                </NavItem>
                            }

                        </Nav>
                    </Collapse>
                </Navbar>

                {
                    !loggedIn &&
                    (this.state.component === 1
                        ? <Login
                            accountCreated={this.state.accountCreated}
                            setLogged={this.props.setLogged}
                            gotoRegister={e => this.setState({ component: 2 })} />
                        : <Register gotoLogin={e => this.setState({ component: 1, accountCreated: true })} />)
                }

            </div>
        );
    }

}