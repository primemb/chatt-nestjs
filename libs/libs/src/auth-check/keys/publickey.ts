import { resolve, join } from 'path';
import * as fs from 'fs';

export const publicKey = fs.readFileSync(
  join(resolve(), 'libs', 'libs', 'src', 'auth-check', 'keys', 'public.key'),
  'utf8',
);
