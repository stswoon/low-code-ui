import {type FC, memo, type ReactNode} from 'react';
import {Stack} from "@mui/material";

interface BrickProps {
    type: 'Page' | 'Widget' | 'Datasource' | "Field"
    label?: string;
    children?: ReactNode;
}

const colorUtil = (type: string) => {
    switch (type) {
        case "Page":
            return "brown";
        case "Widget":
            return "green";
        case "Datasource":
            return "orange";
        default:
            return "lightgray";
    }
}

export const Brick: FC<BrickProps> = memo(({type, label, children}) => {
    const backgroundColor = colorUtil(type);

    return (
        <div className="taBrick"
             style={{minWidth: "150px", minHeight: "32px", padding: "8px", backgroundColor}}
        >
            <Stack gap={1}>
                <span style={{marginBottom: '4px'}}>{type}{label ? ": " + label : ""}</span>
                {children}
            </Stack>
        </div>
    );
});

Brick.displayName = "Brick";