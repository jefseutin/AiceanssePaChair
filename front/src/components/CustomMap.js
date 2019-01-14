import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Circle } from 'react-leaflet';
import Leaflet from 'leaflet'

export default class CustomMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scroll: false
        };
    }

    generateMarkers() {
        return this.props.stations.map(station => {
            let icon = this.customPin(this.props.selectedStation === station.id ? '#FFEB3B' :'#2196F3')
            return (
                <Marker key={station.id} position={station.location.coordinates} icon={icon}>
                    <Popup>
                        Distance : {station.distance}km
                        <br />
                        Litre de {this.props.fuel} : {station.fuels[this.props.fuel]}€
                    </Popup>
                </Marker>
            );
        });
    }

    render() {

        return (
            <div align="center">
                <Map
                    scrollWheelZoom={this.state.scroll}
                    onClick={e => this.setState({ scroll: !this.state.scroll })}
                    center={this.props.position}
                    zoom={12}
                    style={{ height: "500px" }}>

                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <Marker position={this.props.position} icon={this.customPin('#F44336')}>
                        <Popup>
                            Bonjour, ceci est votre position.
                        </Popup>
                    </Marker>

                    <Circle
                        center={this.props.position}
                        radius={5 * 1000}
                    />

                    {this.generateMarkers()}

                </Map>
            </div>
        );
    }

    customPin(color) {
        const markerHtmlStyles = `
        background-color: ${color};
        width: 2rem;
        height: 2rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 2rem 2rem 0;
        transform: rotate(45deg);
        border: 2px solid #FFFFFF`

        const customIcon = Leaflet.divIcon({
            className: "my-custom-pin",
            iconAnchor: [0, 24],
            labelAnchor: [-6, 0],
            popupAnchor: [0, -36],
            html: `<span style="${markerHtmlStyles}" />`
        })

        return customIcon;
    }

}