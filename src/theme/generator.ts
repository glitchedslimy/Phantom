import { workspace } from "vscode";
import { Theme } from "./theme";

export const generateTheme = {
    default: async function () {
        return await Theme.init("defaultConfigHere");
    },
    fromSettings: async function (themeName?: string) {
        const configuration = workspace.getConfiguration("phantom");
        const accentColor = configuration.get("accentColor");
        const editorTheme = configuration.get("editorTheme") || "defaultTheme";

        const buildConfig = {
            editorTheme: editorTheme,
            accentColor: accentColor
        };

        return await Theme.init(buildConfig);
    }
};