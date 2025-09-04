import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

def test_example_title():
    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=opts)
    try:
        driver.get("https://example.org")
        assert "Example Domain" in driver.title
        # extra sanity check
        h1 = driver.find_element(By.TAG_NAME, "h1").text
        assert "Example Domain" in h1
    finally:
        driver.quit()
