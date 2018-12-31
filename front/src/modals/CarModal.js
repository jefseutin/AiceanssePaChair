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
    }

    onSubmit(event) {
        event.preventDefault();
        apiRequest('car', 'POST', event.target, response => {
            this.onClose(response);
        });
    }

    onClose(res) {
        this.setState({
            isOpen: false
        });
        this.props.onClose(res);
    }

    render() {
        return (
            <div>

                <Modal isOpen={this.state.isOpen} toggle={e => this.onClose()} fade={false}>

                    <ModalHeader toggle={e => this.onClose()}>Ajout d'un nouveau bolide</ModalHeader>

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
                                    required />
                            </InputGroup><br />

                            <FormGroup>
                                <Label>Carburant</Label>
                                <div>
                                    <CustomInput id="radioGazole" type='radio' name='fuel' value='Gazole' label="Gazole" inline required />
                                    <CustomInput id="radioSP98" type='radio' name='fuel' value='SP98' label="SP98" inline required />
                                    <CustomInput id="radioSP95" type='radio' name='fuel' value='SP95' label="SP95" inline required />
                                </div>
                            </FormGroup>

                        </Form>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" type='submit' form='carForm'>Ajouter</Button>{' '}
                        <Button color="secondary" onClick={e => this.onClose()}>Annuler</Button>
                    </ModalFooter>

                </Modal>

            </div>
        );
    }

}