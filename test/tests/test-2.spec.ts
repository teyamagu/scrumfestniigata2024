import { test, expect } from '@playwright/test';

test('プレミアム会員でログインして、プレミアムプランを予約できる', async ({ page }) => {
  await page.goto('http://localhost:8000/hotel-example-site/ja/login.html');
  await page.getByLabel('メールアドレス').click();
  await page.getByLabel('メールアドレス').fill('jun@example.com');
  await page.getByLabel('パスワード').click();
  await page.getByLabel('パスワード').fill('pa55w0rd!');
  await page.locator('#login-button').click();
  await page.getByRole('link', { name: '宿泊予約' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^プレミアムプラン大人1名10,000円2名様からプレミアムツインこのプランで予約$/ }).getByRole('link').click();
  const page2 = await page2Promise;
  await page2.getByLabel('確認のご連絡 必須').selectOption('email');
  await page2.locator('[data-test="submit-button"]').click();
  await expect(page2.locator('#plan-name')).toContainText('プレミアムプラン');
  await page2.getByRole('button', { name: 'この内容で予約する' }).click();
  await expect(page2.locator('h5')).toContainText('予約を完了しました');
});
