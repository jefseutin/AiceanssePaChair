import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormGroup,
    Label,
    CustomInput
} from 'reactstrap';
import { apiRequest } from '../api';

export default class CarModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true
        };

        this.onClose = this.onClose.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        let url = this.props.car ? ('car/' + this.props.car._id.$oid) : 'car';
        apiRequest(url, this.props.car ? 'PUT' : 'POST', event.target, response => {
            this.onClose(response);
        });
    }

    onDelete(event) {
        apiRequest('car', 'DELETE', this.props.car._id.$oid, response => {
            this.onClose(-1);
        });
    }

    onClose(res) {
        this.setState({
            isOpen: false
        });
        this.props.onClose(res);
    }

    generateFuelsRadio() {
        return ['Gazole', 'SP98', 'SP95', 'GPLc', 'E10', 'E85'].map(fuel => {
            return (
                <CustomInput
                    id={'radio' + fuel}
                    key={'radio' + fuel}
                    type='radio'
                    name='fuel'
                    value={fuel}
                    label={fuel}
                    defaultChecked={this.props.car && this.props.car.fuel === fuel}
                    inline
                    required />
            );
        });
    }

    render() {
        return (
            <div>

                <Modal isOpen={this.state.isOpen} toggle={e => this.onClose()} fade={false}>

                    <ModalHeader
                        toggle={e => this.onClose()}>{this.props.car ? "Modification d'un" : "Ajout d'un nouveau"} bolide</ModalHeader>

                    <ModalBody>

                        <Form
                            id='carForm'
                            onSubmit={this.onSubmit.bind(this)}>

                            <Input
                                type='hidden'
                                name='userID'
                                value={JSON.parse(sessionStorage.getItem('user'))._id.$oid} />

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Nom de la voiture</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name='name'
                                    type='text'
                                    defaultValue={this.props.car && this.props.car.name}
                                    required />
                            </InputGroup><br />

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Consommation (en L/100km)</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    name='consumption'
                                    type='number'
                                    step='0.1'
                                    min='2.5'
                                    max='20.0'
                                    defaultValue={this.props.car && this.props.car.consumption}
                                    required />
                            </InputGroup><br />

                            <FormGroup>
                                <Label>Carburant</Label>
                                <div>
                                    {this.generateFuelsRadio()}
                                </div>
                            </FormGroup>

                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        {this.props.car && <Button color='danger' onClick={e => this.onDelete()}>Supprimer</Button>}
                        <Button color="primary" type='submit' form='carForm'>Enregistrer</Button>
                        <Button color="secondary" onClick={e => this.onClose()}>Annuler</Button>
                    </ModalFooter>

                </Modal>

            </div>
        );
    }

}