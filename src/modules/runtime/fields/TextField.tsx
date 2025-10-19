import {type FC, memo} from 'react';
import type {FieldProps} from "../Registry.ts";
import type {Field} from "../../../shared/types.ts";
import {Input, Stack} from '@mui/material';

interface TextFieldProps extends FieldProps, Field {
}

export const TextField: FC<TextFieldProps> = memo((props) => {
    return (
        <Stack className="taTextField" direction="row" gap={1} alignItems='center'>
            <span>{props.label}:</span>

            {!props.readonly &&
                <Input onChange={(evt) => props.onValueChange?.(evt.target.value)}/>}

            {/*TODO typing*/}
            {props.readonly && <span>{props.value as string}</span>}
        </Stack>
    );
});

TextField.displayName = "TextField";