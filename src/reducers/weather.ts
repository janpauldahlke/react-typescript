import { handleActions} from 'redux-actions';
import * as Actions from './../constants/actions'

//TODO typescripting
//model request before!!! initialstore state

//can i let this be empty?
const initialStoreState : any = {};

export default handleActions<any, any>({
    [Actions.FETCH_WEATHER_SUCCESS] : (state, action) => {
        return {...state, result: action.payload}
    }
}, initialStoreState)