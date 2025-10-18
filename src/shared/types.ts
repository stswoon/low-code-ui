export interface Page {
    id: string;
    name: string;
    urlPath: string;
    widgets: Widget[];
}

export interface Widget {
    id: string;
    name: string;
    type: 'Form' | 'CardList';
    datasource: DataSource;
    fields: Field[];
}

export interface Field {
    id: string;
    label: string;
    type: 'text' | 'number' | 'hidden' | 'dropdown';
    dataPath: string;
    value?: undefined;
    availableValues?: { id: string; value: string }[];
}

export interface DataSource {
    type: 'fetch';
    method: 'GET' | 'POST';
    url: string;
}