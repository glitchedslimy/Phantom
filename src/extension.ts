import { ExtensionContext, commands, workspace } from 'vscode';
import { ChangelogWebview } from './webviews/Changelog';
import * as MarkdownIt from 'markdown-it';
import CheckboxPlugin from './markdown-syntax/checkboxes';
import { updateTheme } from './theme/updateTheme';

export async function activate(context: ExtensionContext) {

	commands.registerCommand("phantom.showChangelog", () => {
		new ChangelogWebview().show();
	});

	workspace.onDidChangeTextDocument((e) => {
		if (e.document.languageId === 'markdown') {
			commands.executeCommand('markdown.preview.refresh');
		}
	});
	workspace.onDidOpenTextDocument((e) => {
		if (e.languageId === 'markdown') {
			commands.executeCommand('markdown.preview.refresh');
		}
	});

	workspace.onDidChangeConfiguration((e) => {
		console.log("Detected configuration change");
		if(e.affectsConfiguration('phantom.accentColor')) {
			updateTheme();
		}
	});

	return {
		extendMarkdownIt(md: MarkdownIt) {
			return md.use(CheckboxPlugin);
		}
	};

}

// This method is called when your extension is deactivated
export function deactivate() { }
