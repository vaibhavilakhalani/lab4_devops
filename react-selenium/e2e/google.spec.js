const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('Google Search Test', function () {
  this.timeout(30000);
  let driver;

  before(async function () {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('--headless');
    chromeOptions.addArguments('--no-sandbox');
    chromeOptions.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it('should open Google and search for Jenkins', async function () {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Jenkins CI/CD', '\n');

    await driver.wait(until.titleContains('Jenkins'), 10000);
    const title = await driver.getTitle();
    console.log('Page title is:', title);

    expect(title).to.contain('Jenkins');
  });
});
