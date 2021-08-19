import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys


class GpaTests(unittest.TestCase):
    @classmethod
    def setUpClass(self) -> None:
        self.driver = webdriver.Chrome(
            "C:\\Users\\CORE i7 ULTIMATE\\Downloads\\chromedriver_win32\\chromedriver.exe")
        self.driver.get("http://localhost:8100")

    """def test_01_should_not_log_in(self):
        driver = self.driver
        driver.find_element_by_name("ion-input-0").send_keys("momo")
        driver.find_element_by_name("ion-input-1").send_keys("momo")
        driver.find_element_by_name("login").click()
        toast = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.TAG_NAME, "ion-toast")))
        self.assertEqual('Usuario o contraseña incorrectas', toast.text)"""

    def test_02_should_log_in(self):
        driver = self.driver
        driver.find_element_by_name("ion-input-0").clear()
        driver.find_element_by_name("ion-input-0").send_keys("momo")
        driver.find_element_by_name("ion-input-1").clear()
        driver.find_element_by_name("ion-input-1").send_keys("12345momo")
        driver.find_element_by_name("login").click()
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.TAG_NAME, "ion-tabs")))
        title = driver.find_element_by_tag_name("ion-title")
        self.assertEqual('Inicio', title.text)

    def test_03_should_get_pets(self):
        driver = self.driver
        driver.find_element_by_id("tab-button-mascotas").click()
        # WebDriverWait(driver, 5).until(
        #   EC.presence_of_element_located((By.TAG_NAME, "ion-searchbar")))
        driver.implicitly_wait(5)
        container = driver.find_element_by_id("pets")
        cards = container.find_elements_by_tag_name("ion-card")
        pets = {}
        for card in cards:
            print(card.get_attribute("innerHTML"))
            name = card.find_element_by_tag_name("h2").text
            place = card.find_element_by_tag_name("h3").text
            pets_place = pets.get(place, [])
            pets_place.append(name)
            pets[place] = pets_place
        print(pets)
        self.assertEqual(True, True)

    @classmethod
    def tearDownClass(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.TestLoader.sortTestMethodsUsing = None
    unittest.main()
