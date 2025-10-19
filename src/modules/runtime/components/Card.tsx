import {type FC, memo, type ReactNode} from 'react';
import {Grid} from "@mui/material";

interface CardProps {
    fields: ReactNode[];
    columns: 2 //TODO support columns
}

export const Card: FC<CardProps> = memo(({fields}) => {
    return (
        <Grid container spacing={0.5} className="taCard">
            {/*TODO: fix key*/}
            {fields.map(field => (<Grid key={Math.random()} size={6}>{field}</Grid>))}
        </Grid>
    );
});

Card.displayName = "Card";