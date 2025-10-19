import {type FC, memo} from 'react';
import type {Widget} from "../../../shared/types.ts";
import {Divider, Paper, Typography} from "@mui/material";

type CardListProps = Widget

export const CardList: FC<CardListProps> = memo((props) => {
    return (
        <div className="taCardList">
            <Paper>
                <Typography variant="h5">CardList: {props.name}</Typography>
                <Divider orientation="horizontal"/>
            </Paper>
        </div>
    );
});

CardList.displayName = "CardList";