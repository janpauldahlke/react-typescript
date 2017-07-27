
import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as weatherActions from './../../actions/weather';
import {RootState} from "../../reducers/index";
import * as style from './style.css';


import * as _ from 'lodash';
import {isNullOrUndefined, isNumber, isObject, isString} from "util";



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

    //public static defaultProps: Partial<Weather.Props> = {};

    constructor(props) {
        super(props);

        this.state = {
            city: ''
        };

        this.resetComponent = this.resetComponent.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.performWeatherRequest = this.performWeatherRequest.bind(this);
        this.performWeatherForeCast = this.performWeatherForeCast.bind(this);
    }

    //---------------------------------//


    onInputChange(e){
        e.preventDefault();
        this.setState({city: e.target.value});
    }

    performWeatherRequest(e){
        e.preventDefault();
        this.props.weatherAction.fetchWeatherFunc('weather', this.state.city);
    }

    performWeatherForeCast(e){
        e.preventDefault();
        this.props.weatherAction.fetchWeatherFunc('forecast', this.state.city);
    }

    renderWeatherViewString(v,k){
        return <div key={k} className="alert alert-success">{k} : {v}</div>
    }
    renderWeatherViewNumber(v,k){
        return <div key={k} className="alert alert-success">{k} : {v}</div>
    }
    renderWeatherViewWeatherObject(v,k) {
        return (
                <div key={k}>{k} : {v}</div>
        )
    }
    renderObjects(v,k){
        return <div key={k} className="alert alert-success">{k} : {v}</div>
    }


    resetComponent(e){
        e.preventDefault();
        console.log('resetComponent');
        this.setState({city: ''});
        return this.props.weatherAction.resetWeather();
    }


    //TODO research how to empty result component on updated state
    // most likely i need an action reset, that sets payload to null
    // something like this : if(!this.state.city){this.props.weatherActions.resetPayload}
    //---------------------------------//

    render() {

        const {success, load, result, type} = this.props.fetchWeatherResult

        if(isNullOrUndefined(result) && load === false) {
            return (
                <div className="weatherinput">
                    <form
                        onSubmit={(e) => {e.preventDefault()}}
                    >

                        <input
                            className="ml-5"
                            placeholder="city"
                            value={this.state.city}
                            onChange={this.onInputChange}
                        />

                        <button
                            onClick={this.performWeatherRequest}
                        >get actual weather info</button>
                        <button
                            onClick={this.performWeatherForeCast}
                        >forecast my city</button>
                        <button
                            onClick={this.resetComponent}
                        >
                            RESET
                        </button>
                    </form>
                </div>
            )
        }

        if(load === true) {
            return (
                <div>LOADING</div>
            )
        }

        if(success === false && load ===false) {
            return(
                <div>ERROR</div>
            )
        }

        if(success === true && !isNullOrUndefined(result)) {
            return (
                <div className={[style.container].join(' ')}>
                    <h3>iam weather...again</h3>
                    <div className="weatherinput">
                        <form
                            onSubmit={(e) => {e.preventDefault()}}
                        >

                            <input
                                className="ml-5"
                                placeholder="city"
                                value={this.state.city}
                                onChange={this.onInputChange}
                            />

                            <button
                                onClick={this.performWeatherRequest}
                            >get actual weather info</button>
                            <button
                                onClick={this.performWeatherForeCast}
                            >forecast my city</button>
                            <button
                                onClick={this.resetComponent}
                            >
                                RESET
                            </button>
                        </form>
                    </div>
                    <br/>

                    {/*https://stackoverflow.com/questions/21749798/how-can-i-reset-a-react-component-including-all-transitively-reachable-state/21750576#21750576*/}

                    {/*TODO*/}
                    {/*1. check response type (actual, forecast)*/}
                    {/*2. render according to result differnt tiles*/}
                    {/*3. ideal is to keep stateless components seperated*/}

                    {type === 'FETCH_WEATHER_SUCCESS' && (
                        <div key={Math.floor(Math.random() * 999) +1} className="weatheroutput">
                            {_.map(this.props.fetchWeatherResult.result, (value,key ) => {

                                if(isString(value)){
                                    return this.renderWeatherViewString(value,key);
                                }

                                else if(isObject(value)){

                                    if ((key !== 'weather') && !isNullOrUndefined(value)){
                                        return _.map(value, (v,k) => {

                                            return this.renderObjects(v,k);
                                        })
                                    }
                                    else if(key === 'weather'){

                                        return _.map(value,(weather: Weather,key) => {

                                            return(
                                                <div className="alert alert-danger">
                                                    {_.map(weather, (v,k) => {
                                                        return this.renderWeatherViewWeatherObject(v,k);
                                                    })}
                                                </div>
                                            );

                                        });
                                    }

                                    else{
                                        return <div className="alert alert-danger">iam else</div>
                                    }
                                }
                                else if(isNumber(value)){
                                    return this.renderWeatherViewNumber(value,key);
                                }
                                else{
                                    console.log('i am else', value,key)
                                }
                            })}

                        </div>
                    )}

                    {type === 'FETCH_WEATHER_FORECAST' && (
                        <div> iam forecast result
                            {console.log(result)};
                        </div>
                    )}




                </div>
            );
        }




        //console.log('props___-',this.props);

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
