import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';

//
import { Footer, Header } from '../../components';



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
          <div>
            <Header/>
              <h3>headline</h3>
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
