import { semanticTokenColorMapping } from './data/semanticTokens';
import { ThemeConfiguration } from './interfaces/config/themeConfiguration';
import { SemanticTokenColorMapping } from './interfaces/semanticTokens';
import { TokenColor } from './interfaces/tokenColor';
import data from './themeData';
import { assignColorToken } from './utils/assignColorToken';
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

    static async init(config: ThemeConfiguration) {
        const themeInstance = new Theme(config);
        const editorTokens = await this.createEditorTokens();
        themeInstance.colors = editorTokens;
        await themeInstance.applyAccentColor();
        return themeInstance;
    }

    static async createEditorTokens() {
        return (await data.editorThemes["Phantom"]()).default;
    }

    static createTokenColors(config: ThemeConfiguration) {
        let result: TokenColor[] = JSON.parse(JSON.stringify(data.tokenColors.default));

        const colorObj: any = {
            ...data.textColors.classic,
            ...Object.keys(data.textColors.classic).reduce((acc: any, key: any) => {
                if (config[key as keyof ThemeConfiguration]) {
                    acc[key] = config[key as keyof ThemeConfiguration];
                }
                return acc; // Ensure accumulator is returned from reduce callback
            }, {})
        };

        result.forEach((token) => {
            const { foreground } = token.settings;
            if (foreground && foreground in colorObj) {
                token.settings.foreground = colorObj[foreground];
            }
        });

        return {
            semanticTokenColors: Object.keys(semanticTokenColorMapping).reduce((acc: any, tokenType: string) => {
                const colorToken = assignColorToken(tokenType, semanticTokenColorMapping[tokenType as keyof SemanticTokenColorMapping], colorObj);
                if (colorToken && colorObj.hasOwnProperty(colorToken)) {
                    acc[tokenType] = colorToken;
                }
                return acc;
            }, {}),
            tokenColors: result,
        };
    }

    async mergeTheme(baseArray: any[], overrides: any[]): Promise<void> {
        let mergeArray = [...baseArray, ...overrides];
        let uniqueArray = await this.uniqBy(mergeArray, 'scope');
        overrides.forEach((overrideItem) => {
            uniqueArray.forEach((uniqueItem) => {
                if (uniqueItem.scope === overrideItem.scope) {
                    uniqueItem.settings = {
                        ...uniqueItem.settings,
                        ...overrideItem.settings,
                    };
                }
            });
        });
    }

    async uniqBy(arr: any[], fn: any, set = new Set()): Promise<any[]> {
        return arr.filter((el) => ((v) => !set.has(v) && set.add(v))(typeof fn === 'function' ? fn(el) : el[fn]));
    }
}