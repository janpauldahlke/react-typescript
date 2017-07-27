import axios from 'axios';
import {createAction} from "redux-actions";
import * as Actions from './../constants/actions';
import * as SECRET from '../../config';

// make this selectable
// xxx/forecast? -> 5tage alle drei stunden
// xxx/weather? -> actual

const ROOT_URL = 'http://api.openweathermap.org/data/2.5/';

export function getAxiosInstance() {
    return axios.create({
        baseURL: ROOT_URL,
        params: {appid:SECRET.API_KEY},
        timeout: 1000
    });
}

export function fetchWeatherFunc(type: string, city: string, country: string = 'DEU') {
    return function(dispatch) {
        dispatch(fetchWeatherAction);
        return getAxiosInstance().get(type, {params: {q: city + ',' + country, units:'metric'}})
            .then((response) => {
                //console.log('1_ ACTION_ :fetchWeatherSuccess', response.data);
                switch (type) {
                    case "weather":
                        dispatch(fetchWeatherSuccess(response.data));
                        break;
                    case "forecast":
                        dispatch(fetchWeatherActionForecast(response.data));
                    default:
                        dispatch(fetchWeatherSuccess(response.data));
                }
            })
            .catch((error) => {
            dispatch(fetWeatherFailure(error.toString()))
            })
    }
}


export const fetchWeatherAction = createAction(Actions.FETCH_WEATHER_ACTION);
export const fetchWeatherSuccess = createAction<WeatherResult>(Actions.FETCH_WEATHER_SUCCESS);
export const fetWeatherFailure = createAction<any>(Actions.FETCH_WEATHER_FAILURE);

export const fetchWeatherActionForecast = createAction<any>(Actions.FETCH_WEATHER_FORECAST);


//TODO reset action, that emptys payload