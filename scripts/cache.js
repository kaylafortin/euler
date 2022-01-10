import { getNumArg, getLogFilePath } from './utils.js';
import { CACHE_DIR } from './constants.js';
import fs from 'fs';

try {
    const num = getNumArg();
    // if number arg provided only remove that cache file
    if (num) {
        const logPath = getLogFilePath(num);
        if (fs.existsSync(logPath)) fs.unlinkSync(logPath);
    } else fs.rmdirSync(CACHE_DIR, { recursive: true, force: true });

} catch (e) {
    console.log('ERROR!')
    console.log(e)
}
