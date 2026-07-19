import type {Page} from "../../../shared/types.ts";
import {Brick} from "./Brick.tsx";
import {DropZone} from "./DropZone.tsx";
import {Stack} from "@mui/material";


export function TreeNone({data}: { data: Page[] }) {
    return (
        <div style={{minHeight: "100px", padding: "8px"}}>
            {!data.length && <div style={{textAlign: 'center'}}>Drop here</div>}

            <Stack gap={2}>
                {data.map(page => (
                    <DropZone key={page.id} id={`pageZone_${page.id}`}>
                        <Brick type={'Page'} label={page.urlPath}>
                            <>
                                {page.widgets.map(widget => (
                                    <DropZone key={widget.id} id={`widgetZone_${widget.id}`}>
                                        <Brick type={'Widget'} label={widget.type}>
                                            {widget.fields.map(field => (
                                                <Brick key={field.id} type={'Field'} label={"name=" + field.label}/>
                                            ))}
                                            {!!widget.datasource &&
                                                <Brick type={'Datasource'} label={"url=" + widget.datasource.url}/>}
                                        </Brick>
                                    </DropZone>
                                ))}
                            </>
                        </Brick>
                    </DropZone>
                ))}
            </Stack>
        </div>
    )
}