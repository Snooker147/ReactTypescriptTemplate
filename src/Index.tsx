import * as React from "react";
import * as ReactDOM from "react-dom";

import Func from "./Func";

// Typically you should only import it once
// That will speed up the process and also makes it simpler for managing
// All styles should be inside the style folder prefixed with understore to indicate that they are inline
import "./style/Master.scss";

// Importing images example
// Because of how typescript is configured, you have to use the "Import Everything As" non-sense
// But other than that it work just as fine
import * as SrcTestImage from "./assets/test.png";

// Props Structure
export interface IndexProps { }
// State Structure
export interface IndexState { }


export default class Index extends React.Component<IndexProps, IndexState>
{
    
    public constructor(props: IndexProps)
    {
        super(props);
    }
    
    public render()
    {
        return (
            <div>
                <span className="hello">
                    Hello World!
                </span>

                <img src={SrcTestImage} alt=""/>

                <div>
                    <i className="fas fa-ambulance"></i>
                </div>

                <Func name="Bob" />
            </div>
        );
    }

}

ReactDOM.render(
    <Index />,
    document.querySelector("#app")
);