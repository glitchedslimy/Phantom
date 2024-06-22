import { promises as fs } from 'fs'
import { join } from 'path';
import { Theme } from '../src/theme/theme';

export function writeFile(path: string, data: unknown): Promise<void> {
    return fs.writeFile(path, JSON.stringify(data, null, 2));
}

async function main() {
    console.log(await Theme.init("defaultConfigHere"));
    writeFile(
        join(__dirname, '..', 'themes', 'Phantom.json'),
        await Theme.init("defaultConfigHere")
    );
}

main();