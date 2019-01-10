import React, { Component } from 'react';
import { Form, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Jumbotron } from 'reactstrap';
import { apiRequest } from '../api';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });
        apiRequest('user', 'POST', event.target, response => {
            this.setState({ loading: false });
            if (response.success)
                this.props.gotoLogin();
        });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Inscription</h1>
                    <p className="lead">Inscrivez-vous pour économiser en masse des centaines de centimes d'€</p>
                </Jumbotron>

                <div className="row col-md-4 offset-md-4">

                    <Form className="col-md-12" onSubmit={this.onSubmit.bind(this)}>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Nom d'utilisateur</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="login"
                                type="text"
                                required />
                        </InputGroup><br />

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Mot de passe</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                name="password"
                                type="password"
                                required />
                        </InputGroup><br />


                        <Button
                            type="submit"
                            color="success"
                            disabled={this.state.loading}
                            outline>S'inscrire</Button>

                    </Form>
                </div>

            </div>
        );
    }


}