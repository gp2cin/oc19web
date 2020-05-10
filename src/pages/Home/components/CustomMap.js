import React, { useState, useEffect } from 'react';
import { Map, Popup, TileLayer, Marker, GeoJSON } from 'react-leaflet';
import { polygon, divIcon } from 'leaflet';

import RecifeJson from './cidades.json';
import bairrosRecife from './bairrosRecife.json';

const PlotTypleOptions = { byCity: 'byCity', byNeighborhood: 'byNeighborhood' };

export default function CustomMap({ userLocation, plotType = 'byCity' }) {
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
        <div style='display: flex'>
          <div>
            ${locationName}
          <div/>
          <div style='font-size: 10px; margin-top: 5; border-top: 1px solid rgba(217, 217, 217, 0.8)'>
            ${caseAmount}
          <div/>
        </div>
      `,
    });
  }

  // function getCaseOnPoint(caseAmount, locationName) {
  //   return new divIcon({
  //     className: 'amountIcon',
  //     style: 'background-color: yellow',
  //     html: `
  //       <div style='display: flex'>
  //         <!-- <div>
  //           ${locationName}
  //         <div/> -->
  //         <div style='font-size: 11px; margin-top: 5;'>
  //           ${caseAmount}
  //         <div/>
  //       </div>
  //     `,
  //   });
  // }

  function renderCityCases() {
    return RecifeJson.features.map(({ geometry: { coordinates }, properties: { name } }) => {
      const { lat, lng } = polygon(coordinates).getBounds().getCenter();
      const cases = 1000;

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

  function renderNeighborhoodCases() {
    return bairrosRecife.features.map(({ geometry: { coordinates }, properties: { bairro_nome } }) => {
      const { lat, lng } = polygon(coordinates).getBounds().getCenter();
      const cases = 1000;

      return (
        <Marker position={[lng, lat]} icon={getCaseOnPoint(cases, bairro_nome)}>
          <Popup>
            <div>{bairro_nome}</div>
            <div style={{ fontSize: '10px', marginTop: 5, borderTop: '1px solid rgba(217, 217, 217, 0.8)' }}>
              Casos: {cases}
            </div>
          </Popup>
        </Marker>
      );
    });
  }

  function renderAmountCases() {
    const { byCity, byNeighborhood } = PlotTypleOptions;
    if (plotType === byCity) {
      return renderCityCases();
    } else if (plotType === byNeighborhood) {
      return renderNeighborhoodCases();
    }
  }

  let zoomData = {
    zoom: 11,
    maxZoom: 13,
    minZoom: 10,
  };

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

  // TODO desativar sobreposição
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
      {renderAmountCases()}
      {plotType === PlotTypleOptions.byCity ? (
        <GeoJSON key={'pernambuco-geoJson'} data={RecifeJson} onEachFeature={onEachFeature} />
      ) : (
        <GeoJSON key={'recife-geoJson'} data={bairrosRecife} onEachFeature={onEachFeature} />
      )}
    </Map>
  );
}
