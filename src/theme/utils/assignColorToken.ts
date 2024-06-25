export function assignColorToken(tokenType: string, defaultColor: string, colorObj: any): { foreground: string} {
    return { foreground: colorObj[tokenType] ?? defaultColor};
}