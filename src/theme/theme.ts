import { ThemeConfiguration } from '../interfaces/themeConfiguration';
import { TokenColor } from './interfaces/tokenColor';
import data from './themeData';
import { chooseTextColor, lightenColor } from './utils/luminance';

export class Theme {
    name = 'Phantom';
    type = 'dark';
    semanticHighlighting = true;
    semanticTokenColors: any;
    tokenColors: any;
    accentColor: string;
    colors: any;

    constructor(configuration: ThemeConfiguration) {
        const themeTokens = Theme.createTokenColors(configuration);
        this.semanticTokenColors = themeTokens.semanticTokenColors;
        this.tokenColors = themeTokens.tokenColors;
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
            'button.foreground': await chooseTextColor(this.accentColor),
            "tab.activeBorder": this.accentColor,
            "activityBarBadge.background": this.accentColor,
            "textLink.foreground": this.accentColor,
            "textLink.activeForeground": await lightenColor(this.accentColor, 15),
            "editor.findMatchBackground": this.accentColor + "B3",
            "editor.findMatchBorder": this.accentColor,
            "statusBar.debuggingBackground": this.accentColor,
            "statusBar.debuggingForeground": await chooseTextColor(this.accentColor),
            "statusBarItem.remoteBackground": this.accentColor,
            "statusBarItem.remoteForeground": await chooseTextColor(this.accentColor),
            "statusBarItem.remoteHoverForeground": await chooseTextColor(this.accentColor),
            "statusBarItem.remoteHoverBackground": this.accentColor,
            "activityBar.activeBorder": this.accentColor,
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

    static createTokenColors(config: any) {
        let result: TokenColor[] = JSON.parse(
            JSON.stringify(data.tokenColors.default)
        );

        let colorObj: any = data.textColors.classic;
        for (let key in colorObj) {
            if (config[key]) {
                colorObj[key] = config[key];
            }
        }

        result.forEach((token) => {
            if (token.settings.foreground) {
                if (token.settings.foreground in colorObj) {
                    token.settings.foreground = colorObj[token.settings.foreground];
                }
            }
        });

        return {
            semanticTokenColors: {
                enumMember: {
                    foreground: colorObj.fountainBlue,
                },
                'variable.constant': {
                    foreground: colorObj.whiskey,
                },
                'variable.defaultLibrary': {
                    foreground: colorObj.chalky,
                },
                'variable:dart': {
                    foreground: colorObj.whiskey,
                },
                'property:dart': {
                    foreground: colorObj.whiskey,
                },
                'annotation:dart': {
                    foreground: colorObj.whiskey,
                },
                'parameter.label:dart': {
                    foreground: colorObj.lightWhite,
                },
                macro: {
                    foreground: colorObj.whiskey,
                },
                tomlArrayKey: {
                    foreground: colorObj.chalky,
                },
                "memberOperatorOverload": {
                    foreground: colorObj.purple,
                }
            },
            tokenColors: result,
        };
    }

    async mergeTheme(baseArray: any[], overrides: any[]) {
        let mergeArray = [...baseArray, ...overrides];
        let newArr = await this.uniqBy(mergeArray, 'scope');
        overrides.forEach((item) => {
            newArr.forEach((cell) => {
                if (cell.scope === item.scope) {
                    cell.settings = {
                        ...cell.settings,
                        ...item.settings,
                    };
                }
            });
        });
    }

    async uniqBy(arr: any[], fn: any, set = new Set()): Promise<any[]> {
        return arr.filter((el) => ((v) => !set.has(v) && set.add(v))(typeof fn === 'function' ? fn(el) : el[fn]));
    }
}