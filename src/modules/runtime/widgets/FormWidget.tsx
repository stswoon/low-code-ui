import {type FC, memo, useState} from 'react';
import type {Widget} from "../../../shared/types.ts";
import {Button, Divider, Paper, Stack, Typography} from "@mui/material";
import {Registry} from "../Registry.ts";

type FormWidgetProps = Widget

export const FormWidget: FC<FormWidgetProps> = memo(props => {
    const [data, setData] = useState<unknown>({});

    const sendRequest = async () => {
        const ds = Registry.dataSources[props.datasource.type];
        if (!ds) {
            throw new Error("Illegal Config, ds");
        }
        try {
            await ds.send(props.datasource, data)
        } catch (err: unknown) {
            console.error(`Failed to send dato to ${props.datasource.url}, err=`, err);
        }
    }

    const handleFieldValueChange = (fieldId: string, value: any): void => {
        const field = props.fields.find(field => field.id === fieldId);
        if (!field) {
            throw new Error("Illegal State, field");
        }
        const dataPath = field.dataPath.replace('$', 'data');
        const applyValueToData = new Function('data', 'value', `${dataPath} = value; return data;`); //NOT SAFE, but it is prototype
        const newData = applyValueToData(structuredClone(data), value);
        setData(newData);
    }

    console.log("props.fields", props.fields);

    return (
        <div className="taFormWidget">
            <Paper sx={{margin: 2, padding: 2}}>
                <Typography variant="h5">FormWidget: {props.name}</Typography>
                <Divider orientation="horizontal"/>
                <Stack gap={0.5}>
                    {props.fields.map(field => {
                        const Field = Registry.fields[field.type];
                        if (!Field) {
                            const errMsg = `Failed to find Field with type=${field.type}`;
                            console.error(errMsg)
                            return <div key={field.id}>{errMsg}</div>
                        }
                        return <Field key={field.id} {...field}
                                      onValueChange={(value) => handleFieldValueChange(field.id, value)}/>
                    })}
                </Stack>
                <Divider orientation="horizontal"/>
                <Button onClick={sendRequest}>Send</Button>
            </Paper>
        </div>
    );
});

FormWidget.displayName = "FormWidget";