import {type FC, memo, useEffect, useMemo, useState} from "react";
import {Box, Button, Stack, Switch, Typography} from "@mui/material";
import {Editor, type EditorProps} from "@monaco-editor/react";
import {jsonPretty} from "../../shared/utils.ts";
import {uiExample1} from "../../shared/uiExamples.const.ts";
import {useAppStore} from "../../shared/store.ts";

const options: EditorProps['options'] = {
    minimap: {enabled: false},
    fontSize: 10
};

export const JsonConfig: FC = memo(() => {
    const {uiConfig, setUiConfig} = useAppStore()
    const [autoApply, setAutoApply] = useState<boolean>(false);
    const [uiConfigLocal, setUiConfigLocal] = useState<string>(jsonPretty(uiExample1));

    const handleEditorChange = (value: string | undefined) => {
        setUiConfigLocal(value ?? '[]');
    }

    const handleClear = () => {
        setUiConfigLocal('[]')
    }

    const isValid = useMemo(() => {
        try {
            JSON.parse(uiConfigLocal);
            return true;
        } catch {
            return false;
        }
    }, [uiConfigLocal])

    useEffect(() => {
        setUiConfigLocal(jsonPretty(JSON.parse(uiConfig)))
    }, [uiConfig])

    useEffect(() => {
        if (autoApply && isValid) {
            setUiConfig(uiConfigLocal)
        }
    }, [autoApply, isValid, setUiConfig, uiConfigLocal]);

    return (
        <Stack gap={1}>
            <Typography variant="h4">Json View</Typography>
            <Box sx={{border: "1px solid blue"}}>
                <Editor height="300px" defaultLanguage="javascript" value={uiConfigLocal} language="json"
                        onChange={handleEditorChange} options={options}/>;
            </Box>
            <Stack gap={1} direction="row" alignItems="center">
                <span>Auto apply:</span>
                <Switch onChange={(e) => setAutoApply(e.target.checked)}/>
                <Button variant="contained" onClick={() => setUiConfig(uiConfigLocal)}
                        disabled={!isValid}>Apply</Button>
                <Button onClick={handleClear}>Clear</Button>
                <Button onClick={() => setUiConfigLocal(jsonPretty(uiExample1))}>Example</Button>
            </Stack>
        </Stack>
    )
});

JsonConfig.displayName = "JsonConfig";