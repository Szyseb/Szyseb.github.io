import {expect, test} from '@playwright/test';

const previousProjects = [
  ['pcsk225', 'pcsk225'],
  ['lokalizacja', 'wireless'],
  ['sn74138', 'layout'],
  ['perfect-circuit-builder', 'game'],
];

test('portfolio projects, copied contact address and assets', async ({page}, testInfo) => {
  const pageErrors = [];
  const badResponses = [];

  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400 && response.url().startsWith('http://127.0.0.1:4173/')) {
      badResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: {writeText: async text => { window.copiedEmail = text; }},
    });
  });

  await page.goto('/');
  await expect(page.getByRole('heading', {name: 'Elektronik.'})).toBeVisible();
  await expect(page.getByText('04 realizacje', {exact: true})).toBeVisible();
  await expect(page.locator('header nav, footer, a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.getByText('Zobacz moje projekty', {exact: true})).toHaveCount(0);
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
  expect((await page.request.get(favicon)).ok()).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await page.screenshot({path: testInfo.outputPath('portfolio.png'), fullPage: true});

  const projects = page.locator('.project');
  await expect(projects).toHaveCount(4);
  await projects.first().locator('summary').click();
  await expect(projects.first()).toHaveAttribute('open', '');
  await projects.nth(1).locator('summary').click();
  await expect(projects.nth(1)).toHaveAttribute('open', '');
  await expect(projects.first()).not.toHaveAttribute('open');

  await page.getByRole('button', {name: 'Skopiuj adres szysebastian@gmail.com'}).click();
  await expect(page.getByRole('status')).toHaveText('Adres e-mail skopiowany.');
  expect(await page.evaluate(() => window.copiedEmail)).toBe('szysebastian@gmail.com');

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

test('defaults to dark and remembers the selected theme', async ({page}) => {
  await page.goto('/');
  const root = page.locator('html');
  await expect(root).toHaveAttribute('data-theme', 'dark');
  await expect(root).toHaveCSS('color-scheme', 'dark');
  await page.getByRole('button', {name: 'Włącz jasny motyw'}).click();
  await expect(root).toHaveCSS('color-scheme', 'light');
  await page.reload();
  await expect(root).toHaveCSS('color-scheme', 'light');
  await page.getByRole('button', {name: 'Włącz ciemny motyw'}).click();
  await expect(root).toHaveCSS('color-scheme', 'dark');
});

test('wordmark follows scroll, stays centered and reserves space for every part', async ({page}, testInfo) => {
  if (testInfo.project.name.includes('mobile')) {
    await page.setViewportSize({width: 320, height: 740});
  }

  await page.goto('/');
  const mark = page.locator('.brand-wordmark');
  const progress = () => mark.evaluate(element => Number(element.style.getPropertyValue('--brand-progress')));
  const revealWidth = () => mark.locator('.brand-reveal').first().evaluate(element => element.getBoundingClientRect().width);
  const jump = top => page.evaluate(top => window.scrollTo({top, behavior: 'instant'}), top);

  await expect.poll(progress).toBe(0);
  await expect.poll(revealWidth).toBe(0);

  await jump(68);
  await expect.poll(progress).toBe(0.5);
  const halfWidth = await revealWidth();
  expect(halfWidth).toBeGreaterThan(0);

  await jump(136);
  await expect.poll(progress).toBe(1);
  expect(await revealWidth()).toBeGreaterThan(halfWidth);
  await expect(mark.locator('.brand-dot')).toHaveCSS('opacity', '0');
  const layout = await mark.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    const parts = Array.from(element.children, child => child.getBoundingClientRect());
    return {
      centerOffset: Math.abs(bounds.left + bounds.width / 2 - document.documentElement.clientWidth / 2),
      overlap: parts.some((part, index) => index > 0 && part.left < parts[index - 1].right - 1),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  expect(layout.centerOffset).toBeLessThanOrEqual(1);
  expect(layout.overlap).toBe(false);
  expect(layout.overflow).toBeLessThanOrEqual(1);

  await jump(0);
  await expect.poll(progress).toBe(0);
  await expect.poll(revealWidth).toBe(0);
  await expect(mark.locator('.brand-dot')).toHaveCSS('opacity', '1');
});

test.describe('reduced motion', () => {
  test.use({reducedMotion: 'reduce'});

  test('uses immediate scrolling and skips the partial wordmark', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
    const mark = page.locator('.brand-wordmark');
    await page.evaluate(() => window.scrollTo(0, 68));
    await expect(mark.locator('.brand-dot')).toHaveCSS('opacity', '1');
    await page.evaluate(() => window.scrollTo(0, 136));
    await expect(mark.locator('.brand-dot')).toHaveCSS('opacity', '0');
  });
});
