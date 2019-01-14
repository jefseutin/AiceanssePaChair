import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class ResultTable extends Component {


    render() {
        let k = 1;
        let rows = this.props.stations.map(station => {
            return (
                <tr key={k} style={{ cursor: 'pointer' }} onClick={e => this.props.setSelectedStation(station.id)}>
                    <th scope="row">{k++}</th>
                    <td>{station.address}<br />{station.city}</td>
                    <td>{station.fuels[this.props.fuel]}€</td>
                    <td>{station.quantity}L</td>
                    <td>{station.fullPrice}€</td>
                    <td>{station.distance} km</td>
                    <td>{station.tripPrice}€</td>
                    <td>{station.totalCost}€</td>
                </tr>
            );
        });

        var options = {
            onRowClick: function (row) {
                console.log(row);
            }
        };

        return (
            <div>
                <Table hover striped
                    options={options}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Adresse</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Plein</th>
                            <th>Distance</th>
                            <th>Trajet</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.props.loading && rows}
                    </tbody>
                </Table>
                {this.props.loading && <img alt="loading_gif" src="https://goo.gl/MzUHSY" />}
            </div>
        );
    }

}