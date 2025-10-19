import {type FC, memo} from 'react';
import type {FieldProps} from "../Registry.ts";
import type {Field} from "../../../shared/types.ts";
import {MenuItem, Select, Stack} from '@mui/material';

interface DropdownFieldProps extends FieldProps, Field {
}

export const DropdownField: FC<DropdownFieldProps> = memo((props) => {
    let avs = props.availableValues ?? [];
    avs = [{id: '', value: '<Empty>'}, ...avs];

    return (
        <Stack className="taDropdownField" direction="row" gap={1} alignItems='center'>
            <span>{props.label}</span>
            <Select size='small'
                    defaultValue={''}
                    onChange={(evt) => props.onValueChange(evt.target.value)}>
                {avs.map(av => (
                    <MenuItem key={av.id} value={av.id}>{av.value}</MenuItem>
                ))}
            </Select>
        </Stack>
    );
});

DropdownField.displayName = "DropdownField";