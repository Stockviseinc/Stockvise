import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});

test('renders every landing page section', async ({ page }) => {
  for (const id of ['product', 'how-it-works', 'numbers', 'memory', 'compare', 'customers', 'pricing']) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
  await expect(page.getByRole('heading', { name: /None of them remember/ })).toBeVisible();
  await expect(page.locator('footer .brand')).toBeVisible();
});

test('page never scrolls horizontally', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('comparison names every competitor and highlights memory', async ({ page }) => {
  const table = page.locator('.compare-table');
  for (const name of ['Katana', 'ReplenishRadar', 'Unicommerce', 'Sellbrite']) {
    await expect(table.getByRole('columnheader', { name })).toBeAttached();
  }
  const memoryRow = table.locator('tr.compare-highlight');
  await expect(memoryRow.locator('td.compare-yes')).toHaveCount(1);
  await expect(page.getByText('“reorder / do-not-reorder list”')).toBeVisible();
});

test('brands are consistent between logo strip and testimonials', async ({ page }) => {
  const stories = page.locator('#customers');
  for (const brand of ['.client-form', '.client-ever', '.client-wild', '.client-grove', '.client-north']) {
    await expect(page.locator(`.client-strip ${brand}`)).toHaveCount(1);
    await expect(stories.locator(brand)).toHaveCount(1);
  }
  await expect(stories.getByText('Founder, Form & Field')).toBeVisible();
  await expect(stories.getByText('Alex Taylor')).toBeVisible();
  await expect(stories.locator('.story-stars')).toHaveCount(5);
});

test('cost model responds to SKU count without scaling Stockvise cost', async ({ page }) => {
  const section = page.locator('#numbers');
  const naive = section.locator('.cost-bar-row').nth(0).locator('strong');
  const ours = section.locator('.cost-bar-row').nth(1).locator('strong');
  await expect(naive).toHaveText('$900/mo');
  await expect(ours).toHaveText('$25.08/mo');
  await section.locator('#cost-skus').fill('5000');
  await expect(naive).toHaveText('$3,000/mo');
  await expect(ours).toHaveText('$27.60/mo');
});

test('pricing toggle switches to yearly', async ({ page }) => {
  const pricing = page.locator('#pricing');
  await expect(pricing.getByText('$89', { exact: true })).toBeVisible();
  await pricing.getByRole('button', { name: /Yearly/ }).click();
  await expect(pricing.getByText('$71', { exact: true })).toBeVisible();
});

test('demo records a discount decision for the sage tote', async ({ page }) => {
  await page.locator('#compare').getByRole('button', { name: /do-not-reorder item/ }).click();
  const dialog = page.locator('dialog.demo-dialog');
  await expect(dialog.getByRole('heading', { name: 'Canvas Everyday Tote · Sage' })).toBeVisible();
  await expect(dialog.getByText('Mark down sage totes by 20%.').first()).toBeVisible();
  await dialog.getByRole('button', { name: 'Review markdown' }).click();
  await dialog.getByRole('button', { name: 'Plan a 20% markdown' }).click();
  await expect(dialog.getByRole('heading', { name: 'Markdown marked as planned.' })).toBeVisible();
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('stockvise-demo-memory-v1')));
  expect(stored.decisions.sage.label).toBe('Markdown marked as planned');
});

test('trace view explains the recommendation', async ({ page }) => {
  await page.getByRole('button', { name: 'See how we got here' }).first().click();
  const dialog = page.locator('dialog.demo-dialog');
  await expect(dialog.getByRole('heading', { name: /how\s*we got here/i })).toBeVisible();
  await expect(dialog.locator('.demo-timeline li')).toHaveCount(6);
});
