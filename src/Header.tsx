import * as React from "react";
import { AppBar, Typography, Toolbar, IconButton, Icon, Avatar, Button } from "@material-ui/core";

// Props Structure
export interface HeaderProps { }
// State Structure
export interface HeaderState { }

// Expansion panel

export default class Header extends React.Component<HeaderProps, HeaderState>
{
    
    public constructor(props: HeaderProps)
    {
        super(props);
    }
    
    public render()
    {
        return (
            <AppBar position="relative">
                <Toolbar>
                    <IconButton>
                        <Icon>menu</Icon>
                    </IconButton>

                    <Typography variant="h6" className="header-title">
                        Hello World!
                    </Typography>

                    <Button>
                        LOGIN
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

}