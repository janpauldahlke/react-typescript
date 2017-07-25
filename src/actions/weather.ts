import axios from 'axios';
import {createAction} from "redux-actions";
import * as Actions from './../constants/actions';
import * as SECRET from './../config';

// make this selectable
// xxx/forecast? -> 5tage alle drei stunden
// xxx/weather? -> actual

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=';
const ROOT_URL = BASE_URL + SECRET.API_KEY;


export function getAxiosInstance() {
    return axios.create({
        baseURL: ROOT_URL,
        timeout: 1000
    });
}

export function fetchWeatherFunc(city: string) {

    //create complet string
    const url = `${ROOT_URL}&q=${city},DEU&units=metric`; // DEU und metrix dyamisch und übergeben! // &lang=ger is also possible

    return function(dispatch) {
        dispatch(fetchWeatherAction);
        return getAxiosInstance().get(url)
            .then((response) => {
                console.log('1_ ACTION_ :fetchWeatherSuccess', response.data);
                dispatch(fetchWeatherSuccess(response.data));
            })
            .catch((error) => {
            dispatch(fetWeatherFailure(error.toString()))
            })
    }
}


export const fetchWeatherAction = createAction(Actions.FETCH_WEATHER_ACTION);
export const fetchWeatherSuccess = createAction<WeatherResult>(Actions.FETCH_WEATHER_SUCCESS);
export const fetWeatherFailure = createAction<any>(Actions.FETCH_WEATHER_FAILURE);