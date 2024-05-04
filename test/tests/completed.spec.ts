import { JaConfirm } from '@pages/ja/confirm';
import { JaLogin } from '@pages/ja/login';
import { JaPlans } from '@pages/ja/plans';
import { JaReserve } from '@pages/ja/reserve';
import { test, expect } from '@playwright/test';

test('プレミアム会員でログインして、プレミアムプランを予約できる', async ({ page }) => {
  const jaLogin = new JaLogin(page);
  const jaPlans = new JaPlans(page);

  await jaLogin.login('jun@example.com', 'pa55w0rd!');

  await jaPlans.load();
  // プランを選択すると、別タブで予約画面が表示される
  const jaReserve = new JaReserve(await jaPlans.reservePremiumPlan(page));
  // 「確認のご連絡」設定は必須なので、とりあえずメールでおこなう。
  // ログイン状態の場合、メールアドレスは自動補完されるため、設定のみで十分
  await jaReserve.contactSelector.selectOption('email');
  await jaReserve.submitButton.click();

  const jaConfirm = new JaConfirm(jaReserve.page);
  await expect(jaConfirm.planName).toContainText('プレミアムプラン');
  await jaConfirm.confirmButton.click();
  await expect(jaConfirm.confirmToastTitle).toContainText('予約を完了しました');
});
