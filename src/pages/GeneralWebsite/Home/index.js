import React, { Component } from 'react';
import moment from 'moment';
import { Container } from './styles';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
// import HeatmapLayer from '../../../components/HeatmapLayer';
import { addressPoints } from './mock.js';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
import api from '../../../services/api';
import TabsMaps from './components/TabsMaps';
import { Link } from '@material-ui/core';

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  state = {
    mapHidden: false,
    layerHidden: false,
    addressPoints,
    radius: 4,
    blur: 8,
    max: 0.5,
    limitAddressPoints: true,
    warnings: [],
    // userPosition: [-8.05224, -34.928612],
    userAddress: {
      country: 'br',
      state: 'Pernambuco',
      city: 'Recife',
      position: [-8.05224, -34.928612],
    },
    mapInfo: {
      mapHidden: false,
      layerHidden: false,
      zoom: 12,
      radius: 4,
      blur: 8,
      max: 0.5,
      limitAddressPoints: true,
    },
    officialCases: {
      world: 0,
      state: 0,
      country: 0,
      city: 0,
      updatedAt: new Date(),
    },
  };
  getMapData = async () => {
    try {
      const { userAddress } = this.state;
      const warnings = await api.get('api/v1/warnings/map', {
        params: {
          lat: userAddress.position[0],
          lng: userAddress.position[1],
          radius: 200,
        },
      });
      let warrArray = warnings.data;
      this.setState({
        warnings: warrArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  getInfoByLocation = async () => {
    try {
      const { userAddress } = this.state;
      const officialCases = await api.get('api/v1/cases', {
        params: {
          cidade: userAddress.city,
          estado: userAddress.state,
        },
      });

      let offCases = officialCases.data;
      let newOffCases = {
        world: offCases.world ? offCases.world.confirmed : undefined,
        state: offCases.state ? offCases.state.confirmed : undefined,
        country: offCases.country ? offCases.country.confirmed : undefined,
        city: offCases.city ? offCases.city.confirmed : undefined,
        updatedAt: offCases.world ? offCases.world.updatedAt : undefined,
      };
      this.setState({
        officialCases: newOffCases,
      });
    } catch (e) {
      console.log(e);
    }
  };
  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const { userAddress } = this.state;
      if (latitude && longitude) {
        this.setState({
          userAddress: {
            position: [latitude, longitude],
            ...userAddress,
          },
        });
        this.getUserAddress();
        this.getInfoByLocation();
      }
    });
  };
  getUserAddress = async () => {
    const { userAddress } = this.state;
    const { position } = userAddress;
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position[0]}&lon=${position[1]}`)
      .then((results) => results.json())
      .then((data) => {
        const { address } = data;
        const { country_code, state, city } = address;
        this.setState({
          userAddress: {
            ...userAddress,
            country: country_code,
            state,
            city,
          },
        });
        this.getMapData();
      });
  };
  componentDidMount() {
    this.getUserLocation();
    this.getMapData();
    this.getInfoByLocation();
  }
  render() {
    // const { userAddress, mapInfo, warnings, officialCases } = this.state;
    const { userAddress, officialCases } = this.state;

    return (
      <Container className={'row'}>
        <Header />
        <div className="marginContainer">
          <TabsMaps userAddress={userAddress} />
          {/* <Map center={userAddress.position} maxZoom={18} zoom={mapInfo.zoom} className={'homeMap'}>
          <HeatmapLayer
            fitBoundsOnLoad
            fitBoundsOnUpdate
            points={addressPoints}
            latitudeExtractor={(m) => m[0]}
            longitudeExtractor={(m) => m[1]}
            intensityExtractor={(m) => parseFloat(m[2])}
          />
          <MarkerClusterGroup>
            {warnings.map(
              (warning) => (
                <Marker position={[warning[0], warning[1]]} />
              )
              // console.log(warning)
            )}
          </MarkerClusterGroup>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OCovid19</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={userAddress.position}>
            <Popup>
              <span>Você está aqui.</span>
            </Popup>
          </Marker>
        </Map> */}

          <div className="col-md-12 row justify-content-center align-items-center report-home">
            <div href="/warnings/new" className="col-lg-4 report-item">
              <div className={'text-center row justify-content-center align-items-center'}>
                <div
                  className={'rounded-circle row justify-content-center align-items-center'}
                  style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#b23137',
                  }}
                >
                  <span
                    style={{ width: '100%', color: '#fff', fontSize: '5em', borderRadius: '21px 21px 0 0' }}
                    className="fa fa-bullhorn fa-6"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <Link href="/warnings/new" color="inherit">
                <h2 className={'text-center report-title'}>{'Informe'}</h2>
                <p className={'text-center'}>{'Seus sintomas'}</p>
              </Link>

              {/* <p className={'text-center'}>
              <a className="btn btn-secondary" href="#" role="button">
                {'Informar'}
              </a>
            </p> */}
            </div>
            <div className="col-lg-4 report-item">
              <div className={'text-center row justify-content-center align-items-center'}>
                <div
                  className={'rounded-circle row justify-content-center align-items-center'}
                  style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#b23137',
                  }}
                >
                  <span
                    style={{ width: '100%', color: '#fff', fontSize: '5em', borderRadius: '21px 21px 0 0' }}
                    className="fa fa-line-chart fa-6"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <Link href="/official-cases" color="inherit">
                <h2 className={'text-center report-title'}>{'Acompanhe'}</h2>
                <p className={'text-center'}>{'o Covid-19 na sua região.'}</p>
              </Link>

              {/* <p className={'text-center'}>
              <a className="btn btn-secondary" href="#" role="button">
                {'Ver mais'}
              </a>
            </p> */}
            </div>
            <div className="col-lg-4 report-item">
              <div className={'text-center row justify-content-center align-items-center'}>
                <div
                  className={'rounded-circle row justify-content-center align-items-center'}
                  style={{
                    width: '140px',
                    height: '140px',
                    backgroundColor: '#b23137',
                  }}
                >
                  <span
                    style={{ width: '100%', color: '#fff', fontSize: '5em', borderRadius: '21px 21px 0 0' }}
                    className="fa fa-user-o fa-6"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <Link href="/signup" color="inherit">
                <h2 className={'text-center report-title'}>{'Participe'}</h2>
                <p className={'text-center'}>Cadastre-se.</p>
              </Link>
              {/* <p className={'text-center'}>
              <a className="btn btn-secondary" href="#" role="button">
                {'Ver mais'}
              </a>
            </p> */}
            </div>
          </div>

          <div className="col-md-12 box-official">
            <h1 className="col-lg-12 text-center">{'Dados IRRD-PE'}</h1>
            <h6 className="col-lg-12 text-center">
              <span>{`Atualizado em: ${moment(officialCases.updatedAt).format('DD/MM/YYYY')}`}</span>{' '}
            </h6>
          </div>
          <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
            <div className="col-md-6 bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center  overflow-hidden">
              <div className="my-3 py-3">
                <h2 className="display-5">{officialCases.world.toLocaleString()}</h2>
                <p className="lead">{'Casos no mundo.'}</p>
              </div>

              <div
                className="mx-auto"
                // style={{ width: '80%', height: '150px', borderRadius: '21px 21px 0 0' }}
              >
                <span
                  style={{ width: '80%', fontSize: '5em', borderRadius: '21px 21px 0 0' }}
                  className="fa fa-globe fa-6"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="col-md-6 bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
              <div className="my-3 p-3">
                <h2 className="display-5">{officialCases.country.toLocaleString()}</h2>
                <p className="lead">{'Casos no seu país.'}</p>
              </div>
              <div className=" mx-auto" style={{ width: '80%', height: '150px', borderRadius: '21px 21px 0 0' }}>
                <img alt={'Country flag'} src={`https://www.countryflags.io/${userAddress.country}/flat/64.png`} />
              </div>
            </div>
          </div>
          <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
            <div className="col-md-6 bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
              <div className="my-3 py-3">
                <h2 className="display-5">{officialCases.state.toLocaleString()}</h2>
                <p className="lead">{`Casos em ${userAddress.state ? userAddress.state : 'seu estado'}.`}</p>
              </div>
              <div className="mx-auto" style={{ width: '80%', height: '150px', borderRadius: '21px 21px 0 0' }}>
                <span
                  style={{ width: '80%', fontSize: '5em', borderRadius: '21px 21px 0 0' }}
                  className="fa fa-map fa-6"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
            <div className="col-md-6 bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
              <div className="my-3 p-3">
                <h2 className="display-5">{officialCases.city.toLocaleString()}</h2>
                <p className="lead">{`Casos em ${userAddress.city ? userAddress.city : 'sua cidade'}.`}</p>
              </div>
              <div className=" mx-auto" style={{ width: '80%', height: '150px', borderRadius: '21px 21px 0 0' }}>
                <span
                  style={{ width: '80%', fontSize: '5em', borderRadius: '21px 21px 0 0' }}
                  className="fa fa-map-marker fa-6"
                  aria-hidden="true"
                ></span>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </Container>
    );
  }
}
export default Home;
