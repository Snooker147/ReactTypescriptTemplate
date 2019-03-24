import * as React from "react";
import { Button, IconButton, Icon } from "@material-ui/core";

interface Props { }

export default (p: Props) => {
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