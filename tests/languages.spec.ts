import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fr from '../src/i18n/locales/fr.json' with { type: 'json' };
import en from '../src/i18n/locales/en.json' with { type: 'json' };

const languageTrigger = (page: Page) =>
  page.getByRole('button', { name: /Langue du site|Website language/ });

async function selectLanguage(page: Page, name: 'Français' | 'English') {
  await languageTrigger(page).click();
  await page.getByRole('menuitemradio', { name, exact: true }).click();
}

test('both dictionaries cover the same copy and interpolation values', () => {
  const flatten = (value: object, prefix = ''): Record<string, string> =>
    Object.fromEntries(
      Object.entries(value).flatMap(([key, item]) =>
        typeof item === 'string'
          ? [[`${prefix}${key}`, item]]
          : Object.entries(flatten(item, `${prefix}${key}.`)),
      ),
    );
  const french = flatten(fr),
    english = flatten(en);
  expect(Object.keys(english).sort()).toEqual(Object.keys(french).sort());
  for (const [key, value] of Object.entries(french)) {
    expect(english[key].trim(), key).not.toBe('');
    expect(english[key].match(/{{.*?}}/g) ?? [], key).toEqual(value.match(/{{.*?}}/g) ?? []);
  }
});

test('language selection translates the whole page, preserves UI state and survives reloads', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?utm_source=language-test#accueil');
  await page.getByRole('tab', { name: 'Séjourner', exact: true }).click();
  await page.getByRole('tab', { name: /Posez vos valises/ }).click();
  await page.locator('summary').filter({ hasText: fr.faq.available.question }).click();
  await selectLanguage(page, 'English');
  await expect(page).toHaveURL('/en/?utm_source=language-test#accueil');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle(en.meta.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    en.meta.description,
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Travel.Stay.Enjoy.');
  await expect(page.locator('.phone').getByRole('tabpanel')).toContainText(en.preview.hotelTitle);
  await expect(page.locator('#service-tab-stay')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#decouvrir').getByRole('tabpanel')).toContainText(en.cards.doubleRoom);
  await expect(page.locator('details[open]')).toContainText(en.faq.available.answer);
  await expect(page.locator('#ensemble')).toContainText('memories on your profile');
  await expect(page.locator('#ensemble')).toContainText('groups in the app');
  await expect(page.locator('#telecharger')).toContainText(en.store.soon);
  await expect(languageTrigger(page)).toHaveText('English');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Enjoy');
  await page.goto('/');
  await expect(page).toHaveURL('/en/');
  await expect(languageTrigger(page)).toHaveText('English');
  await selectLanguage(page, 'Français');
  await expect(page).toHaveURL('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Profitez');
  await page.goBack();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goForward();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  expect(errors).toEqual([]);
});

test('the English page is accessible and responsive, including its mobile menu', async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');
  const widths = testInfo.project.name === 'mobile' ? [320, 390, 768] : [920, 1024, 1440];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.evaluate(() => document.fonts.ready);
    await expect(languageTrigger(page)).toBeVisible();
    await languageTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();
    const menu = await page.getByRole('menu').boundingBox();
    expect(menu?.x).toBeGreaterThanOrEqual(0);
    expect(menu!.x + menu!.width).toBeLessThanOrEqual(width);
    await page.keyboard.press('Escape');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      `${width}px layout`,
    ).toBe(width);
  }
  await page.setViewportSize({
    width: testInfo.project.name === 'mobile' ? 390 : 1440,
    height: 1000,
  });
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toContainText(
      'How it works',
    );
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  }
  for (const label of ['Stay a while', 'Enjoy the moment', 'Hit the road']) {
    await page.getByRole('tab', { name: new RegExp(label) }).click();
    await expect(page.locator('#decouvrir').getByRole('tabpanel')).toBeVisible();
  }
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    audit.violations.map((rule) => ({
      id: rule.id,
      targets: rule.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page.screenshot({
    path: testInfo.outputPath('english.png'),
    fullPage: true,
    animations: 'disabled',
  });
});

test('storage restrictions do not prevent language changes and the English URL takes priority', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Storage disabled', 'SecurityError');
      },
    });
  });
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await selectLanguage(page, 'Français');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Profitez');
  await selectLanguage(page, 'English');
  await page.reload();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Enjoy');
});

test('language menu supports keyboard navigation, dismissal and touch selection', async ({
  page,
}, testInfo) => {
  await page.goto('/');
  const trigger = languageTrigger(page);
  const french = page.getByRole('menuitemradio', { name: 'Français', exact: true });
  const english = page.getByRole('menuitemradio', { name: 'English', exact: true });

  await trigger.focus();
  await page.keyboard.press('ArrowDown');
  await expect(french).toBeFocused();
  await expect(french).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('End');
  await expect(english).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(french).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(english).toBeFocused();
  await page.keyboard.press('Home');
  await expect(french).toBeFocused();
  await page.keyboard.press('e');
  await expect(english).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await page.keyboard.press('Space');
  await expect(english).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.getByRole('menu')).toHaveCount(0);

  await trigger.click();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(
    page.locator(testInfo.project.name === 'mobile' ? '.menu-toggle' : '.header-cta'),
  ).toBeFocused();
  await trigger.click();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('menu')).toHaveCount(0);
  await expect(trigger).not.toBeFocused();
  await expect(page.locator('body')).not.toBeFocused();

  await trigger.click();
  await page.getByRole('heading', { level: 1 }).click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  if (testInfo.project.name === 'mobile') {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.getByRole('button', { name: 'Open menu', exact: true }).tap();
    await trigger.tap();
    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(page.getByRole('button', { name: 'Close menu', exact: true })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    await page.getByRole('button', { name: 'Close menu', exact: true }).tap();
    await trigger.tap();
    await french.tap();
  } else {
    await selectLanguage(page, 'Français');
  }
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(trigger).toHaveText('Français');
  await trigger.click();
  await expect(french).toHaveAttribute('aria-checked', 'true');
  await expect(english).toHaveAttribute('aria-checked', 'false');
  const audit = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    audit.violations.map((rule) => ({ id: rule.id, nodes: rule.nodes.map((node) => node.target) })),
  ).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('language-menu.png'), animations: 'disabled' });
});
