import { resolve, join } from 'path';
import * as fs from 'fs';

export const privateKey = fs.readFileSync(
  join(resolve(), 'libs', 'libs', 'src', 'auth-check', 'keys', 'private.key'),
  'utf8',
);
