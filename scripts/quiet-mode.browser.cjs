// Run against a built local preview, after permission for this browser check.
const { chromium, devices } = require(process.env.PLAYWRIGHT_PACKAGE || 'playwright');
const assert = require('node:assert/strict');
const base = process.env.HISTORIA_PREVIEW || 'http://127.0.0.1:3001';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ ...devices['iPhone 13'], serviceWorkers: 'block' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const audio = () => page.locator('audio');
    const quiet = () => page.getByRole('button', { name: '🔇 Leise', exact: true });
    const subtitle = () => page.locator('[aria-label="Sprecheruntertitel"]');
    async function ready() { await page.waitForFunction(() => !document.querySelector('[aria-label="Lesemodus"] button')?.disabled); }
    async function seek(time) { await audio().evaluate((a,t) => { a.currentTime=t; a.dispatchEvent(new Event('timeupdate')); }, time); await page.waitForTimeout(450); }
    async function noOverflow() { assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)); }
    await page.goto(base+'/'); await ready();
    await quiet().click();
    assert.equal(await audio().evaluate(a=>a.muted), true);
    assert.ok(await subtitle().isVisible());
    assert.equal(await page.getByRole('button', {name:/Langsamer/}).count(), 0);
    assert.ok(await subtitle().evaluate(e=>e.getBoundingClientRect().height/parseFloat(getComputedStyle(e).fontSize))>=11);
    await page.getByRole('button', {name:'Szene 2: Cheops und die Große Pyramide',exact:true}).click();
    await page.getByRole('button', {name:'Abspielen',exact:true}).click();
    await page.waitForFunction(() => document.querySelector('audio').currentTime > .3);
    await page.evaluate(()=>{window.__originalAudio=document.querySelector('audio');});
    assert.equal(await audio().evaluate(a=>a.playbackRate), 1);
    await seek(24);
    assert.equal(await page.locator('video').evaluate(v=>v.playbackRate), 1);
    const times = await page.evaluate(()=>({a:document.querySelector('audio').currentTime,v:document.querySelector('video').currentTime,d:document.querySelector('video').duration}));
    assert.ok(Math.abs(times.v - ((times.a-6)%times.d)) < .6,JSON.stringify(times));
    await page.getByRole('button',{name:'Pause',exact:true}).click();
    const pausedTime = await audio().evaluate(a=>a.currentTime);
    const pausedText = await subtitle().innerText();
    await page.waitForTimeout(600);
    assert.ok(Math.abs(await audio().evaluate(a=>a.currentTime)-pausedTime)<.05);
    assert.equal(await subtitle().innerText(),pausedText);
    await page.getByRole('button',{name:'10 Sekunden zurückspulen',exact:true}).click();
    assert.ok(await audio().evaluate(a=>a.currentTime)<15);
    assert.notEqual(await subtitle().innerText(),pausedText);
    await noOverflow();
    await page.locator('[aria-label="Lesemodus"]').scrollIntoViewIfNeeded();
    await page.screenshot({path:'/tmp/historia-quiet-iphone.png',fullPage:true});
    await page.getByRole('button',{name:'Weiter',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('audio').currentTime>.2&&!document.querySelector('audio').paused);
    assert.ok(await page.evaluate(()=>window.__originalAudio===document.querySelector('audio')));
    assert.equal(await audio().evaluate(a=>a.muted),true);
    assert.equal(await audio().evaluate(a=>a.playbackRate),1);
    await quiet().click();
    assert.equal(await audio().evaluate(a=>a.muted),false);
    assert.equal(await audio().evaluate(a=>a.paused),false);
    assert.equal(await audio().evaluate(a=>a.playbackRate),1);
    await quiet().click(); await page.reload(); await ready();
    assert.equal(await quiet().getAttribute('aria-pressed'),'true');
    assert.equal(await audio().evaluate(a=>a.playbackRate),1);
    for(const route of ['/episode-2/','/episode-3/']) {
      await page.goto(base+route); await ready();
      assert.equal(await audio().evaluate(a=>a.muted),true);
      await page.getByRole('button',{name:'Abspielen',exact:true}).click();
      await page.waitForFunction(()=>document.querySelector('audio').currentTime>.2);
      await seek(20); assert.ok((await subtitle().innerText()).length>0); await noOverflow();
    }
    await page.getByRole('button',{name:'Szene 14: Kalter Krieg und Berliner Luftbrücke',exact:true}).click();
    await page.getByRole('button',{name:'Abspielen',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('audio').currentTime>.2);
    await seek(20);
    assert.equal(await page.locator('video').evaluate(v=>v.paused),true);
    await page.getByRole('button',{name:'Pause',exact:true}).click();
    await page.getByRole('button',{name:'10 Sekunden zurückspulen',exact:true}).click();
    await page.getByRole('button',{name:'Abspielen',exact:true}).click();
    await page.waitForTimeout(400);
    assert.equal(await page.locator('video').evaluate(v=>v.paused),false);
    await page.setViewportSize({width:844,height:390}); await noOverflow();
    await page.screenshot({path:'/tmp/historia-quiet-landscape.png',fullPage:true});
    await page.setViewportSize({width:1920,height:1080}); await noOverflow();
    assert.ok(await subtitle().evaluate(e=>parseFloat(getComputedStyle(e).fontSize))>=30);
    await page.screenshot({path:'/tmp/historia-quiet-beamer.png',fullPage:true});
    assert.deepEqual(errors,[]);
    const blocked = await browser.newContext({...devices['iPhone 13'],serviceWorkers:'block'});
    await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage disabled');}});});
    const fallback=await blocked.newPage(); await fallback.goto(base+'/');
    await fallback.waitForFunction(()=>!document.querySelector('[aria-label="Lesemodus"] button')?.disabled);
    await fallback.getByRole('button',{name:'🔇 Leise',exact:true}).click();
    assert.equal(await fallback.locator('audio').evaluate(a=>a.muted),true);
    console.log('PASS: iPhone viewport, quiet persistence across episodes/reload, same audio node on Weiter, normal-speed audio/video sync, pause, rewind, video hold/restart, subtitles, landscape, beamer, blocked storage, no JS errors.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1;});
