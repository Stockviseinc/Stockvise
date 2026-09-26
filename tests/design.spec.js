import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const contrastFailures = (results) => results.violations.flatMap(v => v.nodes.map(n => ({ selector: n.target.join(' '), ...n.any[0]?.data })));

test('editorial layout has accessible text contrast on landing and digest', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => document.fonts.ready);
  const landing = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  await page.screenshot({ path: testInfo.outputPath('landing.png'), fullPage: true });
  await page.screenshot({ path: testInfo.outputPath('hero.png') });
  await page.locator('.features-section').screenshot({ path: testInfo.outputPath('features.png') });
  expect.soft(contrastFailures(landing)).toEqual([]);

  await page.getByRole('button', { name: 'See a sample digest' }).click();
  const digest = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  await page.screenshot({ path: testInfo.outputPath('digest.png') });
  expect.soft(contrastFailures(digest)).toEqual([]);
  await page.locator('.demo-dialog').getByRole('button', { name: 'See how we got here' }).click();
  const trace = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  expect.soft(contrastFailures(trace)).toEqual([]);
  await page.getByRole('button', { name: 'Close product demo' }).click();
  await page.getByRole('button', { name: 'Get early access', exact: true }).click();
  const signup = await new AxeBuilder({ page }).withRules(['color-contrast']).analyze();
  expect(contrastFailures(signup)).toEqual([]);
});
