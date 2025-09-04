const { Builder, By } = require('selenium-webdriver');
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('React App Test', function () {
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

  it('should load React app and check header', async function () {
    await driver.get('http://localhost:3000');
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    expect(bodyText).to.include('React');  // checks page loaded
  });
});
