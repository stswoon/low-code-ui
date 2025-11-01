import type {Page} from "../../../shared/types.ts";
import {Brick} from "./Brick.tsx";
import {DropZone} from "./DropZone.tsx";


export function TreeNone({data}: { data: Page[] }) {
    return (
        <>
            {data.map(page => (
                <DropZone key={page.id} id={`pageZone_${page.id}`}>
                    <Brick type={'Page'} label={page.urlPath}>
                        <>
                            {page.widgets.map(widget => (
                                <DropZone key={widget.id} id={`widgetZone_${widget.id}`}>
                                    <Brick type={'Widget'} label={widget.type}>
                                        {widget.fields.map(field => (
                                            <Brick key={field.id} type={'Field'} label={field.label}/>
                                        ))}
                                        {!!widget.datasource &&
                                            <Brick type={'Datasource'} label={widget.datasource.url}/>}
                                    </Brick>
                                </DropZone>
                            ))}
                        </>
                    </Brick>
                </DropZone>
            ))}
        </>
    )
}