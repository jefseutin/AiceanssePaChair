import React, { Component } from 'react';
import { Form, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Jumbotron } from 'reactstrap';

export default class Login extends Component {

    onSubmit() {
        sessionStorage.setItem("user", "bonjour");
        this.props.setLogged(true);
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-1">Connexion</h1>
                    <p className="lead">Connectez-vous pour profiter de ce système de recherche révolutionnaire</p>
                    <hr className="my-2" />
                    <p>Marre de payer votre plein 20 centimes trop cher ? Vous êtes au bon endroit.</p>
                    <p className="lead">
                        <Button
                            type="button"
                            color="primary"
                            onClick={e => this.props.gotoRegister()}>
                            S'inscrire</Button>
                    </p>
                </Jumbotron>

                <div className="row col-md-4 offset-md-4">

                    <Form className="col-md-12" onSubmit={this.onSubmit.bind(this)}>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Nom d'utilisateur</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="text"
                                required />
                        </InputGroup><br />

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Mot de passe</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type="password"
                                required />
                        </InputGroup><br />

                        <Button type="submit" color="success" outline>Se connecter</Button>

                    </Form>
                </div>

            </div>
        );
    }

}