import { Uri, workspace } from "vscode";
import { WebViewController } from "./Webview";
import path from "path";
import { Marked } from "@ts-stack/markdown";
import { PhantomRender } from "./markdown/renderer";

export class ChangelogWebview extends WebViewController {
    get id(): string {
        return 'phantom.Changelog';
    }

    get title(): string {
        return 'Phantom Theme Changelog';
    }

    get content(): Promise<string> {
        const changelogPath = Uri.file(
          path.join(__dirname, '../', 'CHANGELOG.md')
        );
    
        return new Promise(async (resolve) => {
          const content = workspace.fs.readFile(changelogPath).then((data) => {
            return new TextDecoder().decode(data);
          });

          Marked.setOptions({ renderer: new PhantomRender});

          resolve(Marked.parse(await content));
        });
      }
}