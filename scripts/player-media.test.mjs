import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
const source = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');
function worker(fetchResult, cached) {
  const handlers = {}; const writes = [];
  vm.runInNewContext(source, {
    self: { addEventListener: (name, callback) => { handlers[name] = callback; } },
    caches: { open: async () => ({ put: (...args) => writes.push(args) }), match: async key => key === '/' ? new Response('<html>Home</html>') : cached },
    fetch: async () => { if (fetchResult instanceof Error) throw fetchResult; return fetchResult; }, Response,
  });
  return { writes, async request(mode) { let response; handlers.fetch({ request: { method: 'GET', mode }, respondWith: value => { response = value; } }); return await response; } };
}
test('Successful media responses are cached', async () => {
  const w = worker(new Response('image', { status: 200 }));
  assert.equal((await w.request('no-cors')).status, 200);
  assert.equal(w.writes.length, 1);
});
test('Failed media responses do not poison the cache', async () => {
  const w = worker(new Response('missing', { status: 404 }));
  assert.equal((await w.request('no-cors')).status, 404);
  assert.equal(w.writes.length, 0);
});
test('Offline images never receive HTML as fallback', async () => {
  const w = worker(new Error('offline'));
  assert.equal((await w.request('no-cors')).type, 'error');
  assert.match(await (await w.request('navigate')).text(), /Home/);
});
test('Previously cached images remain available offline', async () => {
  const w = worker(new Error('offline'), new Response('cached image'));
  assert.equal(await (await w.request('no-cors')).text(), 'cached image');
});
