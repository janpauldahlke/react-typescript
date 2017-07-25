import { handleActions} from 'redux-actions';
import * as Actions from './../constants/actions'

//TODO typescripting
//model request before!!! initialstore state

//can i let this be empty?
const initialStoreState : WeatherResultStoreState = {
    load: false,
    success: false,
    result: null


};

export default handleActions<WeatherResultStoreState, WeatherResult>({
    [Actions.FETCH_WEATHER_SUCCESS] : (state, action) => {

        let passReducer = {
            ...state,
            load: false,
            success: true,
            result:action.payload}
        console.log('in my reducer: ',passReducer)
        return passReducer;
    },
    [Actions.FETCH_WEATHER_ACTION]: (state) => {
        console.log('FETCH_WEATHER_ACTION', state)
        return { ...state, load: true, success: false}
    },
    [Actions.FETCH_WEATHER_FAILURE]: (state) => {
        console.log('FETCH_WEATHER_FAILURE', state)
        return {...state, load: false, success: false}
    }
}, initialStoreState)