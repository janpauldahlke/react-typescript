import * as React from 'react';

export namespace Forbidden {
    export interface Props {

    }

    export interface State {
        /* empty */
    }
}

export class Forbidden extends React.Component<Forbidden.Props, Forbidden.State> {
    render() {
        return (
            <div className="errorWrapper">
                <div className="errorContainer">
                    <div className="errorContent">
                        <div className="errorTitle"><span style={{color:"#d00"}}>40</span>3</div>
                        <div className="errorQuote">not allowed</div>
                    </div>
                </div>
            </div>
        )
    }
}
