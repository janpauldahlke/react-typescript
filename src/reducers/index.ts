import { combineReducers, Reducer } from 'redux';
import SearchResult from './searchResult';


export interface RootState {
  searchResult: SearchResult
}

export default combineReducers<RootState>({
  SearchResult
});
