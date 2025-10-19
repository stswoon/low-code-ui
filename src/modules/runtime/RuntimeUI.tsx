import {type FC, memo} from 'react';
import {useAppStore} from "../../shared/store.ts";
import {Typography} from "@mui/material";
import {MainRenderer} from "./MainRenderer.tsx";
import type {Page} from "../../shared/types.ts";
import ErrorBoundary from "./ErrorBoundary.tsx";


export const RuntimeUI: FC = memo(() => {
    const {uiConfig} = useAppStore();

    return (
        <div className="taRuntimeUI">
            <ErrorBoundary fallback={<div>Oops, it\s just a prototype</div>}>
                <Typography variant="h3">RuntimeUI</Typography>
                {/*<Box sx={{height: "20px", overflow: "hidden"}}>{uiConfig}</Box>*/}
                <MainRenderer uiConfig={JSON.parse(uiConfig ?? '[]') as Page[]}/>
            </ErrorBoundary>
        </div>
    );
});

RuntimeUI.displayName = "RuntimeUI";