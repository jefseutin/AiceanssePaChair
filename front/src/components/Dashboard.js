import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Button, Input, Badge, FormFeedback } from 'reactstrap';
import { apiRequest } from '../api';
import CustomMap from './CustomMap';
import ResultTable from './ResultTable';


export default class Home extends Component {

    constructor(props) {
        super(props);
        const previousState = JSON.parse(sessionStorage.getItem('dashboard_state'));
        this.state = previousState != null ? previousState : {
            location: [],
            stations: [],
            cars: [],
            loading: true,
            selectedCar: undefined,
            quantity: 0,
            budget: 0
        };

        apiRequest('car/all', 'GET', JSON.parse(sessionStorage.getItem('user'))._id.$oid, response => {
            this.setState({ cars: response, loading: false });
        });
    }

    componentWillUnmount() {
        if (sessionStorage.getItem('user')) {
            this.setState({ loading: true });
            sessionStorage.setItem('dashboard_state', JSON.stringify(this.state));
        }
    }

    componentDidMount(props) {
        if (this.state.location.length === 0)
            navigator.geolocation.getCurrentPosition(
                position => {
                    this.setState({ location: [position.coords.latitude, position.coords.longitude] });
                },
                error => console.log(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
    }

    getNearestStations() {
        this.setState({ loading: true });
        apiRequest('station/nearest', 'GET', this.state.location[1] + '/' + this.state.location[0] + '/' + this.state.cars[this.state.selectedCar].fuel, response => {
            response.forEach(station => station.location.coordinates.reverse());
            this.sortByKey(response, 'price');
            response.reverse();
            this.setState({ stations: response }, () => {
                this.getDistance(0);
            });
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
        let k = this.state.stations.length;
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
        let carConsumptionKm = this.state.cars[this.state.selectedCar].consumption / 100;
        let k = this.state.stations.length;

        this.state.stations.forEach(station => {
            let price = station.fuels[this.state.cars[this.state.selectedCar].fuel];
            station.tripPrice = Number(carConsumptionKm * station.distance * price).toFixed(2) * 2;
            station.quantity = (type === 1) ? this.state.quantity : Number((this.state.budget - station.tripPrice) / price).toFixed(2);
            station.fullPrice = Number(price * station.quantity).toFixed(2);
            station.totalCost = Number(Number(station.fullPrice) + Number(station.tripPrice)).toFixed(2);
            if (--k === 0) {
                if (this.state.stations.length > 1) {
                    this.sortByKey(this.state.stations, type === 1 ? "totalCost" : "quantity");
                    if (type === 2)
                        this.state.stations.reverse();
                }
                this.setState({ loading: false });
            }
        });

    }

    render() {

        return (
            <div>
                <br />
                <div className="row col-md-10 offset-md-1">
                    {
                        (this.state.selectedCar && this.state.cars.length > 0) &&
                        <div className="row col-md-8">
                            <h3 className='col-md-6'><Badge pill>Carburant : {this.state.cars[this.state.selectedCar].fuel}</Badge></h3>
                            <h3 className='col-md-6'><Badge pill>Consommation : {this.state.cars[this.state.selectedCar].consumption} L/100km</Badge></h3>
                        </div>
                    }
                    <br />
                    <div className="col-md-8" >
                        <ResultTable
                            loading={this.state.loading}
                            stations={this.state.stations}
                            fuel={this.state.selectedCar && this.state.cars[this.state.selectedCar].fuel} />
                    </div>
                    <div className="col-md-4">

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>Bolide</InputGroupText>
                            </InputGroupAddon>
                            <Input
                                type='select'
                                defaultValue={this.state.selectedCar}
                                onChange={e => this.setState({ selectedCar: e.target.value }, () => {
                                    if (this.state.selectedCar)
                                        this.getNearestStations();
                                    else
                                        this.setState({ stations: [] });
                                })}

                                {
                                ...!this.state.loading &&
                                (
                                    (!this.state.selectedCar && this.state.cars.length === 0)
                                        ? { invalid: true }
                                        : (!this.state.selectedCar && { valid: true })
                                )
                                }>

                                <option value={undefined}></option>
                                {
                                    this.state.cars.map((car, i) => {
                                        return (
                                            <option key={i} value={i}>{car.name}</option>
                                        )
                                    })
                                }

                            </Input>
                            {
                                (!this.state.selectedCar && this.state.cars.length === 0)
                                    ? <FormFeedback>Ajoutez d'abord un bolide</FormFeedback>
                                    : (!this.state.selectedCar && <FormFeedback valid>Selectionnez un de vos bolides</FormFeedback>)
                            }
                        </InputGroup>

                        <br />
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
                        {
                            this.state.location.length > 0 &&
                            <CustomMap
                                position={this.state.location}
                                stations={this.state.stations}
                                fuel={this.state.selectedCar && this.state.cars[this.state.selectedCar].fuel} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}