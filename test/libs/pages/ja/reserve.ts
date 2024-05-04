import { Locator, Page } from "@playwright/test";
import { KeyLike } from "crypto";

export class JaReserve {
  readonly page: Page;
  readonly header: Locator;
  readonly nameField: Locator;
  readonly contactSelector: Locator;
  readonly mailField: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: '宿泊予約' });
    this.nameField = page.getByLabel('氏名 必須');
    this.contactSelector = page.getByLabel('確認のご連絡 必須');
    this.mailField = page.getByLabel('メールアドレス 必須');
    this.submitButton = page.locator('[data-test="submit-button"]');
  }

}