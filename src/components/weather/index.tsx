
import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as weatherActions from './../../actions/weather';
import {RootState} from "../../reducers/index";


import * as style from './style.css';
import {isNullOrUndefined} from "util";


export namespace Weather {
    export interface Props {
        weatherAction?: typeof weatherActions
        fetchWeatherResult?: WeatherResultStoreState
    }

    export interface State {
        city: string
    }
}

@connect(mapStateToProps, mapDispatchToProps)
export class Weather extends React.Component<Weather.Props, Weather.State> {
    constructor(props) {
        super(props);

        this.state = {
            city: '',
        };

        this.makeActualWeatherRequest = this.makeActualWeatherRequest.bind(this);
        this.onButtonSubmit = this.onButtonSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    public static defaultProps: Partial<Weather.Props> = {};


    onButtonSubmit(e) {
        e.preventDefault();
        console.log("message from a bo(tt)on");
    }

    onInputChange(e) {
        e.preventDefault();
        this.setState({city: e.target.value})
    }

    makeActualWeatherRequest(e) {
        e.preventDefault();

        this.props.weatherAction.fetchWeatherFunc(this.state.city);
    }


    render() {

        // console.log("state",this.state);
        //console.log("props",this.props);

        return (
            <div className={[style.container].join(' ')}>
                <div>iam weather headline</div>
                <div>look for your city in ger</div>
                <form
                    onSubmit={this.makeActualWeatherRequest}
                >
                    <input
                        placeholder="city"
                        onChange={this.onInputChange}
                    >
                    </input>
                </form>

                {!this.props.fetchWeatherResult.success && (
                    <div>no fetch yet</div>
                )}
                {this.props.fetchWeatherResult.success && (

                    <div>name: {this.props.fetchWeatherResult.result.name}</div>
                )}

            </div>
        );
    }
}


function mapStateToProps(state: RootState) {
    return {
        fetchWeatherResult: state.weather
    }
}

function mapDispatchToProps(dispatch) {
    return {
        weatherAction: bindActionCreators(weatherActions as any, dispatch)
    }
}
