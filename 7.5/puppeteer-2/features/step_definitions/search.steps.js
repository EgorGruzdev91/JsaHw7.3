const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

let page;


Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (url) {
  return await this.page.goto(url), { setTimeout: 50000 };
});

When("selects tomorrow in the calendar", async function () {
  return await clickElement(this.page, "nav > a:nth-child(2)");
});

When("selects a session at Zveropolis at 12:00", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(2) > a");
});

When("chooses a seat 8th row 6th seat", async function () {
  await this.page.waitForSelector("body > main > section > div.buying-scheme > div.buying-scheme__wrapper");
  seat = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(8) > span:nth-child(6)";
  await clickElement(this.page, seat);
  await clickElement(this.page, "button.acceptin-button");
});

Then("receives bookings before payment", async function () {
  await this.page.waitForSelector("h2");
  let film = await getText(this.page, `body > main > section > div > p:nth-child(1) > span`);
  expect(film).equal("Зверополис");
  let seat = await getText(this.page, `body > main > section > div > p:nth-child(2) > span`);
  expect(seat).equal("8/6");
  let cost = await getText(this.page, `body > main > section > div > p:nth-child(6) > span`);
  expect(cost).equal("150");
});

When("selects the day after tomorrow in the calendar", async function () {
  return await clickElement(this.page, "nav > a:nth-child(3)");
});

When("selects a session at Mickey Mouse at 11-00", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a");
});

When("chooses a seat 7th row 6th seat", async function () {
  await this.page.waitForSelector("div.buying-scheme");
  seat = ".buying-scheme__wrapper > :nth-child(7) > :nth-child(6)";
  await clickElement(this.page, seat);
  await clickElement(this.page, "button.acceptin-button");
});

Then("get bookings before payment", async function () {
  await this.page.waitForSelector("h2");
  let film = await getText(this.page, `body > main > section > div > p:nth-child(1) > span`);
  expect(film).equal("Микки маус");
  let seat = await getText(this.page, `body > main > section > div > p:nth-child(2) > span`);
  expect(seat).equal("7/6");
  let cost = await getText(this.page, `body > main > section > div > p:nth-child(6) > span`);
  expect(cost).equal("1000");
});

When("selects a session at Gone with the Wind", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li > a");
});

When("chooses a seat 5th row 6th seat", async function () {
  await this.page.waitForSelector("div.buying-scheme");
  seat = ".buying-scheme__wrapper > :nth-child(5) > :nth-child(6)";
  await clickElement(this.page, seat);
  await clickElement(this.page, "button.acceptin-button");
});

Then("get information that the place is occupied", async function () {
  const stateOfButton = await this.page.$eval('button', (button) => {
    return button.disabled;
  });
  expect(stateOfButton).equal(true)
});