import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { RootState } from '../../reducers';


//
import { Footer, Header, Forbidden, NotFound, Weather } from '../../components';

import * as style from './style.css';

import {Search} from './../search/';

//somethink functional
const PlaceHolder = () => {
  return (
    <div>
      <div>iam from path / and survived render once and once agaion</div>
    </div>
  );
};

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    //
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

  render() {
    return (
      <div className="app">
        <Header />
        <div className={[style.app_body, "panel-body"].join(' ')} >
          <main className="mx-auto">
            <Switch>

              <Route path="/weather" component={Weather} />
              <Route path="/search" component={Search} />
              <Route path="/error/403" component={Forbidden}  />
              <Route path="/" exact component={PlaceHolder} />} />
              <Route path="/*" component={NotFound} />

            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    //
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //
  };
}
