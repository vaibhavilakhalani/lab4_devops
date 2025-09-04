const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('React App E2E Test', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should load the homepage', async () => {
    await driver.get('http://localhost:3000');
    const title = await driver.getTitle();
    expect(title).to.include('React');
  });
});
