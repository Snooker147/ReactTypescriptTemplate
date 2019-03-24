import * as React from "react";
import { AppBar, Typography, Toolbar, IconButton, Icon, Button } from "@material-ui/core";

interface Props { }
interface State { }

export default class Header extends React.Component<Props, State>
{
    
    public constructor(props: Props)
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