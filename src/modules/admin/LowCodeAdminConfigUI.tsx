import {type FC, memo, useState} from 'react';
import {Divider, Stack, Typography} from "@mui/material";
// import {useAppStore} from "../../shared/store.ts";
import Draggable from "react-draggable";
import {nanoid} from 'nanoid'
import {Brick} from "./components/Brick.tsx";
import {DndContext, DragOverlay, useDraggable, useDroppable} from "@dnd-kit/core";


export const LowCodeAdminConfigUI: FC = memo(() => {
    // const {setUiConfig} = useAppStore();
    // const [dragToElems, setDragToElems] = useState<ReactNode>([]);

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

    const handleDragEnd = (event) => {
        setActiveId(null)

        const {over} = event;
        if (over) {
            console.log(`Dropped over: ${over.id}`);
        } else {
            console.log('Dropped outside any zone');
        }
    };

    return (
        <Stack className="taAdminConfigUI" gap={1} sx={{height: "100%"}}>
            <Typography variant="h4">LowCodeAdminConfigUI</Typography>

            <DndContext onDragStart={({active}) => setActiveId(active.id)} onDragEnd={handleDragEnd}>
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

                                    <DraggableItem id={id}>
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

                    <Stack className="dragTo">
                        <DropZone/>
                        {/*{dragToElems}*/}
                    </Stack>


                </Stack>
            </DndContext>
        </Stack>
    );
});

LowCodeAdminConfigUI.displayName = "LowCodeAdminConfigUI";


function DraggableItem({children, id}) {
    const {listeners, setNodeRef} = useDraggable({id});
    return (<div ref={setNodeRef} {...listeners}>{children}</div>);
}


function DropZone() {
    const {isOver, setNodeRef} = useDroppable({id: 'droppable-1'});

    const style = {
        width: 200,
        height: 200,
        border: '2px dashed #aaa',
        backgroundColor: isOver ? '#dcedc8' : '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div ref={setNodeRef} style={style}>
            Drop here
        </div>
    );
}