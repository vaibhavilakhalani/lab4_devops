const {Builder, By, until} = require('selenium-webdriver');
const {expect} = require('chai');
const chrome = require('selenium-webdriver/chrome');

describe('Example.org title check', function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should load example.org and verify title', async () => {
    await driver.get('https://example.org/');
    const title = await driver.getTitle();
    expect(title).to.contain('Example Domain');

    const h1 = await driver.findElement(By.css('h1'));
    await driver.wait(until.elementIsVisible(h1), 5000);
    const text = await h1.getText();
    expect(text).to.contain('Example Domain');
  });
});
