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
  await jaLogin.mailField.click();
  await jaLogin.mailField.fill('jun@example.com');
  await jaLogin.passwordField.click();
  await jaLogin.passwordField.fill('pa55w0rd!');
  await jaLogin.loginButton.click();

  await jaMypage.plansLink.click();

  const page2Promise = page.waitForEvent('popup');
  await jaPlans.premiumPlanReserveButton.click();
  const jaReserve = new JaReserve(await page2Promise);
  await jaReserve.contactSelector.selectOption('email');
  await jaReserve.submitButton.click();

  const jaConfirm = new JaConfirm(jaReserve.page);
  await expect(jaConfirm.planName).toContainText('プレミアムプラン');
  await jaConfirm.confirmButton.click();
  await expect(jaConfirm.confirmToastTitle).toContainText('予約を完了しました');
});
