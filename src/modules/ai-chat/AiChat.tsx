import {Box, Button, Input, Stack, TextareaAutosize} from '@mui/material';
import {type FC, memo, useEffect, useState} from 'react';
import {ChatOpenAI} from "@langchain/openai";
import {isEven} from "../../shared/utils.ts";

export const AiChat: FC = memo(() => {
    const [chatGptKey, setChatGptKey] = useState('');
    const [userPrompt, setUserPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiModel, setAiModel] = useState<ChatOpenAI | undefined>(undefined);

    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const key = localStorage.getItem("chatGptKey");
        if (key) {
            setChatGptKey(key);
        }
    }, []);

    const sendAndHandleAiAnswer = async () => {
        let model = aiModel;
        if (!model) {
            model = new ChatOpenAI({apiKey: chatGptKey, model: "gpt-4-1106-preview",});
            setAiModel(model);
        }

        // const response = await model.stream(new HumanMessage("Hello world!"));
        try {
            setLoading(true);
            const response = await model.invoke(userPrompt);
            // console.log(response);
            //TODO: fix possible issue
            const newMsg = response.content as string;
            setMessages([...messages, userPrompt, newMsg])
            setUserPrompt('');
        } catch (e) {
            console.error("Failed from AI, cause=", e)
        } finally {
            setLoading(false)
        }
    }

    function clear() {
        setAiModel(undefined);
        setMessages([]);
        setUserPrompt('')
    }

    return (
        <Stack className="taAiChat" gap={1}>
            <Stack direction="row" gap={1}>
                <span>ChatGptKey:</span>
                <Input type="password" value={chatGptKey} sx={{maxWidth: "300px"}}
                       onChange={e => setChatGptKey(e.target.value)}/>
            </Stack>
            <Stack sx={{border: "1px solid blue", height: "250px", overflowY: 'scroll'}} gap={1}>
                {messages.map(((msg, index) => (
                    <Box key={msg} sx={{
                        borderRadius: "8px",
                        padding: "8px",
                        marginLeft: isEven(index) ? "40px" : "0",
                        marginRight: isEven(index) ? "0" : "40px",
                        backgroundColor: isEven(index) ? "#d8f2de" : "#accdef"
                    }}>{msg}</Box>
                )))}
            </Stack>
            <Stack gap={1} direction="row">
                <TextareaAutosize style={{width: "500px"}} minRows={3} maxRows={3} placeholder="Type user prompt"
                                  value={userPrompt}
                                  onChange={e => setUserPrompt(e.target.value)}/>
                <Button variant="contained" onClick={sendAndHandleAiAnswer}
                        disabled={chatGptKey.trim().length === 0 || loading}
                        loading={loading}>Send</Button>
                <Button onClick={clear}>Clear</Button>
            </Stack>
        </Stack>
    );
});

AiChat.displayName = "AiChat";