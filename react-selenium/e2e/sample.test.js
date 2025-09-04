const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver'); // ensures Node.js finds chromedriver

describe('Google Search', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  it('should open Google and search', async () => {
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver');
    await searchBox.submit();
    await driver.wait(until.titleContains('Selenium WebDriver'), 10000);
  });

  after(async () => {
    await driver.quit();
  });
});
