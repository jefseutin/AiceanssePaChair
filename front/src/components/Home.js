import React, { Component } from 'react';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: []
        };

    }

    componentDidMount(props) {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({ location: [position.coords.longitude, position.coords.latitude] });
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
            </div>
        );
    }

}