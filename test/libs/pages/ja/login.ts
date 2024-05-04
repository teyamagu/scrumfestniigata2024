import { Locator, Page } from "@playwright/test";

export class JaLogin {
  readonly page: Page;
  readonly mailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mailField = page.getByLabel('メールアドレス');
    this.passwordField = page.getByLabel('パスワード');
    this.loginButton = page.locator('#login-button');
  }

  async login(mail: string, passowrd: string) {
    await this.page.goto("http://localhost:8000/hotel-example-site/ja/login.html");
    await this.page.waitForURL(this.page.url());

    await this.mailField.fill(mail);
    await this.passwordField.fill(passowrd);
    await this.loginButton.click();
  }
}
