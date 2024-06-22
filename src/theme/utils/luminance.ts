async function getLuminance(color: string): Promise<number> {
    const rgb = color.startsWith("#") ? parseInt(color.slice(1), 16) : parseInt(color, 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    return luminance;
}

export async function chooseTextColor(backgroundColor: string): Promise<string> {
    const luminance = await getLuminance(backgroundColor);
    console.log("Luminance of the color: " + luminance);
    return luminance > 0.5 ? "#000000" : "#ffffff";
}