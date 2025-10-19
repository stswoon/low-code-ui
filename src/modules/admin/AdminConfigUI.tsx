import {type FC, memo, useMemo, useState} from 'react';
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {Editor, type EditorProps} from "@monaco-editor/react";
import {uiExample1} from "../../shared/uiExamples.const.ts";
import {jsonPretty} from "../../shared/utils.ts";
import {useAppStore} from "../../shared/store.ts";
import {AiChat} from "../ai-chat/AiChat.tsx";

const options: EditorProps['options'] = {
    minimap: {enabled: false},
};

export const AdminConfigUI: FC = memo(() => {
    const {setUiConfig} = useAppStore()
    const [uiConfigLocal, setUiConfigLocal] = useState<string>(jsonPretty(uiExample1));

    const isValid = useMemo(() => {
        try {
            JSON.parse(uiConfigLocal);
            return true;
        } catch {
            return false;
        }
    }, [uiConfigLocal])

    const handleEditorChange = (value: string | undefined) => {
        setUiConfigLocal(value ?? '[]');
    }

    return (
        <Stack className="taAdminConfigUI" gap={1}>
            <Typography variant="h3">AdminConfigUI</Typography>
            <Box sx={{border: "1px solid blue"}}>
                <Editor height="400px" defaultLanguage="javascript" defaultValue={uiConfigLocal} language="json"
                        onChange={handleEditorChange} options={options}/>;
            </Box>
            <Stack gap={1} direction="row">
                <Button variant="contained" onClick={() => setUiConfig(uiConfigLocal)}
                        disabled={!isValid}>Apply</Button>
                <Button onClick={() => setUiConfigLocal('[]')}>Clear</Button>
                <Button onClick={() => setUiConfigLocal(jsonPretty(uiExample1))}>Example</Button>
            </Stack>
            <Divider/>
            <AiChat/>
        </Stack>
    );
});

AdminConfigUI.displayName = "AdminConfigUI";