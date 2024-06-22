import MarkdownIt, { Token, Token as TokenType } from "markdown-it";
let Token: any;
import("markdown-it/lib/token.mjs").then((module) => {
    Token = module.default;
});

interface Options {
    disabled?: boolean;
    divWrap?: boolean;
    divClass?: string;
    idPrefix?: string;
    ulClass?: string;
    liClass?: string;
}

export default function (md: MarkdownIt, options: Options) {
    const defaults: Options = {
        disabled: false,
        divWrap: false,
        divClass: "checkbox",
        idPrefix: "cbx_",
        ulClass: "task-list",
        liClass: "task-list-item"
    };

    options = Object.assign({}, defaults, options);
    md.core.ruler.after('inline', 'github-task-lists', (state) => {
        const tokens = state.tokens;
        let lastId = 0;
        for(let i = 2; i < tokens.length; i++) {
            if(isTodoItem(tokens, i)) {
                todoify(tokens[i], lastId, options, state.Token);
                lastId += 1;
                attrSet(tokens[i-2], 'class', options.liClass!);
                attrSet(tokens[parentToken(tokens, i-2)], 'class', options.ulClass!);
            }
        }
    });
}

function isTodoItem(tokens: TokenType[], index: number) {
    return isInline(tokens[index]) 
    && isParagraph(tokens[index - 1])
    && isListItem(tokens[index - 2])
    && startsWithTodoMarkdown(tokens[index]);
}

function isInline(token: TokenType) {
    return token.type === 'inline';
}

function isParagraph(token: TokenType) {
    return token.type === 'paragraph_open';
}

function isListItem(token: TokenType) {
    return token.type === 'list_item_open';
}

function startsWithTodoMarkdown(token: TokenType) {
    return /^\[[xX \u00A0]\][ \u00A0]/.test(token.content);
}

function todoify(token: TokenType, lastId: number, options: Options, TokenConstructor: typeof Token) {
    let id;
    id = options.idPrefix! + lastId;
    token.children![0].content = token.children![0].content.slice(3);
    token.children!.unshift(beginLabel(id, TokenConstructor));
    token.children!.push(endLabel(TokenConstructor));
    token.children!.unshift(makeCheckbox(token, id, options, TokenConstructor));
    if(options.divWrap) {
        token.children!.unshift(beginWrap(options, TokenConstructor));
        token.children!.push(endWrap(TokenConstructor));
    }
}

function beginLabel(id: string, TokenConstructor: typeof Token) {
    let label = new TokenConstructor('label_open', 'label', 1);
	label.attrs = [["for", id]];
	return label;
}

function endLabel(TokenConstructor: typeof Token) {
    return new TokenConstructor("label_close", "label", -1);
}

function makeCheckbox(token: TokenType, id: string, options: Options, TokenConstructor: typeof Token) {
    let checkbox = new TokenConstructor('checkbox_input', 'input', 0);
    checkbox.attrs = [["type", "checkbox"], ["id", id]];
    let checked = /^\[[xX]\][ \u00A0]/.test(token.content);
    if(checked) {
        checkbox.attrs.push(["checked", "true"]);
    }
    if(options.disabled) {
        checkbox.attrs.push(["disabled", "true"]);
    }

    return checkbox;
}

function beginWrap(options: Options, TokenConstructor: typeof Token) {
    let token = new TokenConstructor('checkbox_open', 'div', 0);
    token.attrs = [["class", options.divClass]];
    return token;
}

function endWrap(TokenConstructor: typeof Token) {
    return new TokenConstructor('checkbox_close', 'div', -1);
}

function attrSet(token: TokenType, name: string, value: string) {
    let index = token.attrIndex(name);
    let attr = [name, value];

    if(index < 0) {
        token.attrPush(attr as [string, string]);
    } else {
        token.attrs![index] = attr as [string, string];
    }
}

function parentToken(tokens: Token[], index: number) {
    let targetLevel = tokens[index].level - 1;
    for (let i = index; i >= 0; i--) {
        if(tokens[i].level === targetLevel) {
            return i;
        }
    }
    return -1;
}