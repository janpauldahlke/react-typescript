//create a stoopid header

import * as React from 'react';
import {connect} from 'react-redux';
import * as style from './style.css';


export namespace Weather {
    export interface Props {

    }

    export interface State {
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class Weather extends React.Component<Weather.Props, Weather.State> {
    constructor(props) {
        super(props)
    }

    public static defaultProps: Partial<Weather.Props> = {};

    render() {


        return (
            <div className={[style.container].join(' ')}>
                <div>iam weather</div>
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
