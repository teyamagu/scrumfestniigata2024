import { Locator, Page } from "@playwright/test";

export class JaConfirm {
  readonly page: Page;
  readonly planName: Locator;
  readonly confirmButton: Locator;
  readonly confirmToastTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.planName = page.locator('#plan-name');
    this.confirmButton = page.getByRole('button', { name: 'この内容で予約する' });
    this.confirmToastTitle = page.locator('h5');
  }
}
