import * as React from 'react';
import { Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';
import {RootState} from "../../reducers/index";
import { bindActionCreators} from 'redux';
import searchResultReducer from "../../reducers/searchResult";


export namespace SearchField {
    export interface Props {
        searchActions?: typeof searchActions
        result?: SearchResultStoreState
    }

    export interface State {
        result : CompleteQuery
    }
}

//@connect(mapStateToProps, mapDispatchToProps) //better connect to exporet default
export class SearchField extends React.Component<SearchField.Props, SearchField.State> {
    constructor(props) {
        super(props);

        this.state = {
            result : {
                q: ''
            }
        }

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onInputValueSubmit = this.onInputValueSubmit.bind(this);
    }


    onSearchInputChange(e){
        e.preventDefault();
        this.setState({result: {q: e.target.value}});
    }

    onInputValueSubmit(e) {
        e.preventDefault();
        let query = JSON.parse(JSON.stringify(this.state));
        //this.props.searchActions.searchQuery(this.state.result.q);
        //console.log('unmodified state', this.state);
        console.log('modified? state', query);
        this.props.searchActions.searchQuery(query);
    }

    public static defaultProps: Partial<SearchField.Props> = {

    };

    renderResult(item: SearchResultItem) {
        return <div>item.ns</div>
    }

    render() {

        return (
            <div className="searchfield-container">
                <h3>iam searchfield</h3>
                <form
                    onSubmit={this.onInputValueSubmit}
                >
                    <input
                        className="searchinput"
                        onChange={this.onSearchInputChange}
                        placeholder="suche nach..."
                    />
                </form>

                {/*<div className="resultTiles">*/}
                    {/*{this.props.searchResult.result.documents.map((item) => {*/}
                        {/*this.renderResult(item);*/}
                    {/*})}*/}
                {/*</div>*/}
            </div>
        );
    }
}


function mapStateToProps(state: RootState) {
    return {
        result: state.searchResult
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(searchActions as any, dispatch),

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchField);