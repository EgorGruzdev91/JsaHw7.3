const { test, expect } = require("@playwright/test");
const user = require('../user');
const credentials = require("../user");

test.beforeEach(async ({ page }) => {
  await page.goto('https://netology.ru/?modal=sign_in');
});


test("Successful authorization", async ({ page }) => {
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', credentials.email);
  await page.screenshot({ path: './screenshots/Succesful/sc1.png' });
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', credentials.password);
  await page.screenshot({ path: './screenshots/Succesful/sc2.png' });
  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({ path: './screenshots/Succesful/sc3.png' });
  await expect(page).toHaveURL("https://netology.ru/profile/8611751");
  await page.waitForSelector("h2");
  const title = await page.$eval("h2", (element) => element.textContent);
  expect(title).toBe("Моё обучение");
  await page.screenshot({ path: './screenshots/Succesful/sc4.png' });
  });

test("Failed authorization", async ({ page }) => {
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', credentials.invalidEmail);
  await page.screenshot({ path: './screenshots/Failed/sc1.png' });
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', credentials.invalidPassword);
  await page.screenshot({ path: './screenshots/Failed/sc2.png' });
  await page.click('[data-testid="login-submit-btn"]');
  await page.screenshot({ path: './screenshots/Failed/sc3.png' });
  await page.waitForSelector('[data-testid="login-error-hint"]');
  const title = await page.$eval('[data-testid="login-error-hint"]', (element) => element.textContent);
  expect(title).toBe("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: './screenshots/Failed/sc4.png' });
  });