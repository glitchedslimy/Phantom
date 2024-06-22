import { join } from "path";
import { Uri, workspace } from "vscode";
import { generateTheme } from "./generator";
import { promptReload } from "./utils/prompt-reload";

export async function updateTheme() {
    const writeTheme = async (fileName: string, themeName?: string) => {
        const THEME_PATH = Uri.file(join(__dirname, '../', 'themes', fileName));
        console.log(THEME_PATH);
        const theme = await generateTheme.fromSettings(themeName);
        try {
            
            return workspace.fs.writeFile(
                THEME_PATH,
                new TextEncoder().encode(JSON.stringify(theme, null, 2))
            );
        } catch(e) {
            console.error(e);
        }
    };
        let promiseArr = [];
        promiseArr = [
            writeTheme('Phantom.json'),
        ];
        await Promise.all(promiseArr);

        // promptReload();
}