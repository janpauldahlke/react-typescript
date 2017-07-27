
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

        this.onInputChange = this.onInputChange.bind(this);
        this.performWeatherRequest = this.performWeatherRequest.bind(this);
    }

    //---------------------------------//

    onInputChange(e){
        e.preventDefault();
        this.setState({city: e.target.value});
    }

    performWeatherRequest(e){
        e.preventDefault();
        this.props.weatherAction.fetchWeatherFunc(this.state.city);
    }

    renderWeatherViewString(v,k){
        return <div key={k} className="alert alert-success">{k} : {v}</div>
    }
    renderWeatherViewNumber(v,k){
        return <div key={k} className="alert alert-success">{k} : {v}</div>
    }
    renderWeatherViewWeatherObject(v,k) {
        console.log('renderView');
        return (
                <div key={k}>{k} : {v}</div>
        )
    }
    renderObjects(v,k){
        return <div key={k} className="alert alert-success">{k} : {v}</div>
    }

    //---------------------------------//

    render() {

        return (
            <div className={[style.container].join(' ')}>
                <h3>iam weather...again</h3>
                <div className="weatherinput">
                    <form

                        onSubmit={this.performWeatherRequest}>

                        <input
                            className="ml-5"
                            placeholder="city"
                            onChange={this.onInputChange}
                        />
                    </form>
                </div>
                <br/>
                <div className="weatheroutput">
                    {_.map(this.props.fetchWeatherResult.result, (value,key ) => {

                        if(isString(value)){
                            return this.renderWeatherViewString(value,key);
                        }

                        else if(isObject(value)){

                            if ((key !== 'weather') && !isNullOrUndefined(value)){
                               return _.map(value, (v,k) => {
                                    console.log('__', k,v);
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
