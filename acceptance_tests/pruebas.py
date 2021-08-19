from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

driver = webdriver.Chrome(
    "C:\\Users\\CORE i7 ULTIMATE\\Downloads\\chromedriver_win32\\chromedriver.exe")


driver.get("http://localhost:8100")
driver.find_element_by_name("ion-input-0").send_keys("momo")
driver.find_element_by_name(
    "ion-input-0").send_keys(Keys.CONTROL + "a", "moma")
"""driver.find_element_by_name("ion-input-1").send_keys("12345momo")
driver.find_element_by_name("login").click()
WebDriverWait(driver, 20).until(
    EC.presence_of_element_located((By.TAG_NAME, "ion-tabs")))
lel = driver.find_element_by_tag_name("ion-title")
print(lel.get_attribute('innerHTML'))
"""
