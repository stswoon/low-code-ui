import {useDroppable} from "@dnd-kit/core";
import {Stack} from "@mui/material";

export function DropZone({id, children}) {
    const {isOver, setNodeRef} = useDroppable({id});

    const style = {
        width: "100%",
        border: '2px dashed #aaa',
        backgroundColor: isOver ? '#dcedc8' : '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Stack gap={1} sx={{opacity: isOver ? 0.5 : 1}}>
                {children}
            </Stack>
        </div>
    );
}