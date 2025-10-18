import {Box, Divider, Stack} from "@mui/material";
import {AdminConfigUI} from "./modules/admin/AdminConfigUI.tsx";
import {RuntimeUI} from "./modules/runtime/RuntimeUI.tsx";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
    return (
        <Stack spacing={2} divider={<Divider orientation="vertical" flexItem/>} direction="row" sx={{height: "100%"}}>
            <Box sx={{width: "50vw"}}>
                <AdminConfigUI/>
            </Box>
            <Box sx={{width: "50vw"}}>
                <RuntimeUI/>
            </Box>
        </Stack>
    );
};

export default App;
