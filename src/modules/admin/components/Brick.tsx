import {type FC, memo} from 'react';

interface BrickProps {
    type: 'Page' | 'Widget' | 'Datasource' | "Field"
    label?: string
}

export const Brick: FC<BrickProps> = memo(({type, label}) => {
    const backgroundColor =
        type === 'Page' ? "brown" :
            type === "Widget" ? "green" :
                type === "Datasource" ? "orange" :
                    "lightgray"
    return (
        <div className="taBrick"
             style={{
                 width: "150px",
                 height: "32px",
                 backgroundColor,
                 padding: "8px"
             }}
        >{type}{label ? ": " + label : ""}</div>
    );
});

Brick.displayName = "Brick";