import { Locator, Page } from "@playwright/test";

export class JaMypage {
  readonly page: Page;
  readonly plansLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.plansLink = page.getByRole('link', { name: '宿泊予約' });
  }
}
