import {type FC, memo, type ReactNode, useMemo, useState} from 'react';
import {Divider, Stack, Typography} from "@mui/material";
import {useAppStore} from "../../shared/store.ts";
import {Brick} from "./components/Brick.tsx";
import {DndContext, DragOverlay, useDraggable} from "@dnd-kit/core";
import {nanoid} from "nanoid";
import {TreeNone} from "./components/TreeNodeBricks.tsx";
import type {DataSource, Page, Widget} from "../../shared/types.ts";
import {DropZone} from "./components/DropZone.tsx";


export const LowCodeAdminConfigUI: FC = memo(() => {
    const {uiConfig, setUiConfig} = useAppStore();

    const uiConfigJson = JSON.parse(uiConfig ?? '[]') as Page[]

    const uiConfigAsAdminBricks: ReactNode = useMemo(() => {
        return <TreeNone data={uiConfigJson}/>;
    }, [uiConfigJson])


    // const [dragToElems, setDragToElems] = useState<ReactNode[]>([]);

    const dragFromElems = [
        {type: "Page"},
        {type: "Widget", label: "CardList"},
        {type: "Widget", label: "Form"},
        {type: "Datasource", label: "fetch"},
        {type: "Field", label: "text"},
        {type: "Field", label: "number"},
        {type: "Field", label: "hidden"},
        {type: "Field", label: "dropdown"}
    ];

    const [activeId, setActiveId] = useState(null);

    const handleDragEnd = (event: any) => {
        // console.log(`Dropped event:`, event);
        setActiveId(null);
        const {over} = event;
        if (over) {
            const type = event.active.data.current.type;
            if (over.id === 'globalZone' && type === 'Page') {
                console.log(`Dropped over: ${over.id}`);
                const newPage: Page = {id: nanoid(), widgets: [], urlPath: "/", name: "new page"}
                const newUiConfigAsAdminBricks = [...uiConfigJson, newPage];
                setUiConfig(JSON.stringify(newUiConfigAsAdminBricks));
            } else if (over.id.startsWith('pageZone_') && type === 'Widget') {
                console.log(`Dropped over: ${over.id}`);
                const pageId = over.id.split("_")[1];
                const label = event.active.data.current.label;
                const newDatasource: DataSource = {type: "fetch", url: "/", method: "GET"};
                const newWidget: Widget = {
                    id: nanoid(),
                    fields: [],
                    name: "new widget",
                    type: label,
                    datasource: newDatasource
                }
                let newUiConfigAsAdminBricks = [...uiConfigJson];
                newUiConfigAsAdminBricks = newUiConfigAsAdminBricks.map(page => {
                    if (page.id === pageId) {
                        return {...page, widgets: [...page.widgets, newWidget]}
                    } else {
                        return page;
                    }
                })
                setUiConfig(JSON.stringify(newUiConfigAsAdminBricks));
            } else if (over.id.startsWith('widgetZone_') && (type === 'Field' || type === 'Datasource')) {
                console.log(`Dropped over: ${over.id}`);
                //TODO
            }
        } else {
            console.log('Dropped outside any zone');
        }
    };

    return (
        <Stack className="taAdminConfigUI" gap={1} sx={{height: "100%"}}>
            <Typography variant="h4">LowCodeAdminConfigUI</Typography>

            <DndContext onDragStart={({active}) => setActiveId(active.id as any)} onDragEnd={handleDragEnd}>
                <Stack spacing={1}
                       divider={<Divider orientation="vertical" flexItem/>}
                       direction="row"
                       sx={{height: "100%"}}>

                    <Stack className="dragFrom" sx={{width: "180px"}} gap={1}>
                        {dragFromElems.map(elem => {
                            const id = elem.type + "_" + elem.label;
                            return (
                                <div key={id}>
                                    <DragOverlay dropAnimation={null}>
                                        {activeId === id ? <div style={{opacity: 0.6}}>
                                            <Brick type={elem.type as never} label={elem.label}/>
                                        </div> : null}
                                    </DragOverlay>

                                    <DraggableItem id={id} data={elem}>
                                        <div className="dragMe">
                                            <Brick type={elem.type as never} label={elem.label}/>
                                        </div>
                                    </DraggableItem>
                                </div>
                                // <Draggable key={nanoid()}>
                                //     <div>
                                //         <Brick type={elem.type as never} label={elem.label}/>
                                //     </div>
                                // </Draggable>
                            )
                        })}
                    </Stack>

                    <Stack className="dragTo" sx={{width: "100%", overflowY: "scroll", height: "400px"}}>
                        <DropZone id="globalZone" showDropLabel={true}>
                            {uiConfigAsAdminBricks}
                        </DropZone>
                    </Stack>
                </Stack>
            </DndContext>
        </Stack>
    );
});

LowCodeAdminConfigUI.displayName = "LowCodeAdminConfigUI";


function DraggableItem({children, id, data}) {
    const {listeners, setNodeRef} = useDraggable({id, data});
    return (<div ref={setNodeRef} {...listeners}>{children}</div>);
}


