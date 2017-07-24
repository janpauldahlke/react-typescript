//create a stoopid header

import * as React from 'react';
import {connect} from 'react-redux';
import * as style from './style.css';


export namespace Header {
    export interface Props {

    }

    export interface State {
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class Header extends React.Component<Header.Props, Header.State> {
    constructor(props) {
        super(props)
    }

    public static defaultProps: Partial<Header.Props> = {};

    render() {


        return (
            <div className={[style.header, "panel-headingnavbar navbar-light bg-faded"].join(' ')}>
                <div>iam header</div>
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
