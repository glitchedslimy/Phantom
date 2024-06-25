import { workspace } from "vscode";
import { Theme } from "./theme";
import themeData from "./themeData";
import { defaultConfig } from "./interfaces/config/defaultConfig";
export class ThemeGenerator {
    private configuration = workspace.getConfiguration("phantom");
    private themeData = themeData;

    defaultTheme() {
        return Theme.init(defaultConfig);
    }

    fromSettings() {
        const accentColor: string | undefined = this.configuration.get<string>("accentColor") ?? defaultConfig.accentColor;
        const editorTheme: {} | undefined = this.configuration.get<{}>("editorTheme") ?? defaultConfig.editorTheme;
        let colorObj = this.themeData.textColors.classic;
        return Theme.init({
            editorTheme,
            accentColor,
            ...colorObj
        });
    }
}