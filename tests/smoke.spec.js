import {expect, test} from '@playwright/test';

const routes = [
  '/#/',
  '/#/projekty',
  '/#/projekty/pcsk225',
  '/#/projekty/lokalizacja',
  '/#/projekty/sn74138',
  '/#/projekty/kicad-7seg',
  '/#/projekty/perfect-circuit-builder',
  '/#/warsztat',
  '/#/kontakt'
];

const ownerEmail = 'szysebastian@gmail.com';

async function attachConsoleGuards(page) {
  const pageErrors = [];
  const badResponses = [];

  page.on('pageerror', error => pageErrors.push(String(error)));
  page.on('response', response => {
    const status = response.status();
    if (status < 400) return;
    const url = response.url();
    if (url.startsWith('http://127.0.0.1:4173/')) badResponses.push(`${status} ${url}`);
  });

  return {pageErrors, badResponses};
}

test('desktop smoke: routes, reload, mailto, overflow, assets and screenshots', async ({page}, testInfo) => {
  const {pageErrors, badResponses} = await attachConsoleGuards(page);

  for (const route of routes) {
    await page.goto(route);
    await page.reload();
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveURL(new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }

  await page.goto('/#/kontakt');
  await expect(page.locator('.contact .mailto')).toHaveAttribute('href', `mailto:${ownerEmail}`);

  await page.goto('/#/projekty');
  await expect(page.locator('.accordion-gallery')).toBeVisible();
  await expect(page.getByRole('link', {name: /Otwórz stronę projektu/i}).first()).toBeVisible();

  await page.goto('/#/');
  await expect(page.locator('.hero__warp, .hero__fallback')).toBeVisible();
  await page.screenshot({path: testInfo.outputPath('desktop-home.png'), fullPage: true});

  expect(pageErrors, `Błędy JS: ${pageErrors.join('\n')}`).toEqual([]);
  expect(badResponses, `Błędne odpowiedzi: ${badResponses.join('\n')}`).toEqual([]);
});

test('mobile smoke: nav, gallery touch/click, animation state and no overflow', async ({page}, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'Ten test dotyczy wyłącznie wariantu mobilnego.');
  const {pageErrors, badResponses} = await attachConsoleGuards(page);

  await page.goto('/#/');
  const navProjects = page.getByRole('navigation').getByRole('link', {name: 'Projekty'});
  await expect(navProjects).toBeVisible();
  await navProjects.click();
  await expect(page).toHaveURL(/#\/projekty$/);

  const thirdPanel = page.locator('.ag-panel').nth(2);
  await thirdPanel.click();
  await expect(page).toHaveURL(/#\/projekty$/);
  await thirdPanel.click();
  await expect(page).toHaveURL(/#\/projekty\/sn74138$/);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.goto('/#/');
  const motionState = await page.getAttribute('html', 'data-motion');
  expect(motionState).toBe('on');
  await page.screenshot({path: testInfo.outputPath('mobile-home.png'), fullPage: true});

  expect(pageErrors, `Błędy JS: ${pageErrors.join('\n')}`).toEqual([]);
  expect(badResponses, `Błędne odpowiedzi: ${badResponses.join('\n')}`).toEqual([]);
});

test.describe('reduced motion', () => {
  test.use({reducedMotion: 'reduce'});

  test('respects system reduced motion setting', async ({page}) => {
    await page.goto('/#/');
    await expect(page.getByRole('button', {name: /Animacje wyłączone/i})).toBeDisabled();
    const motionState = await page.getAttribute('html', 'data-motion');
    expect(motionState).toBe('off');
  });
});
