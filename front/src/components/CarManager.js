import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import CarModal from '../modals/CarModal';
import { apiRequest } from '../api';


export default class CarManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            showModal: false,
            selectedCar: -1,
            loading: true
        }

        apiRequest('car/all', 'GET', JSON.parse(sessionStorage.getItem('user'))._id.$oid, response => {
            this.setState({ items: response });
            this.setState({loading: false});
        });
    }

    onModalClose(res) {
        if (res !== undefined) {
            if (this.state.selectedCar > -1) {
                if (res === -1)
                    this.setState({ items: this.state.items.filter((_, i) => this.state.selectedCar !== i) });
                else {
                    const newitems = this.state.items.slice();
                    newitems[this.state.selectedCar] = res;
                    this.setState({ items: newitems });
                }
            } else
                this.setState({ items: [...this.state.items, res] });
        }
        this.setState({ showModal: false, selectedCar: -1 });
    }

    generateRows() {
        let k = 1;
        return this.state.items.map((car, i) => {
            return (
                <tr key={k}>
                    <th scope='row'>{k++}</th>
                    <td>{car.name}</td>
                    <td>{car.consumption}L</td>
                    <td>{car.fuel}</td>
                    <td><Button onClick={e => this.setState({ showModal: true, selectedCar: i })}>Modifer</Button></td>
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

                {this.state.loading && <img alt="loading_gif" src="https://goo.gl/MzUHSY" />}


                {
                    this.state.showModal &&
                    <CarModal
                        onClose={this.onModalClose.bind(this)}
                        car={this.state.selectedCar > -1 ? this.state.items[this.state.selectedCar] : undefined} />
                }
            </div >
        );
    }

}