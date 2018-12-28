import React, { Component } from 'react';
import { Form, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Jumbotron, Alert } from 'reactstrap';
import { apiRequest } from '../api';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fail: false
        };
    }

    onSubmit(event) {
        event.preventDefault();
        apiRequest('user/authenticate', 'POST', event.target, response => {
            if (response.success === 'false')
                this.setState({ fail: true });
            else {
                sessionStorage.setItem("user", response);
                this.props.setLogged(true);
            }
        });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">Connexion</h1>
                    <p className="lead">Connectez-vous pour profiter de ce système de recherche révolutionnaire</p>
                    <hr className="my-2" />
                    <p>Marre de payer votre plein 20 centimes trop cher ? Vous êtes au bon endroit.</p>
                        <Button
                            type="button"
                            color="primary"
                            onClick={e => this.props.gotoRegister()}>
                            S'inscrire</Button>
                </Jumbotron>

                <div className="row col-md-4 offset-md-4">

                    {
                        this.state.fail ?
                            <Alert color="danger" className="col-md-12">Vos identifiants sont incorrects</Alert>
                            :
                            (
                                this.props.accountCreated &&
                                <Alert color="success">Votre compte a été créé avec grand succès, vous pouvez désormais vous connecter.</Alert>
                            )
                    }

                    <Form className="col-md-12" onSubmit={this.onSubmit.bind(this)}>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Nom d'utilisateur</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="text"
                                name="login"
                                required />
                        </InputGroup><br />

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Mot de passe</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="password"
                                name="password"
                                required />
                        </InputGroup><br />

                        <Button type="submit" color="success" outline>Se connecter</Button>

                    </Form>
                </div>

            </div>
        );
    }

}