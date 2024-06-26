import { promises as fs } from 'fs';
import { join } from 'path';
import { Theme } from '../src/theme/theme';
import { defaultConfig } from '../src/theme/interfaces/config/defaultConfig';

export function writeFile(path: string, data: unknown): Promise<void> {
    return fs.writeFile(path, JSON.stringify(data, null, 2));
}

async function main() {
    writeFile(
        join(__dirname, '..', 'themes', 'Phantom.json'),
        await Theme.init(defaultConfig)
    );
}

main();