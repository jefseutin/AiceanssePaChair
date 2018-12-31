import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import CarModal from '../modals/CarModal';
import { apiRequest } from '../api';


export default class CarManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [JSON.parse('{"userID":"5c256fd3d363ea1e784f7d16","name":"BMW 530D","consumption":"9.4","fuel":"SP98"}')],
            showModal: false
        }

        apiRequest('car/all', 'GET', JSON.parse(sessionStorage.getItem('user'))._id.$oid, response => {
            this.setState({ items: response });
        })
    }

    onModalClose(res) {
        if (res !== undefined)
            this.setState({ items: [...this.state.items, res] });
        this.setState({ showModal: false });
    }

    generateRows() {
        let k = 1;
        return this.state.items.map(car => {
            return (
                <tr key={k}>
                    <th scope='row'>{k++}</th>
                    <td>{car.name}</td>
                    <td>{car.consumption}L</td>
                    <td>{car.fuel}</td>
                    <td><Button>Modifer</Button></td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div>
                <br />
                <div className='col-md-6 offset-md-3'>
                    <div>
                        <Button
                            color='primary'
                            onClick={e => this.props.back()}
                            style={{ float: 'left' }}
                            outline>Revenir au tableau</Button>

                        <Button
                            color='success'
                            onClick={e => this.setState({ showModal: true })}
                            style={{ float: 'right' }}
                            outline>Ajouter un nouveau bolide</Button>
                    </div>
                    <br />
                </div>
                <br />

                <div className='row col-md-6 offset-md-3'>

                    <Table hover striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nom</th>
                                <th>Consommation</th>
                                <th>Carburant</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>{this.generateRows()}</tbody>
                    </Table>
                </div>

                {
                    this.state.showModal &&
                    <CarModal onClose={this.onModalClose.bind(this)} />
                }
            </div >
        );
    }

}