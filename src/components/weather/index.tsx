//create a stoopid header

import * as React from 'react';
import {connect} from 'react-redux';
import * as style from './style.css';


export namespace Weather {
    export interface Props {

    }

    export interface State {
        city: string
    }
}

//@connect(mapStateToProps, mapDispatchToProps)
export class Weather extends React.Component<Weather.Props, Weather.State> {
    constructor(props) {
        super(props);

        this.state = {
            city: ''
        }

        this.onButtonSubmit = this.onButtonSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    public static defaultProps: Partial<Weather.Props> = {};


    onButtonSubmit(e) {
        e.preventDefault();
        console.log("message from a bo(tt)on");
    }

    onInputChange(e) {
        e.preventDefault();
        this.setState({city: e.target.value})
    }


    render() {


        console.log("state", this.state);
        return (
            <div className={[style.container].join(' ')}>
                <div>iam weather headline</div>
                <div>look for your city in germany</div>
                <form
                    onSubmit={this.onButtonSubmit}
                >
                    <input
                        placeholder="city"
                        onChange={this.onInputChange}
                    >
                    </input>
                </form>
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
