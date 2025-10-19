import {type FC, memo} from 'react';
import type {Field} from "../../../shared/types.ts";

type HiddenFieldProps = Field;

//for forms
export const HiddenField: FC<HiddenFieldProps> = memo((props) => {
    return (
        <div className="taHiddenField" style={{display: "none"}}>
            <input type='hidden' value={props.value}/>
        </div>
    );
});

HiddenField.displayName = "HiddenField";