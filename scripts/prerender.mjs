import { build } from 'vite';
import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Produce real HTML at build time; the deployed site needs only a static file server.
const temporary = resolve('.prerender');
try {
  await build({
    logLevel: 'warn',
    build: {
      ssr: 'src/prerender.tsx',
      outDir: temporary,
      emptyOutDir: true,
      copyPublicDir: false,
      minify: false,
    },
  });
  const { render } = await import(pathToFileURL(resolve(temporary, 'prerender.js')).href);
  const template = await readFile('dist/index.html', 'utf8');
  if (!template.includes('<div id="root"></div>')) throw new Error('Missing prerender root');
  for (const language of ['fr', 'en']) {
    const { body, head, notFound } = await render(language);
    const folder = language === 'en' ? 'dist/en' : 'dist';
    await mkdir(folder, { recursive: true });
    const html = template
      .replace('<html lang="fr">', `<html lang="${language}">`)
      .replace(/<!--localized-head:start-->[\s\S]*?<!--localized-head:end-->/, head)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    await writeFile(`${folder}/index.html`, html);
    const home = language === 'en' ? '/en/' : '/';
    const escape = (value) =>
      value.replace(
        /[&<>"']/g,
        (character) =>
          ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
      );
    await writeFile(
      `${folder}/404.html`,
      `<!doctype html><html lang="${language}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escape(notFound.title)}</title></head><body style="font-family:Arial,sans-serif;max-width:640px;margin:15vh auto;padding:24px;color:#202b33"><h1>${escape(notFound.heading)}</h1><p>${escape(notFound.description)}</p><a href="${home}">${escape(notFound.link)}</a></body></html>`,
    );
  }
  console.log(
    'HTML prérendu en français dans dist/index.html et en anglais dans dist/en/index.html.',
  );
} finally {
  await rm(temporary, { recursive: true, force: true });
}
