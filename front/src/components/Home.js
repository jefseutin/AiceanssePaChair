import React, { Component } from 'react';
import { apiRequest } from '../api';

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
                this.setState({ location: [position.coords.longitude, position.coords.latitude] });
                let p = this.state.location[0] + '/' + this.state.location[1];
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
                <p>Longitude: {this.state.location[0]}</p>
                <p>Latitude: {this.state.location[1]}</p>
                <p>Stations autour de vous : {this.state.stations.length}</p>
            </div>
        );
    }

}