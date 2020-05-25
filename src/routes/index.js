import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated, isAuthenticatedObserver } from '../services/auth';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NewWarning from '../pages/NewWarning';
import OfficialCases from '../pages/OfficialCases';
import ObserverReport from '../pages/ObserverReport';
import AboutUs from '../pages/AboutUs';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
);

const PrivateRouteObserver = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // function Comp() {
      //   const [isObs, setIsObs] = useState(false);
      //   useEffect(async () => {
      //     const temp = await isAuthenticatedObserver();
      //     setIsObs(temp);
      //   })
      //   return (
      //     <div>
      //       {
      //         isObs ??
      //         <Component {...props} />
      //       }
      //       {
      //         !isObs ??
      //         <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      //       }
      //     </div>
      //   );
      // }
      // return <Comp />;
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
          isAuthenticatedObserver()
            .then(is => {
              console.log('IS AUTHOBS1')
              console.log(is)
              this.setState({ isObs: is })
            });
        }

        componentWillUnmount() {
          this._isMounted = false;
        }

        handleCheck = async () => {
          const temp = await isAuthenticatedObserver();
          console.log('IS AUTHOBS')
          console.log(temp)
          this.setState({ isObs: temp });
        }
        handleRedirect = () => {
          if (this.state.isObs === false) {
            console.log('BCSKHSJCANBJADSNCJK');
            return <Redirect to='/' />
          }
        }
        render() {
          return (
            <div>
              {this.handleCheck}
              <div>
                {
                  !this.state.isObs ?
                    <Redirect to='/' /> :
                    <Component {...props} />
                }
              </div>
            </div>
          );
        }
      }
      return <Comp />;
    }
    }
  />

);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/warnings/new'} component={NewWarning} />
      <Route path={'/official-cases'} component={OfficialCases} />
      <PrivateRouteObserver path={'/observer-report'} component={ObserverReport} />
      <Route path={'/about-us'} component={AboutUs} />
      <Route path={'/signin'} component={SignIn} />
      <Route path={'/signup'} component={SignUp} />
      <PrivateRoute path={'/app'} component={() => <h1>App</h1>} />
      <Route path={'*'} component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated, isAuthenticatedObserver } from '../services/auth';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import NewWarning from '../pages/NewWarning';
import OfficialCases from '../pages/OfficialCases';
import ObserverReport from '../pages/ObserverReport';
import MyAccount from '../pages/MyAccount';
import AboutUs from '../pages/AboutUs';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }
  />
);

const PrivateRouteObserver = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // function Comp() {
      //   const [isObs, setIsObs] = useState(false);
      //   useEffect(async () => {
      //     const temp = await isAuthenticatedObserver();
      //     setIsObs(temp);
      //   })
      //   return (
      //     <div>
      //       {
      //         isObs ??
      //         <Component {...props} />
      //       }
      //       {
      //         !isObs ??
      //         <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      //       }
      //     </div>
      //   );
      // }
      // return <Comp />;
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
          isAuthenticatedObserver()
            .then(is => {
              console.log('IS AUTHOBS1')
              console.log(is)
              this.setState({ isObs: is })
            });
        }

        componentWillUnmount() {
          this._isMounted = false;
        }

        handleCheck = async () => {
          const temp = await isAuthenticatedObserver();
          console.log('IS AUTHOBS')
          console.log(temp)
          this.setState({ isObs: temp });
        }
        handleRedirect = () => {
          if (this.state.isObs === false) {
            console.log('BCSKHSJCANBJADSNCJK');
            return <Redirect to='/' />
          }
        }
        render() {
          return (
            <div>
              {this.handleCheck}
              <div>
                {
                  !this.state.isObs ?
                    <Redirect to='/' /> :
                    <Component {...props} />
                }
              </div>
            </div>
          );
        }
      }
      return <Comp />;
    }
    }
  />

);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/warnings/new'} component={NewWarning} />
      <Route path={'/official-cases'} component={OfficialCases} />
      <PrivateRouteObserver path={'/observer-report'} component={ObserverReport} />
      <Route path={'/about-us'} component={AboutUs} />
      <Route path={'/signin'} component={SignIn} />
      <Route path={'/signup'} component={SignUp} />
      <Route path={'/my-account'} component={MyAccount} />
      <PrivateRoute path={'/app'} component={() => <h1>App</h1>} />
      <Route path={'*'} component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

export default Routes;
