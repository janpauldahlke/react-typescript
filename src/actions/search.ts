import axios from 'axios';
import {createAction} from "redux-actions";
import * as Actions from './../constants/actions';


const BASE_URL = 'http://192.168.1.239:9000';
const URL = '/api/v1/search';

export function getAxiosInstance() {
    return axios.create({
        baseURL: BASE_URL,
        timeout: 1000
    });
}

export function searchQuery(q: CompleteQuery ) {
    return function(dispatch) {
        dispatch(searchQueryAction);
        return getAxiosInstance().get(URL, {params: q})
            .then((response) => {
            dispatch(searchQueryActionSuccess)
            })
    }
}


export const searchQueryAction = createAction(Actions.SEARCH_QUERY_ACTION);
export const searchQueryActionSuccess = createAction<SearchResult>(Actions.SEARCH_QUERY_ACTION_SUCCESS);
export const searchQueryActionFailure = createAction<any>(Actions.SEARCH_QUERY_ACTION_FAILURE)