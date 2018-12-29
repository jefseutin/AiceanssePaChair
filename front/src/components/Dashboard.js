import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Button, Input } from 'reactstrap';
import { apiRequest } from '../api';
import CustomMap from './CustomMap';
import ResultTable from './ResultTable';


let state = {
    location: [],
    stations: [],
    loading: true,
    consumption: 5.5,
    quantity: 0,
    budget: 0
};

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = state;
    }

    componentWillUnmount() {
        state = this.state;
    }

    componentDidMount(props) {
        if (this.state.location.length === 0)
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
                    this.calculateAndSortBest(1);
            });
        });
    }

    calculateAndSortBest(type) {
        this.setState({ loading: true });

        let carConsumptionKm = this.state.consumption / 100;
        let k = 10;

        this.state.stations.forEach(station => {
            let price = station.fuels['Gazole'];
            station.tripPrice = Number(carConsumptionKm * station.distance * price).toFixed(2) * 2;
            station.quantity = (type === 1) ? this.state.quantity : Number((this.state.budget - station.tripPrice) / price).toFixed(2);
            station.fullPrice = Number(price * station.quantity).toFixed(2);
            station.totalCost = Number(Number(station.fullPrice) + Number(station.tripPrice)).toFixed(2);
            if (--k === 0) {
                this.sortByKey(this.state.stations, type === 1 ? "totalCost" : "quantity");
                if (type === 2)
                    this.state.stations.reverse();
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
                <h1 className="display-1">Jiléjone</h1>
                <div>
                    <p>
                        Latitude: {this.state.location[0]},
                        Longitude: {this.state.location[1]},
                        Stations autour de vous : {this.state.stations.length}
                    </p>
                </div>
                {
                    this.state.loading === false ?
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
                                    <Input type="number" onChange={e => this.setState({ quantity: Number(e.target.value) })} />
                                    <InputGroupAddon addonType="append">
                                        <Button onClick={e => this.calculateAndSortBest(1)}>Calculer</Button>
                                    </InputGroupAddon>
                                </InputGroup> <br />

                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Budget (€)</InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="number" onChange={e => this.setState({ budget: Number(e.target.value) })} />
                                    <InputGroupAddon addonType="append">
                                        <Button onClick={e => this.calculateAndSortBest(2)}>Calculer</Button>
                                    </InputGroupAddon>
                                </InputGroup> <br />

                                <CustomMap position={this.state.location} stations={this.state.stations} />
                            </div>
                        </div>
                        : <img alt="loading_gif" src="http://le-macaron.fr/img/load-insta.gif" />
                }
            </div>
        );
    }

}