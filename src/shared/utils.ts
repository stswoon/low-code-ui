import {nanoid} from "nanoid";

export function jsonPretty(obj: unknown): string {
    return JSON.stringify(obj, null, 2)
}

export function isEven(num: number) {
    return num % 2 === 0;
}

export function getId() {
    return nanoid().replaceAll("_", "");
}