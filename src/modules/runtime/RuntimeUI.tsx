import {type FC, memo} from 'react';
import {useAppStore} from "../../shared/store.ts";
import {Typography} from "@mui/material";


export const RuntimeUI: FC = memo(() => {
    const {uiConfig} = useAppStore();

    return (
        <div className="taRuntimeUI">
            <Typography variant="h3">RuntimeUI</Typography>
            <div>{uiConfig}</div>
        </div>
    );
});

RuntimeUI.displayName = "RuntimeUI";