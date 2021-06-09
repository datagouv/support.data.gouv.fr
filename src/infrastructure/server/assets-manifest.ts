import * as fs from 'fs';
import * as path from 'path';

export let manifest: {
  'main.js': string;
  'main.css': string;
};

if (process.env.NODE_ENV !== 'development') {
  manifest = JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), 'public', 'dist', 'manifest.json'),
      'utf-8'
    )
  );
} else {
  manifest = {
    'main.js': 'main.js',
    'main.css': 'main.css',
  };
}
