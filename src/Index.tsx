import * as React from "react";
import * as ReactDOM from "react-dom";
import { create } from "jss";
import { JssProvider } from "react-jss";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import createTheme from "./MaterialUIStyle";

import Header from "./Header";
import About from "./page/About";
import Home from "./page/Home";
import NotFound from "./page/NotFound";

// Typically you should only import it once
// That will speed up the process and also makes it simpler for managing
// All styles should be inside the style folder prefixed with understore to indicate that they are inline
import "./style/Style.scss";

// Importing images example
import SrcTestImage from "./assets/imgs/test.png";
import SrcSunsetImage from "./assets/imgs/sunset.png";

interface Props { }
interface State { }

export default class Index extends React.Component<Props, State>
{

    public constructor(props: Props)
    {
        super(props);
    }
    
    public render()
    {
        const generateClassName = createGenerateClassName();
        const jss = create({
            ...jssPreset(),
            insertionPoint: document.getElementById("jss-insertion-point"),
        });
          
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={createTheme()}>
                    <CssBaseline />

                    <React.Fragment>
                        <Header />

                        <div>
                            <img src={SrcTestImage} alt=""/>
                            <img src={SrcSunsetImage} alt=""/>
                        </div>

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
            </JssProvider>
        );
    }

}

ReactDOM.render(
    <Index />,
    document.getElementById("app")
);