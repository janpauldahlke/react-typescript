import * as React from 'react';
import { Field, reduxForm, initialize} from 'redux-form';
import {connect} from 'react-redux';
import * as searchActions from './../../actions/search';
import {RootState} from "../../reducers/index";


export namespace SearchField {
    export interface Props {

        searchActions?: typeof searchActions
    }

    export interface State {
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class SearchField extends React.Component<SearchField.Props, SearchField.State> {
    constructor(props) {
        super(props)
    }

    validate() {
        //do something
        return;
    }

    public static defaultProps: Partial<SearchField.Props> = {

    };

    render() {


        return (
            <div className="searchfield-container">
                <h3>iam searchfield</h3>
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
        //actions: bindActionCreators(<ActionName> as any, dispatch)
    }
}


export default connect()(SearchField)