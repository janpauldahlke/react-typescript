import * as React from 'react';
import { Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';
import {RootState} from "../../reducers/index";
import { bindActionCreators} from 'redux';
import searchResultReducer from "../../reducers/searchResult";


//https://github.com/JedWatson/react-select/blob/master/examples/src/components/Multiselect.js
import * as Select from 'react-select';


const advancedOptionValues = [
    {label: 'creator', value: 'creator'},
    {label: 'architect', value: 'architect'},
    {label: 'deal', value: 'deal'}
    // {label: 'highlight', value: 'creator'}
];



export namespace SearchField {
    export interface Props {
        searchAction?: typeof searchActions
        searchResult?: SearchResultStoreState
    }

    export interface State {
        options: object[],
        searchResult : CompleteQuery,
        val: string
    }
}




@connect(mapStateToProps, mapDispatchToProps) //better connect to exporet default
export class SearchField extends React.Component<SearchField.Props, SearchField.State> {

    public static defaultProps: Partial<SearchField.Props> = {

    };

    constructor(props) {
        super(props);

        this.state = {
            options: advancedOptionValues,
            val: '',
            searchResult : {
                q: ''
            }
        };

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
        this.onInputValueSubmit = this.onInputValueSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
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

    handleSelectChange() {
        console.log('message from function handleSelectChange')
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

    renderAdvancedOptions () {
        return (
            <Select
                multi
                simpleValue
                value={this.state.val}
                placeholder="multiselect area 51"
                options={this.state.options}
                onChange={this.handleSelectChange}
            >
                <div>headline select</div>

            </Select>
        );
    }


    //TODO enhance render with advanced options
    //build html elements // reactstrap?
    //build methods, to complete concated searchQuery
    //TODO onHold here, do ppp-s deploy

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
                    
                    {this.renderAdvancedOptions}

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