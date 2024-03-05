const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Сinema tests", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Purchase a ticket to Zeropolis for tomorrow", async () => {
    await clickElement(page, "nav > a:nth-child(2)");
    await clickElement(page, "body > main > section:nth-child(1) > div:nth-child(2) > ul > li:nth-child(2) > a");
    await page.waitForSelector("body > main > section > div.buying-scheme > div.buying-scheme__wrapper");
    const seat = "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(8) > span:nth-child(6)";
    await clickElement(page, seat);
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2");
    let film = await getText(page, `body > main > section > div > p:nth-child(1) > span`);
    expect(film).toEqual("Зверополис");
    let seatNumber = await getText(page, `body > main > section > div > p:nth-child(2) > span`);
    expect(seatNumber).toEqual("8/6");
    let cost = await getText(page, `body > main > section > div > p:nth-child(6) > span`);
    expect(cost).toEqual("150");
  }, 60000);

  test("Successful booking ticket for the day after tomorrow", async () => {
    await clickElement(page, "nav > a:nth-child(3)");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a");
    await page.waitForSelector("div.buying-scheme");
    const seat = ".buying-scheme__wrapper > :nth-child(7) > :nth-child(6)";
    await clickElement(page, seat);
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2");
    let film = await getText(page, `body > main > section > div > p:nth-child(1) > span`);
    expect(film).toEqual("Микки маус");
    let seatNumber = await getText(page, `body > main > section > div > p:nth-child(2) > span`);
    expect(seatNumber).toEqual("7/6");
    let cost = await getText(page, `body > main > section > div > p:nth-child(6) > span`);
    expect(cost).toEqual("1000");
  }, 60000);

  test("Trying to buy reserved seat for the day after tomorrow", async () => {
    await clickElement(page, "nav > a:nth-child(3)");
    await clickElement(page, "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li > a");
    await page.waitForSelector("div.buying-scheme");
    const seat = ".buying-scheme__wrapper > :nth-child(5) > :nth-child(6)";
    await clickElement(page, seat);
    await clickElement(page, "button.acceptin-button");
    const stateOfButton = await page.$eval('button', (button) => {
      return button.disabled;
    });
    expect(stateOfButton).toEqual(true);
  }, 60000);
});
