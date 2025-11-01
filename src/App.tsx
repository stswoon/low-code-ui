import {Divider} from "@mui/material";
import {LowCodeAdminConfigUI} from "./modules/admin/LowCodeAdminConfigUI.tsx";
import {RuntimeUI} from "./modules/runtime/RuntimeUI.tsx";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {DemoDialog} from "./shared/DemoDialog.tsx";
import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {JsonConfig} from "./modules/admin/JsonConfig.tsx";
import {AiChat} from "./modules/admin/AiChat.tsx";

const App = () => {
    return (
        <>
            <PanelGroup direction="horizontal">
                <Panel defaultSize={60}>
                    <PanelGroup direction="vertical">
                        <Panel defaultSize={50}>
                            <LowCodeAdminConfigUI/>
                        </Panel>
                        <PanelResizeHandle style={{padding: "4px", margin: "4px"}}>
                            <Divider orientation="horizontal"/>
                        </PanelResizeHandle>
                        <Panel defaultSize={50}>
                            <AiChat/>
                        </Panel>
                    </PanelGroup>
                </Panel>

                <PanelResizeHandle style={{padding: "4px", margin: "4px"}}>
                    <Divider orientation="vertical"/>
                </PanelResizeHandle>

                <Panel>
                    <PanelGroup direction="vertical">
                        <Panel defaultSize={50}>
                            <RuntimeUI/>
                        </Panel>
                        <PanelResizeHandle style={{padding: "4px", margin: "4px"}}>
                            <Divider orientation="horizontal"/>
                        </PanelResizeHandle>
                        <Panel defaultSize={50}>
                            <JsonConfig/>
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
            <DemoDialog/>
        </>
    );
};

export default App;
