const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const fs = require('node:fs'),
  assert = require('node:assert/strict');
const base = process.env.HISTORIA_PREVIEW || 'http://127.0.0.1:3015';
(async () => {
  const { loadTS } = await import('./load-scenes.mjs');
  const { learningPaths: paths } = await loadTS('../app/data/learningPath.ts');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      serviceWorkers: 'block',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    const click = async (name) =>
      page
        .getByRole('button', { name, exact: typeof name === 'string' })
        .click();
    const noOverflow = async () =>
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        'overflow ' + page.url(),
      );
    const running = async () =>
      page.waitForFunction(
        () => {
          let a = document.querySelector('audio');
          return a && !a.paused && a.currentTime > 0.05;
        },
        null,
        { timeout: 20000 },
      );
    await page.goto(base);
    await page.getByRole('link', { name: /Historia im Unterricht/ }).waitFor();
    await page.screenshot({ path: '/tmp/historia-start.png', fullPage: true });
    await page.evaluate(() => {
      localStorage.setItem('historia-episode1-challenge-best-v2', '7');
      localStorage.setItem('historia-quiet', 'true');
    });
    await page.goto(base + '/lernpfade/');
    await page.screenshot({
      path: '/tmp/historia-overview.png',
      fullPage: true,
    });
    for (const [pi, p] of paths.entries()) {
      await page.goto(base + p.href);
      await click('Zu den Stationen →');
      await running();
      assert.equal(await page.locator('audio').evaluate((a) => a.muted), true);
      assert.equal(
        await page.locator('audio').evaluate((a) => a.playbackRate),
        1,
      );
      await page.evaluate(
        () => (window.__audio = document.querySelector('audio')),
      );
      for (const [si, s] of p.stations.entries()) {
        for (let j = 0; j < s.scenes.length; j++) {
          if (j > 0) {
            await click(/Nächste Szene/);
            await running();
          }
          assert.equal(
            await page
              .locator('audio')
              .evaluate((a) => new URL(a.src).pathname),
            s.scenes[j].audio,
          );
          assert.ok(
            await page.locator('[aria-label="Sprecheruntertitel"]').isVisible(),
          );
          if (si === 0 && j === 0) {
            await page.setViewportSize({ width: 390, height: 844 });
            await noOverflow();
            await page.screenshot({
              path: `/tmp/historia-${p.id}-mobile.png`,
              fullPage: true,
            });
            await page.setViewportSize({ width: 1440, height: 1000 });
          }
        }
        await click(/Zum Stations-Check/);
        assert.equal(
          await page.locator('audio').evaluate((a) => a.paused),
          true,
        );
        for (let q = 0; q < 2; q++) {
          const choice =
            si === 0
              ? (s.quizzes[q].correctAnswer + 1) % 3
              : s.quizzes[q].correctAnswer;
          await page.locator('.lp-answers button').nth(choice).click();
          assert.ok(await page.locator('.lp-feedback').isVisible());
          await click(q === 0 ? 'Nächste Frage →' : 'Station abschließen');
        }
        assert.equal(
          await page.locator('audio').evaluate((a) => a.paused),
          true,
        );
        if (si < 4) {
          await click('Zur nächsten offenen Station →');
          await running();
          assert.ok(
            await page.evaluate(
              () => window.__audio === document.querySelector('audio'),
            ),
          );
        }
      }
      await click('Weiter zur Denkaufgabe →');
      assert.ok(await page.locator('#denkaufgabe').isVisible());
      await page.reload();
      const saved = await page.evaluate(
        (k) => JSON.parse(localStorage.getItem(k)),
        p.key,
      );
      assert.deepEqual(saved.scores, [0, 2, 2, 2, 2]);
      await click('Urkunde ansehen');
      await page
        .getByLabel('Dein Name (freiwillig)')
        .fill('Éléonore Müller-Łukasz Groß-Österreich');
      await page.getByRole('link', { name: 'PDF öffnen / sichern' }).waitFor();
      const bytes = await page
        .getByRole('link', { name: 'PDF öffnen / sichern' })
        .evaluate(async (a) =>
          Array.from(new Uint8Array(await (await fetch(a.href)).arrayBuffer())),
        );
      fs.writeFileSync(`/tmp/historia-${p.id}.pdf`, Buffer.from(bytes));
      await page.screenshot({
        path: `/tmp/historia-${p.id}-certificate.png`,
        fullPage: true,
      });
      await click('Zum Lernpass');
      await page.getByLabel('Alle Stationen frei wählen').check();
      await page.locator('.lp-stations button').first().click();
      await running();
      for (let j = 1; j < p.stations[0].scenes.length; j++)
        await click(/Nächste Szene/);
      await click(/Zum Stations-Check/);
      for (let q = 0; q < 2; q++) {
        await page
          .locator('.lp-answers button')
          .nth(p.stations[0].quizzes[q].correctAnswer)
          .click();
        await click(q === 0 ? 'Nächste Frage →' : 'Station abschließen');
      }
      assert.equal(
        await page.evaluate(
          (k) => JSON.parse(localStorage.getItem(k)).scores[0],
          p.key,
        ),
        2,
      );
      await click('← Zum Lernpass');
      await click('Lernpass zurücksetzen');
      await click('Abbrechen');
      assert.equal(
        await page.evaluate(
          (k) => JSON.parse(localStorage.getItem(k)).scores[0],
          p.key,
        ),
        2,
      );
      console.log(
        'PASS',
        p.id,
        'all stations, silence, persistence, retry, certificate',
      );
    }
    // Independent reset, other passes and old values survive.
    await click('Lernpass zurücksetzen');
    await click('Ja, Lernpass zurücksetzen');
    assert.equal(
      await page.evaluate(
        () =>
          JSON.parse(localStorage.getItem('historia-lernpfad-antike-v1'))
            .scores[0],
      ),
      2,
    );
    assert.equal(
      await page.evaluate(() =>
        localStorage.getItem('historia-episode1-challenge-best-v2'),
      ),
      '7',
    );
    await page.goto(base + '/lernpfade/');
    await page.setViewportSize({ width: 390, height: 844 });
    await noOverflow();
    await page.screenshot({
      path: '/tmp/historia-overview-mobile.png',
      fullPage: true,
    });
    await page.goto(base + '/lernpfad-antike/');
    await click(/Noch einmal entdecken/);
    await running();
    await click(/Ton: aus/);
    assert.equal(await page.locator('audio').evaluate((a) => a.muted), false);
    await click(/Nächste Szene/);
    await running();
    assert.equal(await page.locator('audio').evaluate((a) => a.muted), false);
    await page.goto(base + '/episode-2/?scene=9');
    await page
      .getByRole('heading', { name: 'Mehmed II. erobert Konstantinopel' })
      .waitFor();
    for (const url of [
      '/entdecken/',
      '/episode-3/',
      '/episode-1/challenge/',
      '/episode-2/challenge/',
      '/episode-3/challenge/',
      '/hyper-challenge/',
    ]) {
      await page.goto(base + url);
      await noOverflow();
      assert.ok((await page.locator('body').innerText()).length > 100);
    }
    const blocked = await browser.newContext({ serviceWorkers: 'block' });
    await blocked.addInitScript(() => {
      Storage.prototype.getItem = Storage.prototype.setItem = () => {
        throw Error('blocked');
      };
    });
    const b = await blocked.newPage();
    await b.goto(base + '/lernpfad-antike/');
    await b.getByRole('button', { name: 'Zu den Stationen →' }).click();
    await b.getByRole('button', { name: /Nächste Szene/ }).click();
    await b.getByRole('button', { name: /Zum Stations-Check/ }).click();
    assert.ok(await b.locator('.lp-quiz').isVisible());
    await blocked.close();
    assert.deepEqual(errors, []);
    console.log(
      'PASS layouts, unmuted autoplay, independent reset, original routes, blocked storage, no JS errors',
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
