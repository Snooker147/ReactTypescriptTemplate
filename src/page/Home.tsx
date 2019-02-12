import * as React from "react";
import { Button, IconButton, Icon } from "@material-ui/core";

// Props Structure
export interface HomeProps { }

export default (p: HomeProps) => {
    return (
        <div>

            <Button variant="contained">
                Test!
            </Button>

            <IconButton>
                <Icon>error</Icon>
            </IconButton>
        </div>
    );
};