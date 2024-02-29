let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 40000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 50000);
});

describe("Should test other menu sections", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  });

  test("Click on button Start", async () => {
    await page.goto("https://github.com/login");
    await page.waitForSelector('h1');
    const btnSelector = "#email-container > div > label";
    const title2 = await page.title();
    expect(title2).toEqual('Sign in to GitHub · GitHub');
    }, 30000);

  test("Enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    const title = await page.title();
    expect(title).toContain("The AI Powered Developer Platform. · GitHub");
    }, 30000);

  test("Partners",async () => {
    await page.goto("https://partner.github.com/");
    const title = await page.title();
    expect(title).toContain("Partner with GitHub");
    }, 30000);
});
