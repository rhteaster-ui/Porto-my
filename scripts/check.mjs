import { access, readFile } from 'node:fs/promises';

const required = [
  'index.html',
  'assets/styles.css',
  'assets/app.js',
  'server.mjs',
  'vercel.json'
];

for (const file of required) {
  await access(file);
}

const html = await readFile('index.html', 'utf8');
const css = await readFile('assets/styles.css', 'utf8');
const js = await readFile('assets/app.js', 'utf8');

const checks = [
  ['profile image', html.includes('https://j.top4top.io/p_376952pby0.png')],
  ['no TODO placeholder', !/TODO|Lorem ipsum|Project One/i.test(`${html}\n${css}\n${js}`)],
  ['reduced motion support', css.includes('prefers-reduced-motion')],
  ['responsive viewport', html.includes('width=device-width')],
  ['social links', html.includes('github.com/rahmat-369') && html.includes('whatsapp.com/channel')],
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  for (const [name] of failed) console.error(`Failed: ${name}`);
  process.exit(1);
}

console.log('All static portfolio checks passed.');
