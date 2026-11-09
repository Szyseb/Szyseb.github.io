import {expect, test} from '@playwright/test';

const previousProjects = [
  ['pcsk225', 'pcsk225'],
  ['lokalizacja', 'wireless'],
  ['sn74138', 'layout'],
  ['kicad-7seg', 'display'],
  ['perfect-circuit-builder', 'game'],
];

test('portfolio navigation, expandable projects, contact and assets', async ({page}, testInfo) => {
  const pageErrors = [];
  const badResponses = [];

  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1:4173/')) {
      badResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('/');
  await expect(page.getByRole('heading', {name: 'Elektronika w praktyce.'})).toBeVisible();
  await expect.poll(() => page.locator('.brand-mark').evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({path: testInfo.outputPath('portfolio.png'), fullPage: true});

  const nav = page.getByRole('navigation', {name: 'Nawigacja główna'});
  await nav.getByRole('link', {name: 'Projekty'}).click();
  await expect(page).toHaveURL(/#projekty$/);
  const projects = page.locator('.project');
  await expect(projects).toHaveCount(5);
  await projects.first().locator('summary').click();
  await expect(projects.first()).toHaveAttribute('open', '');
  await projects.nth(1).locator('summary').click();
  await expect(projects.nth(1)).toHaveAttribute('open', '');
  await expect(projects.first()).not.toHaveAttribute('open');

  await nav.getByRole('link', {name: 'Kontakt'}).click();
  await expect(page).toHaveURL(/#kontakt$/);
  await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:szysebastian@gmail.com');

  expect(pageErrors).toEqual([]);
  expect(badResponses).toEqual([]);
});

test('project deep links survive reload, including previous public URLs', async ({page}) => {
  for (const [previous, current] of previousProjects) {
    await page.goto(`/#/projekty/${previous}`);
    await page.reload();
    await expect(page.locator(`#${current}`)).toHaveAttribute('open', '');
  }

  await page.goto('/#pcsk225');
  await expect(page.locator('#pcsk225')).toHaveAttribute('open', '');
});

test.describe('reduced motion', () => {
  test.use({reducedMotion: 'reduce'});

  test('uses immediate scrolling', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  });
});
