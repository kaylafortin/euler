import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);

export const SCRIPTS_DIR = path.dirname(__filename);
export const ROOT_DIR = path.join(SCRIPTS_DIR, '..');
export const SOLUTIONS_DIR = path.join(ROOT_DIR, '/solutions');
export const CACHE_DIR = path.join(ROOT_DIR, '/cache');

export const NEW_LINE = '\n'
export const TABLE_DELIMINATOR = ' | '
export const MS = 'ms';
export const AVERAGE = 'average'

export const timeRegex = /(?<=time.*:\s*)(\S\d*\w*.*)/g;