// @flow

import React, { createRef, Component, Fragment } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

// type Position = [number, number];

// type Props = {|
//   content: string,
//   position: Position,
// |};

// type MarkerData = {| ...Props, key: string |};

// const MyPopupMarker = ({ content, position }: Props) => (
//   <Marker position={position}>
//     <Popup>{content}</Popup>
//   </Marker>
// );

// const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
//   const items = markers.map(({ key, ...props }) => <MyPopupMarker key={key} {...props} />);
//   return <Fragment>{items}</Fragment>;
// };

// type State = {
//   markers: Array<MarkerData>,
// };

// export default class CustomComponent extends Component<{}, State> {
//   state = {
//     markers: [
//       { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
//       { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
//       { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
//     ],
//   };

//   render() {
//     return (
//       <Map center={[51.505, -0.09]} zoom={13} className={'homeMap'}>
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <MyMarkersList markers={this.state.markers} />
//       </Map>
//     );
//   }
// }

import L from 'leaflet';

type State = {
  lat: number,
  lng: number,
  zoom: number,
};

export const pointerIcon = new L.divIcon({
  html: "<div style='background-color: red; width: 100px'>1</div>",
});

export const suitcasePoint = new L.Icon({
  iconUrl: '../assets/suitcaseIcon.svg',
  iconRetinaUrl: '../assets/suitcaseIcon.svg',
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});

export default class CustomIcons extends Component<{}, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    const position2 = [51.50503625326346, -0.10088324546813966];
    return (
      <Map center={position} zoom={this.state.zoom} className={'homeMap'}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={pointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={position2} icon={suitcasePoint}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );
  }
}
