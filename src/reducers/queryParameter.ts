import { handleActions} from 'redux-actions';
import * as Action from '../constants/actions';

const initialStoreState : CompleteQuery = {
    q : null,
    fq: null,  //...&fq=ns:licenseServer
    highlight: null,
    rows: 40,
    start: 0
};
//comes as.., goes as..
export default handleActions <CompleteQuery, CompleteQuery> ({
    [Action.SEARCH_QUERY_PARAMETER] : (state, action) => {
        return action.payload
    }
},initialStoreState)
