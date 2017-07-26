
import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';

import * as weatherActions from './../../actions/weather';
import {RootState} from "../../reducers/index";
import * as style from './style.css';



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
            console.log('____from foo:_',resultItem, resultItems)
            return (
                <div
                    key={index}
                    datatype={resultItem}
                >__</div>
            )
        });
    }

    //---------------------------------//

    render() {






        return (
            <div className={[style.container].join(' ')}>
                <h3>iam weather...again</h3>
                <div className="weatherinput">
                    <form
                        onSubmit={this.performWeatherRequest}
                    >
                        <input
                            placeholder="city"
                            onChange={this.onInputChange}
                        />
                    </form>
                </div>

                <div className="weatheroutput">
                        {!this.props.fetchWeatherResult.success && (
                             <div>no result yet</div>
                        )}

                        {this.props.fetchWeatherResult.success && (
                            this.foo()
                        )}



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
