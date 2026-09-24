import { test, expect } from '@playwright/test';
for (const [path, label, cta] of [
  ['/', 'Professionnels', 'Découvrir l’espace partenaires'],
  ['/en/', 'For businesses', 'Explore the partner platform'],
]) {
  test(`accès à l’accueil professionnel depuis ${path}`, async ({ page, isMobile }) => {
    await page.goto(path);
    const expected = 'https://mboago-management.goovenpad.com/';
    await expect(
      page.locator('.professionals-section').getByRole('link', { name: cta }),
    ).toHaveAttribute('href', expected);
    await expect(
      page.locator('footer').getByRole('link', { name: label, exact: true }),
    ).toHaveAttribute('href', expected);
    if (isMobile) {
      await page.locator('button[aria-controls="mobile-menu"]').click();
      await expect(
        page.locator('#mobile-menu').getByRole('link', { name: label, exact: true }),
      ).toHaveAttribute('href', expected);
    } else {
      await expect(page.locator('.header-pro-link')).toBeVisible();
      await expect(page.locator('.header-pro-link')).toHaveAttribute('href', expected);
    }
  });
}
