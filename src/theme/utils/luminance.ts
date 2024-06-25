export async function getLuminance(color: string): Promise<number> {
    const { r, g, b } = hexToRgb(color);
    return calculateLuminance({r, g, b});
}

export async function chooseTextColor(backgroundColor: string): Promise<string> {
    const luminance = await getLuminance(backgroundColor);
    return luminance > 0.5 ? "#000000" : "#ffffff";
}

export async function lightenColor(hex: string, percent: number): Promise<string> { 
    const { r, g, b } = hexToRgb(hex);
    const amt = Math.round(2.55 * percent);
    const newR = Math.min(255, r + amt);
    const newG = Math.min(255, g + amt);
    const newB = Math.min(255, b + amt);
    const newHex = `#${(0x1000000 + newR * 0x10000 + newG * 0x100 + newB).toString(16).slice(1)}`;
    return newHex;
}


function hexToRgb(hex: string): {r: number, g: number, b: number} {
    const rgb = parseInt(hex.startsWith("#") ? hex.slice(1) : hex, 16);
    return {
        r: (rgb >> 16) & 0xff,
        g: (rgb >> 8) & 0xff,
        b: rgb & 0xff
    };
}

function calculateLuminance({r, g, b}: {r: number, g: number, b: number}): number {
    return (0.2126 * (r  / 255)) + (0.7152 * (g / 255)) + (0.0722 * (b / 255));
}