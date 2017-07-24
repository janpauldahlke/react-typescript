import { handleActions } from "redux-actions";
import * as Actions from '../constants/actions';

const initialStoreState : SearchResultStoreState = {
    load: false,
    success : false,
    result: null
};

export default handleActions<SearchResultStoreState, SearchResult> ({
    [Actions.SEARCH_QUERY_ACTION] : ( state) => {
        return { ...state, load:true, success: false, /* result: null e.g above initialize*/ }
    },
    [Actions.SEARCH_QUERY_ACTION_FAILURE] : (state) => {
        return {...state, load: false, success: false}
    },
    [Actions.SEARCH_QUERY_ACTION_SUCCESS] : (state, action) => {
        return {
            ...state,
            load: false,
            success: true,
            result: action.payload
        }
    }

}, initialStoreState);