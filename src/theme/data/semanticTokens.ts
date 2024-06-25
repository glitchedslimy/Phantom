import { SemanticTokenColorMapping } from '../interfaces/semanticTokens';
import data from '../themeData';

export const semanticTokenColorMapping: SemanticTokenColorMapping = {
    enumMember: data.textColors.classic.fountainBlue,
    'variable.constant': data.textColors.classic.whiskey,
    'variable.defaultLibrary': data.textColors.classic.chalky,
    'variable:dart': data.textColors.classic.whiskey,
    'property:dart': data.textColors.classic.whiskey,
    'annotation:dart': data.textColors.classic.whiskey,
    'parameter.label:dart': data.textColors.classic.lightWhite,
    macro: data.textColors.classic.whiskey,
    tomlArrayKey: data.textColors.classic.chalky,
    "memberOperatorOverload": data.textColors.classic.purple
};