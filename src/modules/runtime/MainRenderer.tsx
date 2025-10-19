import {type FC, memo, useRef} from 'react';
import type {Page} from "../../shared/types.ts";
import {AppBar, Link, Stack, Toolbar} from "@mui/material";
import {Route, Routes} from "react-router";
import {PageRenderer} from "./PageRenderer.tsx";
import {Registry} from "./Registry.ts";
import {FormWidget} from "./widgets/FormWidget.tsx";
import {fetchDsService} from "./widgets/FetchDsService.ts";
import {CardList} from "./widgets/CardList.tsx";


Registry.widgets['Form'] = FormWidget;
Registry.widgets['CardList'] = CardList;
Registry.dataSources['fetch'] = fetchDsService;


interface RendererProps {
    uiConfig: Page[]
}

export const MainRenderer: FC<RendererProps> = memo(({uiConfig}) => {
    const containerRef = useRef(null);
    return (
        <div className="taRenderer" ref={containerRef}>
            <AppBar position="static">
                <Toolbar>
                    <Stack gap={1} direction="row">
                        {uiConfig.map(page => (
                            <Link color="textPrimary" key={page.id} href={page.urlPath}>{page.name}</Link>
                        ))}
                    </Stack>
                </Toolbar>
            </AppBar>
            <Routes>
                {uiConfig.map(page => (
                    <Route key={page.id} path={page.urlPath} element={<PageRenderer config={page}/>}/>
                ))}
            </Routes>
        </div>
    );
});

MainRenderer.displayName = "MainRenderer";