import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class CustomMap extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        let markers = this.props.stations.map(station => {
            return (
                <Marker position={station.location.coordinates.reverse()}>
                    <Popup>{station.address}</Popup>
                </Marker>
            );
        });

        return (
            <div
                style={{
                    height: "700px"
                }}>
                <Map center={this.props.position} zoom={13}
                    style={{
                        height: "700px"
                    }}>
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={this.props.position}>
                        <Popup>
                            Bonjour, ceci est votre position.
                        </Popup>
                    </Marker>
                    {markers}
                </Map>
            </div>
        );
    }

}