import React, { Component } from 'react';
import { Form, Input, InputGroup, InputGroupAddon, InputGroupText, Button, Jumbotron } from 'reactstrap';

export default class Register extends Component {

    onSubmit(){
        console.log("inscription");
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-1">Inscription</h1>
                    <p className="lead">Inscrivez-vous pour économiser en masse des centaines de centimes d'€</p>
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


                        <Button type="submit" color="success" outline>S'inscrire</Button>

                    </Form>
                </div>

            </div>
        );
    }


}