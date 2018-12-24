import React, { Component } from 'react';
import { apiRequest } from '../api';
import CustomMap from './CustomMap';
import ResultTable from './ResultTable';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: [],
            stations: []
        };
    }

    componentDidMount(props) {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ location: [position.coords.latitude, position.coords.longitude] });
                let p = this.state.location[1] + '/' + this.state.location[0];
                apiRequest('station/nearest', 'GET', p, response => {

                    let ltd = this.state.location[0], lng = this.state.location[1];
                    let k = 5;
                    response.slice(0, 5).forEach(station => {
                        let data = `DistanceMatrix?origins=${ltd},${lng}&destinations=${station.location.coordinates.reverse()}&travelMode=driving&key=AvIF_IWuz6PuSbpY35CGEFE7JIzegMdb4j0XbZURfXkJZGACLZjVPrPwXZQNlOGP`;
                        apiRequest('distance', 'GET', data, res => {
                            station['distance'] = Number(res.resourceSets[0].resources[0].results[0].travelDistance).toFixed(2);
                            if (--k === 0)
                                this.setState({
                                    stations: response
                                });
                        });
                    });
                });
            },
            error => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
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
                    this.state.stations.length > 0 &&
                    <div className="row col-md-10 offset-md-1">
                        <div className="col-md-6" >
                            <CustomMap position={this.state.location} stations={this.state.stations} />
                        </div>
                        <div className="col-md-6">
                            <ResultTable stations={this.state.stations.slice(0, 5)} />
                        </div>
                    </div>
                }
            </div>
        );
    }

}