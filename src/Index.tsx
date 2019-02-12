import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import About from "./page/About";
import Home from "./page/Home";
import NotFound from "./page/NotFound";

// Typically you should only import it once
// That will speed up the process and also makes it simpler for managing
// All styles should be inside the style folder prefixed with understore to indicate that they are inline
import "./style/Style.scss";

// Importing images example
import * as SrcTestImage from "./assets/test.png";
import * as SrcSunsetImage from "./assets/sunset.png";

// Global (or internal) import is accesible in every src file.
// Simply prefix them with @internals/ followed by the file you wish to include from src-internals directory.
import Utils from "@internals/Utils";

import Action, { MyActionFunction } from "@internals/backend/Action";
import { MuiThemeProvider, Button, CssBaseline } from "@material-ui/core";
import createTheme from "./MaterialUIStyle";
import Header from "./Header";

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

    public async componentDidMount()
    {
        //const a = await Action.post("test", { test: "a value", test2: 25, test3: false });
    }
    
    public render()
    {
        return (
            <MuiThemeProvider theme={createTheme()}>
                <CssBaseline />

                <React.Fragment>
                    <Header />

                    { /* Router Setup */ }
                    <BrowserRouter>
                        <Switch>
                            <Route path="/about" component={About} />
                            <Route path="/" exact component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </BrowserRouter>
                
                </React.Fragment>
            </MuiThemeProvider>
        );
    }

}

ReactDOM.render(
    <Index />,
    document.getElementById("app")
);