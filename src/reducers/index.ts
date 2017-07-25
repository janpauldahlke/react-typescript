import { combineReducers, Reducer } from 'redux';
import searchResult from './searchResult';
import completeQuery from './queryParameter';
import weather from './weather';



export interface RootState {
  searchResult: SearchResultStoreState,
  completeQuery: CompleteQuery,
  weather: WeatherResultStoreState

}

export default combineReducers<RootState>({
    searchResult,
    completeQuery,
    weather
});
