import { ThemeConfiguration } from '../interfaces/themeConfiguration';
import data from './themeData';
import { chooseTextColor } from './utils/luminance';

export class Theme {
    name = 'Phantom';
    type = 'dark';
    accentColor: string;
    colors: any;

    constructor(configuration: ThemeConfiguration) {
        this.name = this.name;
        this.type = this.type;
        this.accentColor = configuration.accentColor! || '#ffcc00';
        this.colors = {};
    }

    async applyAccentColor() {
        console.log(await chooseTextColor(this.accentColor));
        this.colors = {
            ...this.colors,
            'button.background': this.accentColor,
            'button.foreground': await chooseTextColor(this.accentColor)
        };
    }

    static async init(config: any) {
        const themeInstance = new Theme(config);
        const editorTokens = await this.createEditorTokens(config);
        themeInstance.colors = editorTokens;
        await themeInstance.applyAccentColor();
        console.log(themeInstance);
        return themeInstance;
    }

    static async createEditorTokens(config: ThemeConfiguration) {

        return config.editorTheme! in data.editorThemes ? (await data.editorThemes["Phantom"]()).default
            : (await data.editorThemes['Phantom']()).default;
    }
}