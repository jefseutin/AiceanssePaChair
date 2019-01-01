import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class ResultTable extends Component {


    render() {
        console.log('la')

        let k = 1;
        let rows = this.props.stations.map(station => {
            return (
                <tr key={k}>
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

        return (
            <div>
                <Table hover striped>
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
                {this.props.loading && <img alt="loading_gif" src="http://le-macaron.fr/img/load-insta.gif" />}
            </div>
        );
    }

}