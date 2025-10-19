import {type FC, memo, useRef} from 'react';
import type {Page} from "../../shared/types.ts";
import {AppBar, Link, Stack, Toolbar} from "@mui/material";
import {Route, Routes} from "react-router";
import {PageRenderer} from "./PageRenderer.tsx";
import {Registry} from "./Registry.ts";
import {FormWidget} from "./widgets/FormWidget.tsx";
import {fetchDsService} from "./widgets/FetchDsService.ts";
import {CardListWidget} from "./widgets/CardListWidget.tsx";
import {TextField} from "./fields/TextField.tsx";
import {NumberField} from "./fields/NumberField.tsx";
import {HiddenField} from "./fields/HiddenField.tsx";
import {DropdownField} from "./fields/DropdownField.tsx";


//In non prod need lazy loading
Registry.widgets['Form'] = FormWidget;
Registry.widgets['CardList'] = CardListWidget;
Registry.dataSources['fetch'] = fetchDsService;
//TODO: fix typings
Registry.fields['text'] = TextField as any; //eslint-disable-line @typescript-eslint/no-explicit-any
Registry.fields['number'] = NumberField as any; //eslint-disable-line @typescript-eslint/no-explicit-any
Registry.fields['hidden'] = HiddenField as any; //eslint-disable-line @typescript-eslint/no-explicit-any
Registry.fields['dropdown'] = DropdownField as any; //eslint-disable-line @typescript-eslint/no-explicit-any


interface RendererProps {
    uiConfig: Page[]
}

export const MainRenderer: FC<RendererProps> = memo(({uiConfig}) => {
    const containerRef = useRef(null);
    return (
        <div className="taRenderer" ref={containerRef}>
            <AppBar position="static">
                <Toolbar>
                    <Stack gap={4} direction="row">
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