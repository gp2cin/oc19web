import React from 'react';
import { Map, Popup, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import { polygon, divIcon } from 'leaflet';

// import RecifeJson from './cidades.json';
// import bairrosRecife from './bairrosRecife.json';

import { CircularProgress } from '@material-ui/core';

const PlotTypleOptions = { byCity: 'byCity', byNeighborhood: 'byNeighborhood' };

export default function CustomMap({ userLocation, geoJson, loading, plotType = 'byCity', isObserverCity }) {
  // function onEachFeature(feature, layer) {
  //   if (plotType === PlotTypleOptions.byCity) {
  //     // const { confirmed, active, deaths, recovered } = feature.properties.official_cases;
  //     const { confirmed, recovered } = feature.properties.official_cases;

  //     layer.bindPopup(`
  //     <div style='display: flex'> 
  //       <div>
  //         ${feature.properties.name}
  //       <div/>
  //       <div style='font-size: 10px; margin-top: 5px; padding-top: 5px;border-top: 1px solid rgba(217, 217, 217, 0.8)'/>
  //       <div style='font-size: 10px'>
  //         Confirmados: ${confirmed} 
  //       <div/>
  //       <div style='font-size: 10px'>
  //         Recuperados: ${recovered} 
  //       <div/>
  //     </div>
  //   `);
  //   } else {
  //     const { observer_reports } = feature.properties;
  //     layer.bindPopup(`
  //     <div style='display: flex'> 
  //       <div>
  //         ${feature.properties.name}
  //       <div/>
  //       <div style='font-size: 10px; margin-top: 5px; padding-top: 5px;border-top: 1px solid rgba(217, 217, 217, 0.8)'/>
  //       <div style='font-size: 10px'>
  //         Casos observados:  ${observer_reports} 
  //       <div/>
  //     </div>
  //   `);
  //   }
  // }

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
        properties: { name },
      } = geoLocation;

      let cases;
      let confirmed;
      let recovered;
      let deaths;
      let active;
      let suspect;

      if (plotType === PlotTypleOptions.byCity) {
        if (isObserverCity) {
          cases = geoLocation.properties.observer_reports.total;
          deaths = geoLocation.properties.observer_reports.deaths;
          suspect = geoLocation.properties.observer_reports.suspect;
          confirmed = geoLocation.properties.observer_reports.confirmed;
        } else {
          cases = geoLocation.properties.official_cases.confirmed;
          deaths = geoLocation.properties.official_cases.deaths;
          recovered = geoLocation.properties.official_cases.recovered;
          active = geoLocation.properties.official_cases.active;
        }

      } else {
        cases = geoLocation.properties.observer_reports.total;
        confirmed = geoLocation.properties.observer_reports.confirmed;
        deaths = geoLocation.properties.observer_reports.deaths;
        suspect = geoLocation.properties.observer_reports.suspect;
      }
      const { lat, lng } = polygon(coordinates).getBounds().getCenter();

      return (
        <Marker position={[lng, lat]} icon={getCaseOnPoint(cases, name)}>
          <Popup>
            <div>{name}</div>
            <div style={{ fontSize: '10px', marginTop: 5, borderTop: '1px solid rgba(217, 217, 217, 0.8)' }}>
              Casos: {cases}
              {
                ((plotType !== PlotTypleOptions.byCity) || (plotType === PlotTypleOptions.byCity && isObserverCity === true)) ?
                  <div>Confirmados: {confirmed}</div>
                  : <div></div>
              }
              Mortes: {deaths}
              {
                (plotType === PlotTypleOptions.byCity && !isObserverCity) ?
                  <div>Recuperados: {recovered}</div>
                  : <div></div>
              }
              {
                ((plotType !== PlotTypleOptions.byCity) || (plotType === PlotTypleOptions.byCity && isObserverCity === true)) ?
                  <div>Suspeitos: {suspect}</div>
                  : <div></div>
              }
              {
                (plotType === PlotTypleOptions.byCity && !isObserverCity) ?
                  <div>Ativos: {active}</div>
                  : <div></div>
              }
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

  return (
    <div className={'homeMap'} style={{ position: 'relative' }}>
      {loading && (
        <>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: 499,
              backgroundColor: 'rgba(219, 219, 219, 0.4)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              zIndex: 501,
            }}
          >
            <CircularProgress style={{ color: '#B23137' }} />
          </div>
        </>
      )}

      <Map
        center={userLocation}
        zoom={zoomData.zoom}
        maxZoom={zoomData.maxZoom}
        minZoom={zoomData.minZoom}
        style={{ width: '100%', height: '100%' }}
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
        {!loading && (
          <>
            {renderCases()}
            {plotType === PlotTypleOptions.byCity ? (
              <GeoJSON key={'pernambuco-geoJson'} data={geoJson} />
            ) : (
                <GeoJSON key={'recife-geoJson'} data={geoJson} />
              )}
          </>
        )}
      </Map>
    </div>
  );
}
