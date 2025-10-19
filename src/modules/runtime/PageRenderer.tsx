import {type FC, memo} from 'react';
import type {Page} from "../../shared/types.ts";
import {Registry} from "./Registry.ts";

interface PageRendererProps {
    config: Page
}

export const PageRenderer: FC<PageRendererProps> = memo(({config}) => {
    return (
        <div className="taPageRenderer">
            {/*<div>PageRenderer component, page name = {config.name}</div>*/}
            {config.widgets.map(widget => {
                const Widget = Registry.widgets[widget.type];
                if (!Widget) {
                    const errMsg = `Failed to find widget with type=${widget.type}`;
                    console.error(errMsg)
                    return <div>{errMsg}</div>
                }
                return <Widget/>
            })}
        </div>
    );
});

PageRenderer.displayName = "PageRenderer";