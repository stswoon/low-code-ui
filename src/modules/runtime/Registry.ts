import type {ComponentType} from "react";

export interface RegistryType {
    fields: Record<string, ComponentType<unknown> | undefined>;
    widgets: Record<string, ComponentType<unknown> | undefined>
}

export const Registry: RegistryType = {
    fields: {},
    widgets: {}
}