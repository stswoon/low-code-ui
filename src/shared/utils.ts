export function jsonPretty(obj: unknown): string {
    return JSON.stringify(obj, null, 2)
}

export function isEven(num: number) {
    return num % 2 === 0;
}