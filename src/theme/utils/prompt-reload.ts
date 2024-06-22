import { commands, window } from "vscode";

export function promptReload() {
    const action = 'Reload';
    const msg = {
        en: {
            reload: 'Please reload to apply the theme configuration changes.'
        }
    }
    const config = JSON.parse(process.env.VSCODE_NLS_CONFIG || '{}');
    const locale = config.locale || 'en';
    let msgReload = msg.en.reload;

    switch (locale) {
        case 'en':
            msgReload = msg.en.reload;
            break;
    }

    window.showInformationMessage(msgReload, action).then((selectedAction) => {
        if(selectedAction === action) {
            commands.executeCommand('workbench.action.reloadWindow');
        }
    });
}