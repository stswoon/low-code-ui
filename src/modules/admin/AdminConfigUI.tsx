import {type FC, memo, useState} from 'react';
import {Box, Button, Stack, Typography} from "@mui/material";
import {Editor, type EditorProps} from "@monaco-editor/react";
import {uiExample1} from "../../shared/uiExamples.const.ts";
import {jsonPretty} from "../../shared/utils.ts";
import {useAppStore} from "../../shared/store.ts";

const options: EditorProps['options'] = {
    minimap: {enabled: false},
};

export const AdminConfigUI: FC = memo(() => {
    const {setUiConfig} = useAppStore()
    const [uiConfigLocal, setUiConfigLocal] = useState<string>(jsonPretty(uiExample1));

    const handleEditorChange = (value: string | undefined) => {
        setUiConfigLocal(value ?? '[]');
    }

    return (
        <div className="taAdminConfigUI">
            <Typography variant="h3">AdminConfigUI</Typography>
            <Box sx={{border: "1px solid blue"}}>
                <Editor height="500px" defaultLanguage="javascript" defaultValue={uiConfigLocal}
                        onChange={handleEditorChange} options={options}/>;
            </Box>
            <Stack gap={1} direction="row">
                <Button variant="contained" onClick={() => setUiConfig(uiConfigLocal)}>Apply</Button>
                <Button onClick={() => setUiConfigLocal('[]')}>Clear</Button>
                <Button onClick={() => setUiConfigLocal(jsonPretty(uiExample1))}>Example</Button>
            </Stack>
        </div>
    );
});

AdminConfigUI.displayName = "AdminConfigUI";