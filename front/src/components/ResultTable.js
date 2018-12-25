import React, { Component } from 'react';
import { Table } from 'reactstrap';

export default class ResultTable extends Component {


    render() {

        let k = 1;
        let rows = this.props.stations.map(station => {
            return (
                <tr key={station.id}>
                    <th scope="row">{k++}</th>
                    <td>{station.address}<br/>{station.city}</td>
                    <td>{station.fuels.Gazole}€</td>
                    <td>{station.distance} km</td>
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
                            <th>Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }

}