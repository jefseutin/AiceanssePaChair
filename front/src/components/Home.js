import React, { Component } from 'react';
import { apiRequest } from '../api';
import CustomMap from './CustomMap';

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
                    console.log(response)
                    this.setState({
                        stations: response
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
                    <CustomMap position={this.state.location} stations={this.state.stations}/>
                }
            </div>
        );
    }

}