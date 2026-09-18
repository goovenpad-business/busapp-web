import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
});

test('the indicator follows partial drags and settles correctly after rapid reversals', async ({
  page,
}) => {
  const tabs = page.getByRole('tablist', { name: 'Les envies MboaGo' });
  await tabs.scrollIntoViewIfNeeded();
  const bounds = await tabs.boundingBox();
  if (!bounds) throw new Error('Tabs are not visible');
  const x = (progress: number) => bounds.x + 4 + ((bounds.width - 8) / 3) * (progress + 0.5);
  const y = bounds.y + bounds.height / 2;
  const indicator = tabs.locator('[aria-hidden="true"]').first();
  const offset = () =>
    indicator.evaluate(
      (element) =>
        new DOMMatrixReadOnly(getComputedStyle(element).transform).m41 /
        element.getBoundingClientRect().width,
    );

  await page.mouse.move(x(0), y);
  await page.mouse.down();
  await page.mouse.move(x(0.25), y, { steps: 4 });
  await expect(tabs.getByRole('tab', { selected: true })).toContainText('Prenez la route');
  expect(await offset()).toBeCloseTo(0.25, 1);
  for (const progress of [1, 2, 0.8, 0, 1.7]) await page.mouse.move(x(progress), y, { steps: 2 });
  expect(await offset()).toBeCloseTo(1.7, 1);
  await page.mouse.up();
  await expect.poll(offset).toBeCloseTo(2, 2);
  await expect(tabs.getByRole('tab', { selected: true })).toContainText('Vivez le moment');
  await expect(page.locator('#decouvrir').getByRole('tabpanel')).toHaveCount(1);
  await expect(page.locator('#decouvrir').getByRole('tabpanel')).toContainText('Un bon film');
  // Retarget a spring already moving, then use the keyboard while it settles.
  await tabs.getByRole('tab', { name: /Prenez la route/ }).click();
  await tabs.getByRole('tab', { name: /Posez vos valises/ }).click();
  await tabs.getByRole('tab', { name: /Posez vos valises/ }).press('Home');
  await expect.poll(offset).toBeCloseTo(0, 2);
  await expect(tabs.getByRole('tab', { name: /Prenez la route/ })).toBeFocused();
});

test('cards respond to hover or touch, release cleanly and respect reduced motion', async ({
  page,
}, testInfo) => {
  const card = page.getByRole('group', { name: 'Aperçu : Votre trajet', exact: true });
  await card.scrollIntoViewIfNeeded();
  const surface = card.locator(':scope > div');
  const lift = () =>
    surface.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).m42);
  if (testInfo.project.name === 'desktop') {
    await card.hover();
    await expect.poll(lift).toBeLessThan(-5);
    await page.mouse.move(1, 1);
    await expect.poll(lift).toBeCloseTo(0, 1);
    await card.focus();
    await expect.poll(lift).toBeLessThan(-5);
  } else {
    const rect = await card.boundingBox();
    if (!rect) throw new Error('Card is not visible');
    const cdp = await page.context().newCDPSession(page);
    const touch = (type: 'touchStart' | 'touchMove' | 'touchEnd' | 'touchCancel', dy = 0) =>
      cdp.send('Input.dispatchTouchEvent', {
        type,
        touchPoints:
          type === 'touchEnd' || type === 'touchCancel'
            ? []
            : [{ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 + dy, id: 1 }],
      });
    await touch('touchStart');
    await expect(card).toHaveAttribute('data-engaged', 'true');
    await expect.poll(lift).toBeLessThan(-4);
    await touch('touchCancel');
    await expect(card).toHaveAttribute('data-engaged', 'false');
    await expect.poll(lift).toBeCloseTo(0, 1);
    const before = await page.evaluate(() => scrollY);
    await touch('touchStart');
    for (let delta = -20; delta >= -120; delta -= 20) await touch('touchMove', delta);
    await touch('touchEnd');
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before + 30);
    await expect(card).toHaveAttribute('data-engaged', 'false');
    await expect(
      page.getByRole('tablist', { name: 'Les envies MboaGo' }).getByRole('tab', { selected: true }),
    ).toContainText('Prenez la route');
    await cdp.detach();
    await card.focus();
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() => surface.evaluate((element) => getComputedStyle(element).transform))
    .toBe('none');
  await expect
    .poll(() => surface.evaluate((element) => getComputedStyle(element).transitionDuration))
    .toBe('0s');
});
