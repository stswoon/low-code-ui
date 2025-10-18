import type {Page} from "./types.ts";

export const uiExample1: Page[] = [
    {
        id: "p1", name: "Create User Page", urlPath: "/create",
        widgets: [
            {
                id: "w1", name: "Create User Form", type: 'Form',
                fields: [
                    {id: 'w1-f1', type: 'text', label: 'name', dataPath: '$.name'},
                    {id: 'w1-f2', type: 'number', label: 'age', dataPath: '$.age'},
                    {
                        id: 'w1-f3', type: 'dropdown', label: 'sex', dataPath: '$.sex',
                        availableValues: [{id: '0', value: 'man'}, {id: '1', value: 'woman'}]
                    },
                ],
                datasource: {type: "fetch", method: 'POST', url: "/users"}
            }
        ]
    },
    {
        id: "p2", name: "List Users Page", urlPath: "/create",
        widgets: [
            {
                id: "w2", name: "List Users Widget", type: 'CardList',
                fields: [
                    {id: 'w2-f1', type: 'text', label: 'name', dataPath: '$.name'},
                    {id: 'w2-f2', type: 'number', label: 'age', dataPath: '$.age'},
                    {
                        id: 'w2-f3', type: 'dropdown', label: 'sex', dataPath: '$.sex',
                        availableValues: [{id: '0', value: 'man'}, {id: '1', value: 'woman'}]
                    },
                ],
                datasource: {type: "fetch", method: 'GET', url: "/users"}
            }
        ]
    }
]