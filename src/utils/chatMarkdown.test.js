import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const src = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'chatMarkdown.tsx'),
  'utf8',
);

test('chat markdown renderer supports structured portfolio output', () => {
  assert.match(src, /list-disc/);
  assert.match(src, /font-semibold/);
  assert.match(src, /https\?:/);
  assert.match(src, /\[-\*\u2022\]\\s\+/);
});

test('chat markdown renderer stays safe', () => {
  assert.doesNotMatch(src, /dangerouslySetInnerHTML/);
  assert.doesNotMatch(src, /innerHTML/);
});
