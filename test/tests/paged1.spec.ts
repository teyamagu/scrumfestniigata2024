import { JaConfirm } from '@pages/ja/confirm';
import { JaLogin } from '@pages/ja/login';
import { JaMypage } from '@pages/ja/mypage';
import { JaPlans } from '@pages/ja/plans';
import { JaReserve } from '@pages/ja/reserve';
import { test, expect } from '@playwright/test';

test('プレミアム会員でログインして、プレミアムプランを予約できる', async ({ page }) => {
  const jaLogin = new JaLogin(page);
  const jaMypage = new JaMypage(page);
  const jaPlans = new JaPlans(page);

  await page.goto('http://localhost:8000/hotel-example-site/ja/login.html');
  await jaLogin.page.getByLabel('メールアドレス').click();
  await jaLogin.page.getByLabel('メールアドレス').fill('jun@example.com');
  await jaLogin.page.getByLabel('パスワード').click();
  await jaLogin.page.getByLabel('パスワード').fill('pa55w0rd!');
  await jaLogin.page.locator('#login-button').click();

  await jaMypage.page.getByRole('link', { name: '宿泊予約' }).click();

  const page2Promise = page.waitForEvent('popup');
  await jaPlans.page.locator('div').filter({ hasText: /^プレミアムプラン大人1名10,000円2名様からプレミアムツインこのプランで予約$/ }).getByRole('link').click();
  const jaReserve = new JaReserve(await page2Promise);
  await jaReserve.page.getByLabel('確認のご連絡 必須').selectOption('email');
  await jaReserve.page.locator('[data-test="submit-button"]').click();

  const jaConfirm = new JaConfirm(jaReserve.page);
  await expect(jaConfirm.page.locator('#plan-name')).toContainText('プレミアムプラン');
  await jaConfirm.page.getByRole('button', { name: 'この内容で予約する' }).click();
  await expect(jaConfirm.page.locator('h5')).toContainText('予約を完了しました');
});
