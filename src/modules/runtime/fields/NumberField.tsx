import {type FC, memo} from 'react';
import type {FieldProps} from "../Registry.ts";
import type {Field} from "../../../shared/types.ts";
import {Input, Stack} from "@mui/material";

interface NumberFiledProps extends FieldProps, Field {
}

export const NumberField: FC<NumberFiledProps> = memo((props) => {
    return (
        <Stack className="taNumberFiled" direction="row" gap={1} alignItems='center'>
            <span>{props.label}</span>
            <Input type="number" onChange={(evt) => props.onValueChange(evt.target.value)}/>
        </Stack>
    );
});

NumberField.displayName = "NumberField";