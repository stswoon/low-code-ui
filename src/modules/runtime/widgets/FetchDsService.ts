import type {DataSource} from "../../../shared/types.ts";
import type {DatasourceService} from "../Registry.ts";
import {API_SERVER_URL} from "../../../shared/const.ts";
import urlJoin from "url-join";

class FetchDsService implements DatasourceService<unknown> {
    async send(config: DataSource, data: unknown): Promise<unknown> {
        const response = await fetch(urlJoin(API_SERVER_URL, config.url), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw response;
        }
        return await response.json();
    }

    async get(config: DataSource): Promise<unknown> {
        const response = await fetch(urlJoin(API_SERVER_URL, config.url));
        if (!response.ok) {
            throw response;
        }
        return await response.json();
    }


}

export const fetchDsService = new FetchDsService();