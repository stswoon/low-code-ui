import {type FC, memo, type ReactNode} from 'react';
import {Stack} from "@mui/material";

interface BrickProps {
    type: 'Page' | 'Widget' | 'Datasource' | "Field"
    label?: string;
    children?: ReactNode;
}

export const Brick: FC<BrickProps> = memo(({type, label, children}) => {
    const backgroundColor =
        type === 'Page' ? "brown" :
            type === "Widget" ? "green" :
                type === "Datasource" ? "orange" :
                    "lightgray"
    return (
        <div className="taBrick"
             style={{
                 minWidth: "150px",
                 minHeight: "32px",
                 backgroundColor,
                 padding: "8px"
             }}
        >
            <Stack gap={1}>
            <span style={{marginBottom: '4px'}}>{type}{label ? ": " + label : ""}</span>
            {children}
            </Stack>
        </div>
    );
});

Brick.displayName = "Brick";