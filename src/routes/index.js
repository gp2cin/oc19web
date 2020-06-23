import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated, isAuthenticatedObserver } from '../services/auth';

import Home from '../pages/GeneralWebsite/Home';
import SignIn from '../pages/GeneralWebsite/SignIn';
import SignUp from '../pages/GeneralWebsite/SignUp';
import NewWarning from '../pages/GeneralWebsite/NewWarning';
import OfficialCases from '../pages/GeneralWebsite/OfficialCases';
import ObserverReport from '../pages/GeneralWebsite/ObserverReport';
import MyAccount from '../pages/GeneralWebsite/MyAccount';
import AboutUs from '../pages/GeneralWebsite/AboutUs';
import GeneralObservationNotLogged from '../pages/GeneralWebsite/GeneralObservationNotLogged';
import Header from '../components/Header';
import { Container } from '../pages/GeneralWebsite/ObserverReport/styles';
import GeneralObservation from '../pages/GeneralWebsite/GeneralObservation';

// PageWithContainer
import PageWithContainer from './PageWithContainer';

// Dashboard
import { RouteWithLayout } from '../components';
import { Main as MainLayout } from '../layouts';

// Analyst
import { Home as AnalystHome } from '../pages/Analyst';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//       )
//     }
//   />
// );

const PrivateRouteObserver = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      class Comp extends React.Component {
        _isMounted = false;

        constructor(props) {
          super(props);

          this.state = {
            isObs: true,
          };
        }

        componentDidMount() {
          this._isMounted = true;
          isAuthenticatedObserver().then((is) => {
            console.log('IS AUTHOBS1');
            console.log(is);
            this.setState({ isObs: is });
          });
        }

        componentWillUnmount() {
          this._isMounted = false;
        }

        handleCheck = async () => {
          const temp = await isAuthenticatedObserver();
          console.log('IS AUTHOBS');
          console.log(temp);
          this.setState({ isObs: temp });
        };
        handleRedirect = () => {
          if (this.state.isObs === false) {
            console.log('BCSKHSJCANBJADSNCJK');
            return <Redirect to="/" />;
          }
        };
        render() {
          return (
            <div>
              {this.handleCheck}
              <div>{!this.state.isObs ? <Redirect to="/general-observation" /> : <Component {...props} />}</div>
            </div>
          );
        }
      }
      return <Comp />;
    }}
  />
);

const GeneralObservationRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      function CompG() {
        return (
          <div style={{ overflow: 'auto' }}>
            <Header />
            <Container>
              <div className="observer-report-container">
                <div className="content row d-flex p-2">
                  <form className="col-md-12">
                    <Component {...props} />
                  </form>
                </div>
              </div>
            </Container>
          </div>
        );
      }
      return isAuthenticated() ? (
        <div style={{ overflow: 'auto' }}>
          <Header />
          <Container>
            <div className="observer-report-container">
              <div className="content row d-flex p-2">
                <form className="col-md-12">
                  <GeneralObservation {...props} />
                </form>
              </div>
            </div>
          </Container>
        </div>
      ) : (
        <CompG />
      );
    }}
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={() => <PageWithContainer Page={Home} />} />
      <Route exact path={'/warnings/new'} component={() => <PageWithContainer Page={<NewWarning />} />} />
      <Route path={'/official-cases'} component={() => <PageWithContainer Page={<OfficialCases />} />} />
      <PrivateRouteObserver
        path={'/observer-report'}
        component={() => <PageWithContainer Page={<ObserverReport />} />}
      />
      <Route path={'/about-us'} component={() => <PageWithContainer Page={<AboutUs />} />} />
      <GeneralObservationRoute
        path={'/general-observation'}
        component={() => <PageWithContainer Page={<GeneralObservationNotLogged />} />}
      />
      <Route path={'/signin'} component={() => <PageWithContainer Page={<SignIn />} />} />
      <Route path={'/signup'} component={() => <PageWithContainer Page={<SignUp />} />} />
      <Route path={'/my-account'} component={() => <PageWithContainer Page={<MyAccount />} />} />

      <RouteWithLayout component={<AnalystHome />} exact layout={MainLayout} path="/dashboard" />
      <Route path={'*'} component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
