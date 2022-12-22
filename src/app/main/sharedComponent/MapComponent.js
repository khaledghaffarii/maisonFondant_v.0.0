import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapComponent extends Component {
  constructor(props){
    super(props);

    this.state= {
        lat: '',
        lng: '',
    }

  }
  onMouseoverMarker(props, marker, e) {
    // ..
  }
  onMarkerDragEnd(coord, index){
    //this.props.setLocation(coord);
    const { latLng } = coord;

    this.setState(prevState =>{
      return{
           ...this.state,
           lat:latLng.lat(),
           lng:latLng.lng()
      }
   });
   this.props.setLocation(latLng.lat(),latLng.lng())
   
    console.log(latLng.lat());
  }
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 36.8065,
          lng: 10.1815
        }}
        center={
          {
            lat: this.props.state.latitude,
            lng: this.props.state.longitude
          } 
        }
        >


      
        <Marker
          title="Location"
          id={1}
          position={{
            lat: this.props.state.latitude,
            lng: this.props.state.longitude
          }}
          draggable={true}
          onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
          >

        </Marker>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCep1aEs90BdL71_GmqJi5bHQgBaZDWHg4'
})(MapComponent);