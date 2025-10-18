import {create} from "zustand/react";

type AppStore = {
    uiConfig: string
    setUiConfig: (newUiConfig: string) => void
}

export const useAppStore = create<AppStore>()((set) => ({
    uiConfig: '',
    setUiConfig: (newUiConfig: string) => {
        // return set((state) => {
        return set(() => {
            return ({uiConfig: newUiConfig})
        })
    },
}))
