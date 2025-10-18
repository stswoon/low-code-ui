import {type FC, memo} from 'react';
import {Button} from "@mui/material";


export const AdminConfigUI: FC = memo(() => {
    return <div className="taAdminConfigUI">AdminConfigUI component
        <Button variant="contained">Test</Button>
    </div>;
});

AdminConfigUI.displayName = "AdminConfigUI";