import { createMuiTheme } from "@material-ui/core/styles";

export default function createTheme()
{
    return createMuiTheme({
        palette: {
            type: "dark",
        },
        typography: {
            fontFamily: "RobotoFont",
            useNextVariants: true,
        }
    });
}