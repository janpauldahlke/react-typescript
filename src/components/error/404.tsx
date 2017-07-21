import * as React from 'react';

export namespace NotFound {
    export interface Props {

    }

    export interface State {
        /* empty */
    }
}

export class NotFound extends React.Component<NotFound.Props, NotFound.State> {
    render() {
        return (
            <div className="errorWrapper">
                <div className="errorContainer">
                    <div className="errorContent">
                        <div className="errorTitle"><span style={{color:"#d00"}}>40</span>4</div>
                        <div className="errorQuote">not found</div>
                    </div>
                </div>
            </div>
        )
    }
}
