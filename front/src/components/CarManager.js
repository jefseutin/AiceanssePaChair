import React, { Component } from 'react';
import { Button } from 'reactstrap';


export default class CarManager extends Component {


    render() {
        return (
            <div>
                <br />
                <Button color='success'>Ajouter un nouveau bolide</Button><br />
                <br />
                <Button color='primary' onClick={e => this.props.back()}>Revenir en arrière</Button>
            </div >
        );
    }

}