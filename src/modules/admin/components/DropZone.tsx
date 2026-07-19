import {useDroppable} from "@dnd-kit/core";
import {Stack} from "@mui/material";
import {useMemo} from "react";

const isAllowDrop = (droppableType: string, zoneType: string) => {
    console.log(`droppableType=${droppableType}, zoneType=${zoneType}`);

    if (droppableType === "Page" && zoneType === 'globalZone') {
        return true;
    } else if (droppableType === "Widget" && zoneType === 'pageZone') {
        return true;
    }  else if (droppableType === "Field" && zoneType === 'widgetZone') {
        return true;
    }

    return false;
}

export function DropZone({id, children}) {
    const droppable = useDroppable({id});
    const {isOver, setNodeRef, over, active} = droppable;

    if (isOver) {
        console.log('Over');
    }
    // const {isOver, setNodeRef, over, active} = useDroppable({id});
    // over.id=globalZone
    // id=globalZone
    // active.data.current.type=Page

    // const backgroundColor = useMemo(() => {
    //     if (!isOver) {
    //         return 'rgba(245,245,245,0.46)';
    //     }
    //
    //     const typeDroppable = active?.data?.current?.type;
    //     const typeOver = over?.data?.current?.type;
    //     if (typeOver === undefined && typeDroppable === "Page") {
    //         return 'rgba(69,227,31,0.23)';
    //     } else {
    //         return 'rgba(194,24,24,0.27)'
    //     }
    // }, [active?.data, isOver, over?.data]);

    const border = useMemo(() => {
        if (!isOver) {
            return '2px dashed #aaa';
            // return '2px dashed #aaa';
        }

        const droppableType = active?.data?.current?.type;
        const zoneType = (over?.id as string | undefined ?? '').split("_")[0];
        if (isAllowDrop(droppableType, zoneType)) {
            return '4px solid #0F0';
        } else {
            return '4px solid #F00'
        }
    }, [active?.data, isOver, over?.id]);

    const style = {
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: isOver ? '#dcedc8' : '#f5f5f5',
        // backgroundColor: backgroundColor,
        // border: '2px dashed #aaa',
        border: border,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {/*<Stack gap={1} sx={{opacity: isOver ? 0.5 : 1}}>*/}
            {/*<Stack gap={1} sx={{border}}>*/}
            {/*<Stack gap={1}>*/}
            <Stack sx={{minWidth: "300px"}}>
                {children}
            </Stack>
        </div>
    );
}