import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('landing page: navigation, preview, FAQ and launch state', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/MboaGo/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Profitez');
  await page.getByRole('tab', { name: 'Séjourner' }).click();
  await expect(page.locator('.phone').getByRole('tabpanel')).toContainText('Posez vos valises.');
  await page.getByRole('tab', { name: 'Séjourner' }).press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Sortir' })).toBeFocused();
  await expect(page.locator('.phone').getByRole('tabpanel')).toContainText(
    'Faites-en un souvenir.',
  );
  await page.getByRole('tab', { name: 'Sortir' }).press('Home');
  await expect(page.locator('.phone').getByRole('tabpanel')).toContainText('On vous emmène où ?');
  if (testInfo.project.name === 'mobile') {
    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await page
      .getByRole('navigation', { name: 'Navigation mobile' })
      .getByRole('link', { name: 'FAQ' })
      .click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  }
  const question = page
    .locator('summary')
    .filter({ hasText: 'L’application est-elle déjà disponible ?' });
  await question.click();
  await expect(question.locator('..')).toHaveAttribute('open', '');
  await expect(question.locator('..')).toContainText('en cours de préparation');
  await expect(page.locator('#telecharger')).toContainText('Bientôt sur');
  await expect(page.locator('a[href=""], a[href="#"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('responsive layout, accessible markup and assets', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  const widths = testInfo.project.name === 'mobile' ? [320, 375, 390, 768] : [1024, 1440];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.reload();
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    expect(
      await page.evaluate(
        (viewportWidth) => document.documentElement.scrollWidth <= viewportWidth,
        width,
      ),
      `No horizontal overflow at ${width}px`,
    ).toBe(true);
  }
  await page.setViewportSize({
    width: testInfo.project.name === 'mobile' ? 390 : 1440,
    height: 1000,
  });
  await page.reload();
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  const accessibility = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  const violations = accessibility.violations.map((rule) => ({
    id: rule.id,
    nodes: rule.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
  }));
  // Visit lazy-loaded images as a visitor scrolling through the page would.
  for (const image of await page.locator('img:visible').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0),
      )
      .toBe(true);
  }
  await page.waitForFunction(() =>
    [...document.images]
      .filter((image) => image.checkVisibility())
      .every((image) => image.complete && image.naturalWidth > 0),
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.screenshot({
    path: testInfo.outputPath('landing.png'),
    fullPage: true,
    scale: 'css',
    animations: 'disabled',
  });
  expect(violations).toEqual([]);
});
