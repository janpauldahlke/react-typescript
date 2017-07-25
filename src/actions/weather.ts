import axios from 'axios';
import {createAction} from "redux-actions";
import * as Actions from './../constants/actions';
import * as SECRET from './../config';


const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=';
const ROOT_URL = BASE_URL + SECRET.API_KEY;


export function getAxiosInstance() {
    return axios.create({
        baseURL: ROOT_URL,
        timeout: 1000
    });
}

export function fetchWeather(city: string) {

    //create complet string
    const url = `${ROOT_URL}&q=${city},DEU`;

    return function(dispatch) {
        dispatch(fetchWeatherAction);                        //http://www.nationsonline.org/oneworld/country_code_list.htm
        return getAxiosInstance().get(url) //be dynamic later here // DEU is country code
            .then((response) => {
                dispatch(fetchWeaterSuccess(response.data));
            })
            .catch((error) => {
            dispatch(fetWeatherFailure(error.toString()))
            })
    }
}


export const fetchWeatherAction = createAction<any>(Actions.FETCH_WEATHER_ACTION);
export const fetchWeaterSuccess = createAction<any>(Actions.FETCH_WEATHER_SUCCESS);
export const fetWeatherFailure = createAction<any>(Actions.FETCH_WEATHER_FAILURE);