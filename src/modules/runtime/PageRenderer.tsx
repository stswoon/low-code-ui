import {type FC, memo} from 'react';
import type {Page} from "../../shared/types.ts";
import {Registry} from "./Registry.ts";
import ErrorBoundary from "./ErrorBoundary.tsx";

interface PageRendererProps {
    config: Page
}

export const PageRenderer: FC<PageRendererProps> = memo(({config}) => {
    return (
        <div className="taPageRenderer">
            <ErrorBoundary fallback={<div>Page Failed to Render</div>}>
                {/*<div>PageRenderer component, page name = {config.name}</div>*/}
                {config.widgets.map(widget => {
                    const Widget = Registry.widgets[widget.type];
                    if (!Widget) {
                        const errMsg = `Failed to find Widget with type=${widget.type}`;
                        console.error(errMsg)
                        return <div key={widget.id}>{errMsg}</div>
                    }
                    return <Widget key={widget.id} {...widget}/>
                })}
            </ErrorBoundary>
        </div>
    );
});

PageRenderer.displayName = "PageRenderer";