import { combineReducers, Reducer } from 'redux';
import searchResult from './searchResult';
import completeQuery from './queryParamter';


export interface RootState {
  searchResult: SearchResultStoreState,
  completeQUery: CompleteQuery
}

export default combineReducers<RootState>({
    searchResult,
    completeQuery
});
