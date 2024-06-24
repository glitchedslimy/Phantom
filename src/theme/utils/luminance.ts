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

export async function lightenColor(hex: string, percent: number): Promise<string> {
    const num = parseInt(hex.replace("#", ""), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt,
        newHex = '#' + (0x1000000 + (R < 255 ? R : 255) * 0x10000 + (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255)).toString(16).slice(1);

    return newHex;
}