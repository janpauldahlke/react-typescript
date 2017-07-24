import * as React from 'react';
import { Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';
import {RootState} from "../../reducers/index";
import { bindActionCreators} from 'redux';
import searchResultReducer from "../../reducers/searchResult";


export namespace SearchField {
    export interface Props {
        searchAction?: typeof searchActions
        searchResult?: SearchResultStoreState
    }

    export interface State {
        searchResult : CompleteQuery
    }
}

@connect(mapStateToProps, mapDispatchToProps) //better connect to exporet default
export class SearchField extends React.Component<SearchField.Props, SearchField.State> {

    public static defaultProps: Partial<SearchField.Props> = {

    };

    constructor(props) {
        super(props);

        this.state = {
            searchResult : {
                q: ''
            }
        }

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onInputValueSubmit = this.onInputValueSubmit.bind(this);
    }


    componentWillReceiveProps() {
        //console.log('recive updates:', this.props)
    }

    onSearchInputChange(e){
        e.preventDefault();
        this.setState({searchResult: {q: e.target.value}});
    }

    onInputValueSubmit(e) {
        e.preventDefault();

        //let query = JSON.parse(JSON.stringify(this.state));
        //console.log('unmodified state', this.state);
        //console.log('modified? state', query);

        this.props.searchAction.searchQuery(this.state.searchResult);
    }

    renderResult(item: SearchResultItem) {
        return <div>item.ns</div>
    }

    render() {

        //console.log('props__', this.props);

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

                <div className="resultTiles">
                    {/*{this.props.result.result.documents.map((item) => {*/}
                        {/*this.renderResult(item);*/}
                    {/*})}*/}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state: RootState) {
    return {
        searchResult: state.searchResult
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchAction: bindActionCreators(searchActions as any, dispatch)
    }
}


//export default connect(mapStateToProps,mapDispatchToProps)(SearchField);