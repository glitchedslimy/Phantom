import { Renderer } from "@ts-stack/markdown";

export class PhantomRender extends Renderer {
    override heading(text: string, level: number, raw: string): string {
        const regexp = /\s*{([^}]+)}$/;
        const execArr = regexp.exec(text);
        let id: string;

        if(execArr) {
            text = text.replace(regexp, '');
            id = execArr[1];
          } else {
            id = text.toLocaleLowerCase().replace(/[^\wа-яіїє]+/gi, '-');
          }

          return `<h${level} id="${id}" style="color: blue;">${text}</h${level}>`;
    }
}