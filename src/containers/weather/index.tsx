import * as React from 'react';
import {connect} from 'react-redux';



export namespace Search {
    export interface Props {

    }

    export interface State {
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class Search extends React.Component<Search.Props, Search.State> {
    constructor(props) {
        super()
    }

    public static defaultProps: Partial<Search.Props> = {};

    render() {


        return (
            <div className="weather-container">
                {/*<h4>credo: Sapere Aude</h4>*/}
                <h3>iam weatherapp</h3>
            </div>
        );
    }
}


// function mapStateToProps(state: RootState) {
//     return {
//         //
//     }
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(<ActionName> as any, dispatch)
//     }
// }
