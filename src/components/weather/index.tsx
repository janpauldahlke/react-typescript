
import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as weatherActions from './../../actions/weather';
import {RootState} from "../../reducers/index";


import * as style from './style.css';
import {isArray, isNullOrUndefined, isObject, isString} from "util";

import typeGuard from '../../helper/typeguards';


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

        this.renderTopLevelProps = this.renderTopLevelProps.bind(this);
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

    renderTopLevelProps(value, key) {
        console.log('renderHelper')
        return (
           <div>
               {(value !== typeof Object || value !== typeof Array) && (
                   <div>{key} {value}</div>
               )}


           </div>
       );}

       renderLowLevelString(item: string){

            return(
                <div key={(Math.floor(Math.random() * 100000)+1)}>{item}</div>
            );
       }

       //make this to match only on Weather items
       renderWeatherItem(item: Weather){
           console.log(item)
           return(
               <div key={(Math.floor(Math.random() * 100000)+1)}>
                   <p>{item}</p>
               </div>
           );
       }

       renderObjectItem(item: Object){

           return(
               <div>{Object.keys(item).map((objItem) => {
                   return (
                   <div key={(Math.floor(Math.random() * 100000)+1)}>
                       <p>{objItem}</p>

                       {/*<p>{item[objItem]}</p>*/}
                   </div>
                   )
               })}
               </div>
           );
       }

       renderArrayItem(item: Array<any>){
           return(
               <div>
                   {item.map((objArray) => {
                       return(
                           <div key={(Math.floor(Math.random() * 100000)+1)}>
                               {objArray}
                           </div>
                       )

                   })}
               </div>
           );
       }

    render() {

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

                {(this.props.fetchWeatherResult.success) && (
                    <div className="res">
                        {Object.keys(this.props.fetchWeatherResult.result).map((item) => {
                            if (isString(this.props.fetchWeatherResult.result[item])) {
                                console.log('isString_____',this.props.fetchWeatherResult.result[item])
                                return this.renderLowLevelString(this.props.fetchWeatherResult.result[item])
                            }
                            if(isObject(this.props.fetchWeatherResult.result[item])){
                                console.log('isObj______', this.props.fetchWeatherResult.result[item])
                                return this.renderObjectItem(this.props.fetchWeatherResult.result[item]);
                            }
                            if(isArray(this.props.fetchWeatherResult.result[item])){
                                console.log('isArr_____', this.props.fetchWeatherResult.result[item])
                                return this.renderArrayItem(this.props.fetchWeatherResult.result[item]);
                            }

                            // console.log('tpyeof: ',  typeof  this.props.fetchWeatherResult.result[item]);
                            // console.log('instance: ',  Weather instanceof this.props.fetchWeatherResult.result[item]);

                            //TODO research her
                            // https://www.typescriptlang.org/docs/handbook/advanced-types.html
                            // type guards is what i want

                            // if(this.props.fetchWeatherResult.result[item]){
                            //     console.log('weather_type_checked: ', this.props.fetchWeatherResult.result[item]);
                            //     return this.renderWeatherItem(this.props.fetchWeatherResult.result[item]);
                            // }
                            // if(typeGuard(this.props.fetchWeatherResult.result[item])){
                            //     console.log(typeof item);
                            // }
                        })}
                    </div>
                )}
                {/*{this.props.fetchWeatherResult.success && (*/}
                    {/*<div>*/}


                        {/*{_.forOwn(this.props.fetchWeatherResult.result, (value, key) => {*/}
                            {/*console.log(key, value);*/}
                            {/*this.renderTopLevelProps(key, value);*/}
                        {/*})}*/}

                        {/*/!*{Object.keys(this.props.fetchWeatherResult.result).map((key) => {*!/*/}
                            {/*/!*let result = this.props.fetchWeatherResult.result[key];*!/*/}
                            {/*/!*if (!isNullOrUndefined(result) && result !== typeof Object) {*!/*/}
                                {/*/!*console.log('toplevel ', result);*!/*/}
                                {/*/!*this.renderTopLevelProps(result[key]);*!/*/}
                            {/*/!*}*!/*/}
                            {/*/!*else if (result === typeof Object){*!/*/}
                                {/*/!*for(let item in result){*!/*/}
                                    {/*/!*console.log('lowlevel ',item);*!/*/}
                                {/*/!*}*!/*/}
                            {/*/!*}*!/*/}
                        {/*/!*})}*!/*/}

                    {/*</div>*/}
                {/*)}*/}
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
