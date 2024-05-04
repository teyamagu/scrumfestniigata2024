import { Locator, Page } from "@playwright/test";

export class JaPlans {
  readonly page: Page;
  readonly premiumPlanCard: Locator;
  readonly premiumPlanReserveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.premiumPlanCard = page.getByText('プレミアムプラン大人1名10,000円');
    this.premiumPlanReserveButton = page.locator('div').filter({ hasText: /^プレミアムプラン大人1名10,000円2名様からプレミアムツインこのプランで予約$/ }).getByRole('link');
  }

  async load() {
    await this.page.goto("http://localhost:8000/hotel-example-site/ja/plans.html");
    await this.page.waitForURL(this.page.url());
  }

  async reservePremiumPlan(page: Page) {
    const newPagePromise = page.waitForEvent('popup');
    await this.premiumPlanReserveButton.click();
    return newPagePromise;
  }

}