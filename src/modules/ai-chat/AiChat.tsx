import {Box, Button, Input, Stack, TextareaAutosize} from '@mui/material';
import {type FC, memo, useEffect, useState} from 'react';
import {ChatOpenAI} from "@langchain/openai";
import {SYSTEM_AI_MSG, TEST_USER_MSG} from "../../shared/const.ts";
import {marked} from "marked";
import {AIMessage, HumanMessage, SystemMessage} from "@langchain/core/messages";

interface AiChatProps {
    onCopyAiAnswer: (s: string) => void;
}

export const AiChat: FC<AiChatProps> = memo(({onCopyAiAnswer}) => {
    const [chatGptKey, setChatGptKey] = useState('');
    const [userPrompt, setUserPrompt] = useState(TEST_USER_MSG.trim());
    const [loading, setLoading] = useState(false);
    const [aiModel, setAiModel] = useState<ChatOpenAI | undefined>(undefined);

    const [history, setHistory] = useState<Array<AIMessage | HumanMessage | SystemMessage>>([new SystemMessage(SYSTEM_AI_MSG.trim())]);

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

        try {
            setLoading(true);
            const userMsg = new HumanMessage(userPrompt.trim())
            const response: AIMessage = await model.invoke([...history, userMsg]);
            // console.log(response);
            setHistory([...history, userMsg, response])
            setUserPrompt('');

            //todo: ref
            const el = document.getElementById('123');
            el?.scrollTo({top: el.scrollHeight, behavior: 'smooth'});
        } catch (e) {
            console.error("Failed from AI, cause=", e)
        } finally {
            setLoading(false)
        }
    }

    function clear() {
        setAiModel(undefined);
        setHistory([new SystemMessage(SYSTEM_AI_MSG.trim())]);
        setUserPrompt('')
    }

    function applyAiJson() {
        let s = history[history.length - 1].content as string;
        s = s.replace("```json", "").replace("```", "");
        onCopyAiAnswer?.(s);
    }

    return (
        <Stack className="taAiChat" gap={1}>
            <Stack direction="row" gap={1}>
                <span>ChatGptKey:</span>
                <Input type="password" value={chatGptKey} sx={{maxWidth: "300px"}}
                       onChange={e => setChatGptKey(e.target.value)}/>
            </Stack>
            <Stack id="123" sx={{border: "1px solid blue", height: "250px", overflowY: 'scroll'}} gap={1}>
                {history.map(((message) => {
                    if (message.type === 'system') {
                        return null;
                    }
                    const text = message.content as string; //TODO: fix typing
                    const html = marked.parse(text);
                    return <Box key={text}
                                sx={{
                                    borderRadius: "8px",
                                    padding: "8px",
                                    marginLeft: message.type === "human" ? "40px" : "0",
                                    marginRight: message.type === "human" ? "0" : "40px",
                                    backgroundColor: message.type === "human" ? "#d8f2de" : "#accdef"
                                }}
                                dangerouslySetInnerHTML={{__html: html}}
                    />
                }))}
                {history.length > 1 &&
                    <Button color={"success"} variant="outlined" sx={{width: "250px"}}
                            onClick={applyAiJson}>Copy AI Answer to Config</Button>}
            </Stack>
            <Stack gap={1} direction="row">
                <TextareaAutosize style={{width: "500px"}} minRows={3} maxRows={3} placeholder="Type user prompt"
                                  value={userPrompt}
                                  onChange={e => setUserPrompt(e.target.value)}/>
                <Button variant="contained" onClick={sendAndHandleAiAnswer}
                        disabled={chatGptKey.trim().length === 0 || loading || userPrompt.trim().length === 0}
                        loading={loading}>Send</Button>
                <Button onClick={clear}>Clear</Button>
            </Stack>
        </Stack>
    );
});

AiChat.displayName = "AiChat";