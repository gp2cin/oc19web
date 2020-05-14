import React from 'react';
import { Map, Popup, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import { polygon, divIcon } from 'leaflet';

// import RecifeJson from './cidades.json';
// import bairrosRecife from './bairrosRecife.json';

import { CircularProgress, Grid } from '@material-ui/core';

const PlotTypleOptions = { byCity: 'byCity', byNeighborhood: 'byNeighborhood' };

export default function CustomMap({ userLocation, geoJson, loading, plotType = 'byCity' }) {
  function onEachFeature(feature, layer) {
    const cases = 1000;
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(`
        <div style='display: flex'> 
          <div>
            ${feature.properties.name}
          <div/>
          <div style='font-size: 10px; margin-top: 5; border-top: 1px solid rgba(217, 217, 217, 0.8)'>
            Casos:  ${cases} 
          <div/>
        </div>
      `);
    }
  }

  function getCaseOnPoint(caseAmount, locationName) {
    return new divIcon({
      className: 'my-div-icon',
      style: 'background-color: yellow',
      html: `
        <div style='display: flex; flex-direction: column'>
          <div style='display: flex'>
            ${locationName}
          </div>
          <div style='display: flex;font-size: 10px; margin-top: 5; border-top: 1px solid rgba(217, 217, 217, 0.8); justify-content: center'>
            ${caseAmount}
          </div>
        </div>
      `,
    });
  }

  function renderCases() {
    return geoJson.features.map((geoLocation) => {
      const {
        geometry: { coordinates },
        properties: { name: name },
      } = geoLocation;

      let cases;
      if (plotType === PlotTypleOptions.byCity) {
        cases = geoLocation.properties.official_cases.confirmed;
      } else {
        cases = geoLocation.properties.observer_reports;
      }
      const { lat, lng } = polygon(coordinates).getBounds().getCenter();

      return (
        <Marker position={[lng, lat]} icon={getCaseOnPoint(cases, name)}>
          <Popup>
            <div>{name}</div>
            <div style={{ fontSize: '10px', marginTop: 5, borderTop: '1px solid rgba(217, 217, 217, 0.8)' }}>
              Casos: {cases}
            </div>
          </Popup>
        </Marker>
      );
    });
  }

  let zoomData = {};

  const { byCity, byNeighborhood } = PlotTypleOptions;
  if (plotType === byCity) {
    zoomData = {
      zoom: 11,
      maxZoom: 13,
      minZoom: 10,
    };
  } else if (plotType === byNeighborhood) {
    zoomData = {
      zoom: 14,
      maxZoom: 16,
      minZoom: 13,
    };
  }

  if (!loading) {
    return (
      <Map
        center={userLocation}
        zoom={zoomData.zoom}
        className={'homeMap'}
        maxZoom={zoomData.maxZoom}
        minZoom={zoomData.minZoom}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userLocation}>
          <Popup>
            <span>Você está aqui.</span>
          </Popup>
        </Marker>
        
        {renderCases()}
        {plotType === PlotTypleOptions.byCity ? (
          <GeoJSON key={'pernambuco-geoJson'} data={geoJson} onEachFeature={onEachFeature} />
        ) : (
          <GeoJSON key={'recife-geoJson'} data={geoJson} onEachFeature={onEachFeature} />
        )}
      </Map>
    );
  } else {
    return (
      <Grid container justify="center" alignItems="center" className={'homeMap'}>
        <Grid item >
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }
}
