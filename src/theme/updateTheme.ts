import { join } from "path";
import { Uri, workspace } from "vscode";
import { ThemeGenerator } from "./generator";
import { promptReload } from "./utils/prompt-reload";

export async function updateTheme() {
    const writeTheme = async (fileName: string) => {
        const themeGenerator = new ThemeGenerator();
        const THEME_PATH = Uri.file(join(__dirname, '../', 'themes', fileName));
        const theme = await themeGenerator.fromSettings();
        try {
            return workspace.fs.writeFile(
                THEME_PATH,
                new TextEncoder().encode(JSON.stringify(theme, null, 2))
            );
        } catch (e) {
            console.error(e);
            throw e;
        }
    };
    try {
        await Promise.all([
            writeTheme('Phantom.json')
        ]);
    } catch (e) {
        console.error("Failed to write the theme: " + e);
    }

    promptReload();
}