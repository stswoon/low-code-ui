export function jsonPretty(obj: unknown): string {
    return JSON.stringify(obj, null, 2)
}

