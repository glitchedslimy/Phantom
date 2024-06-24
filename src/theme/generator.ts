import { workspace } from "vscode";
import { Theme } from "./theme";
import colorObjArr from "./interfaces/colorObjArr";
import themeData from "./themeData";

export const generateTheme = {
    default: async function () {
        return await Theme.init("defaultConfigHere");
    },
    fromSettings: async function (themeName?: string) {
        const configuration = workspace.getConfiguration("phantom");
        const accentColor = configuration.get("accentColor");
        const editorTheme = configuration.get("editorTheme") || "defaultTheme";
        let colorObj = themeData.textColors.classic;

        const buildConfig = {
            editorTheme: editorTheme,
            accentColor: accentColor,
            ...colorObj
        };

        return await Theme.init(buildConfig);
    }
};