import {type FC, memo, useCallback, useEffect, useState} from 'react';
import type {Widget} from "../../../shared/types.ts";
import {Button, Divider, Paper, Stack, Typography} from "@mui/material";
import {Card} from "../components/Card.tsx";
import {Registry} from "../Registry.ts";

type CardListProps = Widget

export const CardListWidget: FC<CardListProps> = memo((props) => {
    const [data, setData] = useState<unknown[]>([]);

    const getRequest = useCallback(async () => {
        const ds = Registry.dataSources[props.datasource.type];
        if (!ds) {
            throw new Error("Illegal Config, ds");
        }
        try {
            const newData = await ds.get(props.datasource) as unknown[];
            setData(newData);
        } catch (err: unknown) {
            console.error(`Failed to send dato to ${props.datasource.url}, err=`, err);
        }
    }, [props.datasource]);

    useEffect(() => {
        getRequest().catch(e => console.error("useEffect error", e));
    }, [getRequest]);

    const getFieldComponents = useCallback((oneItemData: unknown) => {
        return props.fields.map(field => {
            const Field = Registry.fields[field.type];
            if (!Field) {
                const errMsg = `Failed to find Field with type=${field.type}`;
                console.error(errMsg)
                return <div key={field.id}>{errMsg}</div>
            }

            const dataPath = field.dataPath.replace('$', 'data');
            const getValueFromData = new Function('data', `return ${dataPath}`); //NOT SAFE, but it is prototype
            const value = getValueFromData(oneItemData);

            return <Field key={field.id} {...field} value={value} readonly/>
        })
    }, [props.fields]);

    return (
        <div className="taCardList">
            <Paper sx={{margin: 2, padding: 2}}>
                <Stack gap={4}>
                    <Stack gap={2} direction="row">
                        <Typography variant="h5">CardList: {props.name}</Typography>
                        <Button onClick={getRequest}>Refresh</Button>
                    </Stack>
                    <Divider orientation="horizontal"/>
                    {data.map(item => {
                        const fieldComponents = getFieldComponents(item);
                        //TODO: typings
                        const itemId = (item as any)['id'] ?? Math.random(); //eslint-disable-line @typescript-eslint/no-explicit-any
                        return (<Card key={itemId} columns={2} fields={fieldComponents}/>)
                    })}
                </Stack>
            </Paper>
        </div>
    );
});

CardListWidget.displayName = "CardListWidget";