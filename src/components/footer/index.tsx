//create a stoopid footer

import * as React from 'react';
import * as style from './style.css';
import {connect} from 'react-redux';
import RootState from './../../reducers/index';

export namespace Footer {
    export interface Props {

    }

    export interface State {
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class Footer extends React.Component<Footer.Props, Footer.State> {
    constructor(props) {
        super(props)
    }

    public static defaultProps: Partial<Footer.Props> = {};

    render() {


        return (
            <div className={[style.footer, "panel-footer"].join(' ')}>
                <div>iam footer</div>
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
