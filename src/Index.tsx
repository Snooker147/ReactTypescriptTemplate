import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import IndexFunc from "./IndexFunc";

// Typically you should only import it once
// That will speed up the process and also makes it simpler for managing
// All styles should be inside the style folder prefixed with understore to indicate that they are inline
import "./Index.scss";

// Importing images example
import * as SrcTestImage from "./assets/test.png";
import * as SrcSunsetImage from "./assets/sunset.png";

// Global (or internal) import is accesible in every src file.
// Simply prefix them with @internals/ followed by the file you wish to include from src-internals directory.
import Utils from "@internals/Utils";
import About from "./page/About";
import Home from "./page/Home";
import NotFound from "./page/NotFound";

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

    public componentDidMount()
    {
        $(".hello").css("color", "gray");
        console.log(Utils.splitBySpace("   Hello    World"));
    }
    
    public render()
    {
        return (
            <div>
                <span className="hello">
                    Hello World!
                </span>
                
                <img src={SrcTestImage} alt="" />

                <div>
                    <i className="fas fa-ambulance"></i>
                </div>

                <div>
                    <img src={SrcSunsetImage} alt="" />
                </div>

                <IndexFunc name="Bob" />

                { /* Router Setup */ }
                <div className="content">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/about" component={About} />
                            <Route path="/" exact component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }

}

ReactDOM.render(
    <Index />,
    document.getElementById("app")
);