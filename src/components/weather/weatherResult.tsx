import * as React from 'react';
import {connect} from 'react-redux';
import {RootState} from "../../reducers/index";


export namespace WeatherResult {
    export interface Props {
        result?: WeatherResult
    }

    export interface State {
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class WeatherResult extends React.Component<WeatherResult.Props, WeatherResult.State> {
    constructor(props) {
        super(props)
    }

    public static defaultProps: Partial<WeatherResult.Props> = {};

    render() {


        return (
            <div>
                iam weather result in some ways
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
//         //actions: bindActionCreators(<ActionName> as any, dispatch)
//     }
// }
