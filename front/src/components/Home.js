import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Button, Input } from 'reactstrap';
import { apiRequest } from '../api';
import CustomMap from './CustomMap';
import ResultTable from './ResultTable';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: [],
            stations: [],
            loading: true,
            consumption: 5.5
        };
    }

    componentDidMount(props) {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ location: [position.coords.latitude, position.coords.longitude] });
                this.getNearestStations();
            },
            error => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    getNearestStations() {
        apiRequest('station/nearest', 'GET', this.state.location[1] + '/' + this.state.location[0], response => {
            this.setState({
                stations: response
            });

            this.state.stations.forEach(station => station.location.coordinates.reverse());
            this.sortByKey(this.state.stations, 'price');
            this.state.stations.reverse();

            this.getDistance(0);
        });
    }

    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    getDistance(idxStart) {
        let ltd = this.state.location[0], lng = this.state.location[1];
        let k = 10;
        this.state.stations.forEach(station => {
            let data = `DistanceMatrix?origins=${ltd},${lng}&destinations=${station.location.coordinates}&travelMode=driving&key=AvIF_IWuz6PuSbpY35CGEFE7JIzegMdb4j0XbZURfXkJZGACLZjVPrPwXZQNlOGP`;
            apiRequest('distance', 'GET', data, res => {
                station.distance = Number(res.resourceSets[0].resources[0].results[0].travelDistance).toFixed(2);
                if (--k === 0)
                    this.calculateAndSortBest();
            });
        });
    }


    calculateAndSortBest() {
        let carConsumptionKm = 6.8 / 100, quantity = 60, k = 10;

        this.state.stations.forEach(station => {
            station.quantity = quantity;
            station.fullPrice = Number(station.fuels['Gazole'] * quantity).toFixed(2);
            station.tripPrice = Number(carConsumptionKm * station.distance * station.fuels['Gazole']).toFixed(2);
            station.totalCost = Number(Number(station.fullPrice) + Number(station.tripPrice)).toFixed(2);
            if (--k === 0) {
                this.sortByKey(this.state.stations, "totalCost");
                this.setState({
                    loading: false
                });
                console.log(this.state.stations);
            }
        });

    }

    render() {

        return (
            <div>
                <div>
                    <p>Latitude: {this.state.location[0]}</p>
                    <p>Longitude: {this.state.location[1]}</p>
                    <p>Stations autour de vous : {this.state.stations.length}</p>
                </div>
                {
                    this.state.loading === false &&
                    <div className="row col-md-10 offset-md-1">
                        <div className="col-md-8" >
                            <ResultTable stations={this.state.stations} />
                        </div>
                        <div className="col-md-4">

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Consommation (L/100km)</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    type="number"
                                    min="3"
                                    max="20"
                                    step="0.1"
                                    defaultValue={this.state.consumption}
                                    onChange={e => this.setState({ consumption: Number(e.target.value) })} />
                            </InputGroup><br />

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Quantité (Litres)</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" id="quantity" />
                                <InputGroupAddon addonType="append">
                                    <Button onClick={e => console.log("calculate from quantity")}>Calculer</Button>
                                </InputGroupAddon>
                            </InputGroup> <br />

                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Budget (€)</InputGroupText>
                                </InputGroupAddon>
                                <Input type="number" />
                                <InputGroupAddon addonType="append">
                                    <Button onClick={e => console.log("calculate from budget")}>Calculer</Button>
                                </InputGroupAddon>
                            </InputGroup> <br />

                            <CustomMap position={this.state.location} stations={this.state.stations} />
                        </div>
                    </div>
                }
            </div>
        );
    }

}