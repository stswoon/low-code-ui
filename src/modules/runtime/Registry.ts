import type {ComponentType} from "react";
import type {DataSource, Widget} from "../../shared/types.ts";

export interface FieldProps {
    readonly?: boolean;
    value?: unknown;
    onValueChange?: (value: unknown) => void;
}

export interface DatasourceService<T> {
    send(config: DataSource, data: T): Promise<T>;
    get(config: DataSource): Promise<T>;
}

export interface RegistryType {
    fields: Record<string, ComponentType<FieldProps> | undefined>;
    widgets: Record<string, ComponentType<Widget> | undefined>;
    dataSources: Record<string, DatasourceService<unknown> | undefined>;
}

export const Registry: RegistryType = {
    fields: {},
    widgets: {},
    dataSources: {}
}