import {type FC, memo} from 'react';
import type {Field} from "../../../shared/types.ts";

type HiddenFieldProps = Field;

//for forms
export const HiddenField: FC<HiddenFieldProps> = memo((props) => {
    return (
        <div className="taHiddenField" style={{display: "none"}}>
            {/*TODO typing*/}
            <input type='hidden' value={props.value as string}/>
        </div>
    );
});

HiddenField.displayName = "HiddenField";