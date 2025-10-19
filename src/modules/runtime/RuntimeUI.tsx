import {type FC, memo} from 'react';
import {useAppStore} from "../../shared/store.ts";
import {Box, Typography} from "@mui/material";
import {MainRenderer} from "./MainRenderer.tsx";
import type {Page} from "../../shared/types.ts";


export const RuntimeUI: FC = memo(() => {
    const {uiConfig} = useAppStore();

    return (
        <div className="taRuntimeUI">
            <Typography variant="h3">RuntimeUI</Typography>
            <Box sx={{height: "20px", overflow: "hidden"}}>{uiConfig}</Box>
            <MainRenderer uiConfig={JSON.parse(uiConfig ?? '[]') as Page[]}/>
        </div>
    );
});

RuntimeUI.displayName = "RuntimeUI";