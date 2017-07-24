import * as React from 'react';
import { Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';
import {RootState} from "../../reducers/index";
import { bindActionCreators} from 'redux';


export namespace SearchField {
    export interface Props {

        searchActions?: typeof searchActions
    }

    export interface State {
        q : string,
        fq?: string,
        highlight?: string,
        rows?: number,
        start?: number
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class SearchField extends React.Component<SearchField.Props, SearchField.State> {
    constructor(props) {
        super(props)

        this.onSearchInputChange = this.onSearchInputChange.bind(this);
    }

    getQuery(q: string) {
        //
    }

    onSearchInputChange(e){
        e.preventDefault();
        this.setState({q: e.target.value}); // check it with react-dev.tools
    }

    public static defaultProps: Partial<SearchField.Props> = {

    };

    render() {


        return (
            <div className="searchfield-container">
                <h3>iam searchfield</h3>
                <input
                    className="searchinput"
                    onChange={this.onSearchInputChange}
                />
            </div>
        );
    }
}


function mapStateToProps(state: RootState) {
    return {
        //
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(searchActions as any, dispatch)
    }
}


export default connect()(SearchField)