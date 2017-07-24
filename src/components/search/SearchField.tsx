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
        };

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onInputValueSubmit = this.onInputValueSubmit.bind(this);
    }


    onSearchInputChange(e){
        e.preventDefault();
        this.setState({searchResult: {q: e.target.value}});
    }

    onInputValueSubmit(event) {

        event.preventDefault();

        //let query = JSON.parse(JSON.stringify(this.state));
        //console.log('unmodified state', this.state);
        //console.log('modified? state', query);
        //! two way bindings in react!!
        this.props.searchAction.searchQuery(this.state.searchResult);
    }

    renderNoResult () {
        return <div>no results yet</div>
    }

    renderResult(item: SearchResultItem) {
        return (
          <div key={item.id} className="card col-8 mx-auto">
              <div className="card-block">
                  <div
                      className="card-title">
                      {item.ns}
                  </div>
                  <p className="card-text">{item.eMail}</p>
                  <p className="card-text">{item.name}</p>
                  <p className="card-text">{item.licenseKey}</p>

              </div>
          </div>
        );
    }


    //TODO enhance render with advanced options
    //build html elements // reactstrap?
    //build methods, to complete concated searchQuery

    render() {

        return (
            <div className="container">

                <form
                    className="form-group row"
                    onSubmit={this.onInputValueSubmit}
                >
                    <input
                        className="searchinput form-control"
                        onChange={this.onSearchInputChange}
                        placeholder="suche nach..."
                    />

                </form>

                {!this.props.searchResult.result && (
                    this.renderNoResult()
                )}
                {(this.props.searchResult.result) && (
                    <div className="resultTiles row justify-content">
                        {this.props.searchResult.result.documents.map((item) => {
                          return this.renderResult(item);
                            // return <div>{item.ns}</div>
                        })}
                    </div>
                )}
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