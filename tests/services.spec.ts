import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
});

test('service tabs change the full content, keep the layout stable and support the keyboard', async ({
  page,
}) => {
  const tabs = page.getByRole('tablist', { name: 'Les envies MboaGo' });
  const panel = page.locator('#decouvrir').getByRole('tabpanel');
  const originalHeight = await page
    .locator('#decouvrir')
    .evaluate((element) => element.getBoundingClientRect().height);
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Prenez la route');
  for (const [label, card] of [
    ['Posez vos valises', 'La bonne adresse, au bon endroit.'],
    ['Vivez le moment', 'Les bons moments se partagent.'],
    ['Prenez la route', 'La bonne place. La vôtre.'],
  ]) {
    await tabs.getByRole('tab', { name: label }).click();
    await expect(tabs.getByRole('tab', { selected: true })).toHaveText(label);
    await expect(panel.getByRole('heading', { level: 2, name: card })).toBeVisible();
    expect(
      await page
        .locator('#decouvrir')
        .evaluate((element) => element.getBoundingClientRect().height),
    ).toBe(originalHeight);
    const audit = await new AxeBuilder({ page })
      .include('#decouvrir')
      .include('[aria-label="Les envies MboaGo"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      audit.violations.map((rule) => ({
        id: rule.id,
        nodes: rule.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  await tabs.getByRole('tab', { name: 'Prenez la route' }).press('ArrowRight');
  await expect(tabs.getByRole('tab', { name: 'Posez vos valises' })).toBeFocused();
  await expect(panel).toContainText('La bonne adresse, au bon endroit.');
  await page.keyboard.press('End');
  await expect(tabs.getByRole('tab', { name: 'Vivez le moment' })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.getByRole('tab', { name: 'Prenez la route' })).toBeFocused();
});

test('holding and dragging changes views before release, clamps at edges and supports content swipes', async ({
  page,
}) => {
  const tabs = page.getByRole('tablist', { name: 'Les envies MboaGo' });
  await tabs.scrollIntoViewIfNeeded();
  const bounds = await tabs.boundingBox();
  if (!bounds) throw new Error('Service tabs are not visible');
  const y = bounds.y + bounds.height / 2;
  const x = (index: number) => bounds.x + (bounds.width / 3) * (index + 0.5);
  await page.mouse.move(x(0), y);
  await page.mouse.down();
  await page.mouse.move(x(1), y, { steps: 8 });
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Posez vos valises');
  await expect(page.locator('#decouvrir').getByRole('tabpanel')).toContainText(
    'La bonne adresse, au bon endroit.',
  );
  await page.mouse.move(x(2), y, { steps: 8 });
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Vivez le moment');
  await page.mouse.move(bounds.x + bounds.width + 25, y);
  await page.mouse.up();
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Vivez le moment');
  await expect(tabs.getByRole('tab', { name: 'Vivez le moment' })).toBeFocused();

  // A click after dragging must not be swallowed by click suppression.
  await tabs.getByRole('tab', { name: 'Prenez la route' }).click();
  const heading = page
    .locator('#decouvrir')
    .getByRole('tabpanel')
    .getByRole('heading', { level: 2 })
    .first();
  await heading.scrollIntoViewIfNeeded();
  const rect = await heading.boundingBox();
  if (!rect) throw new Error('Service content is not visible');
  const startX = rect.x + Math.min(rect.width - 10, 240);
  await page.mouse.move(startX, rect.y + 20);
  await page.mouse.down();
  await page.mouse.move(startX - 120, rect.y + 20, { steps: 10 });
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Posez vos valises');
  await page.mouse.up();
  await expect(page.locator('#decouvrir').getByRole('tabpanel')).toContainText(
    'La bonne adresse, au bon endroit.',
  );
});

test('native touch scrubbing, cancellation and vertical page scrolling', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'Native touch coverage uses the mobile viewport.');
  const tabs = page.getByRole('tablist', { name: 'Les envies MboaGo' });
  await tabs.scrollIntoViewIfNeeded();
  const bounds = await tabs.boundingBox();
  if (!bounds) throw new Error('Service tabs are not visible');
  const y = bounds.y + bounds.height / 2;
  const x = (index: number) => bounds.x + (bounds.width / 3) * (index + 0.5);
  const cdp = await page.context().newCDPSession(page);
  const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd' | 'touchCancel', x = 0, y = 0) =>
    cdp.send('Input.dispatchTouchEvent', {
      type,
      touchPoints: type === 'touchEnd' || type === 'touchCancel' ? [] : [{ x, y, id: 1 }],
    });
  await touch('touchStart', x(0), y);
  await touch('touchMove', x(1), y);
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Posez vos valises');
  await touch('touchCancel');
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Prenez la route');
  await touch('touchStart', x(0), y);
  await touch('touchMove', x(1), y);
  await touch('touchMove', x(2), y);
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Vivez le moment');
  await touch('touchEnd');
  await expect(page.locator('#decouvrir').getByRole('tabpanel')).toContainText(
    'Les bons moments se partagent.',
  );
  const scrollBefore = await page.evaluate(() => window.scrollY);
  await touch('touchStart', x(1), y);
  for (let delta = 20; delta <= 120; delta += 20) await touch('touchMove', x(1), y - delta);
  await touch('touchEnd');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollBefore + 30);
  await expect(tabs.getByRole('tab', { selected: true })).toHaveText('Vivez le moment');
  await cdp.detach();
});
