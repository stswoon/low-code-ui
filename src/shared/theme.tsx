import {createTheme} from '@mui/material/styles';
import type {LinkProps} from '@mui/material/Link';
import {LinkBehavior} from "./LinkBehavior.tsx";

export const theme = createTheme({
    components: {
        // MuiButton: {
        //   styleOverrides: {
        //     root: {
        //       borderRadius: '4px',
        //     },
        //   },
        // },
        MuiLink: {
            defaultProps: {component: LinkBehavior} as LinkProps,
        },
        MuiButtonBase: {
            defaultProps: {LinkComponent: LinkBehavior},
        },
    },
});

