
import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as weatherActions from './../../actions/weather';
import {RootState} from "../../reducers/index";
import * as style from './style.css';
import {WeatherResult} from './weatherResult';

import * as _ from 'lodash';
import {isNumber, isObject, isString} from "util";



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


    foo(){
        let { result } = this.props.fetchWeatherResult;
        let resultItems = Object.keys(result).map((key, index) => {
            const resultItem = result[key];
            console.log('____from foo:_',key, resultItem);

            if(key === 'name'){
                return <div>{index}</div>
            }

            // switch(key){
            //     // case 'coord': return <div>coord lon: {resultItem.lon}, lat: {resultItem.lat}</div>;
            //     case 'weater': return <div>iam weather object</div>;
            //     // case 'base': return <div>{resultItem}</div>;
            //     // case 'visibility': return <div>{resultItem}</div>;
            //     // case 'clouds': return <div>cloudObject</div>;
            //     // case 'dt': return <div>{resultItem}</div>;
            //     // case 'sys': return <div>sysObject</div>;
            //     // case 'id': return <div>{resultItem}</div>;
            //     // case 'name': return <div>{resultItem}</div>;
            //     // case 'cod': return  <div>{resultItem}</div>;
            //     default: return <div>DEFAULT</div>
            //
            // }

        });
    }

    splitResults(){

        const resultItems = this.props.fetchWeatherResult.result;
        Object.keys(resultItems).map((key) => {
            if(key === 'name'){
                console.log('iam name')
                return <div>name</div>
            }
            else {
                console.log('iam NOOOOname')
                return <div>no name</div>
            }
        })

        // const weatherItem = this.props.fetchWeatherResult.result.weather;
        // const coord = this.props.fetchWeatherResult.result.coord;
        // const clouds = this.props.fetchWeatherResult.result.clouds;
        // console.log(weatherItem, coord, clouds);
    }

    renderWeatherViewString(item){
        return <div>name: {item}</div>
    }
    renderWeatherViewNumber(item){
        return <div>number: {item}</div>
    }

    //---------------------------------//

    render() {

        let counter = 0;

        //TODO should on extract the result from input and import? give it a try


        return (
            <div className={[style.container].join(' ')}>
                <h3>iam weather...again</h3>
                <div className="weatherinput">
                    <form
                        onSubmit={this.performWeatherRequest}>

                        <input
                            placeholder="city"
                            onChange={this.onInputChange}
                        />
                    </form>
                </div>

                <div className="weatheroutput">
                    {/*{!this.props.fetchWeatherResult.success && (*/}
                         {/*<div>no result yet</div>*/}
                    {/*)}*/}

                    {/*{this.props.fetchWeatherResult.success && (*/}
                        {/*<div>{this.splitResults}</div>*/}
                    {/*)}*/}

                    {/*<WeatherResult />*/}
                    {_.map(this.props.fetchWeatherResult.result).map((e) => {

                        counter = counter +1;
                        console.log('rounds_', counter);
                        if(isString(e)){
                            console.log('string_', e);
                            return this.renderWeatherViewString(e);
                        }
                        else if(isObject(e)){
                            console.log('object__', e)

                            //TODO find a way top compare deepequal with typescript types

                            // _.map(e).map(() => {
                            //     if(isObject(e)){
                            //         console.log('INNEROBJ_iam obj in obj, treat me special', e)
                            //     }
                            //     else{
                            //         console.log('INNEROBJ', e)
                            //     }
                            // })
                        }
                        else if(isNumber(e)){
                            console.log('number__', e);
                            return this.renderWeatherViewNumber(e);
                        }
                        else{
                            console.log('i am else', e)
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
