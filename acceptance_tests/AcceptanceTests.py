from selenium.webdriver.common.touch_actions import TouchActions
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import unittest
import time

pets_array = []
nombre_mascota = ""


class GpaTests(unittest.TestCase):
    @classmethod
    def setUpClass(self) -> None:
        options = webdriver.ChromeOptions()
        options.add_experimental_option('w3c', False)
        self.driver = webdriver.Chrome(
            "C:\\Users\\CORE i7 ULTIMATE\\Downloads\\chromedriver_win32\\chromedriver.exe", options=options)
        self.driver.get("http://localhost:8100")

    def test_01_should_not_log_in(self):
        driver = self.driver
        driver.find_element_by_name("ion-input-0").send_keys("momo")
        driver.find_element_by_name("ion-input-1").send_keys("momo")
        driver.find_element_by_name("login").click()
        toast = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.TAG_NAME, "ion-toast")))
        self.assertEqual('Usuario o contraseña incorrectas', toast.text)
        time.sleep(0.5)

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
        driver_height = driver.get_window_size()["height"]
        driver.find_element_by_id("tab-button-mascotas").click()
        driver.implicitly_wait(5)
        pets = driver.find_element_by_id("pets")
        div_height = pets.size['height'] - driver_height + 300
        scroll = 0
        while scroll < div_height:
            cards = pets.find_elements_by_class_name("card-pet")
            card = cards[len(pets_array)]
            height_card = card.size['height'] + 10
            name = card.find_element_by_tag_name("h2").text
            place = card.find_element_by_tag_name("h3").text
            pets_array.append({'name': name, 'place': place})
            scroll = scroll + height_card
            TouchActions(driver).scroll_from_element(
                pets, 0, height_card).perform()
        while len(cards) > len(pets_array):
            card = cards[len(pets_array)]
            name = card.find_element_by_tag_name("h2").text
            place = card.find_element_by_tag_name("h3").text
            pets_array.append({'name': name, 'place': place})
        self.pets_array = pets_array
        self.assertEqual(len(pets_array), len(cards))
        time.sleep(0.5)
        TouchActions(driver).scroll_from_element(
            pets, 0, -div_height-200).perform()
        time.sleep(0.5)

    def test_04_should_filter_pets_from_CELEX(self):
        driver = self.driver
        chips = driver.find_elements_by_tag_name("ion-chip")
        for chip in chips:
            if chip.text == "CELEX":
                driver.execute_script("arguments[0].click();", chip)
                break
        cards = driver.find_elements_by_class_name("card-pet")
        tests_cards_filtered = []
        for card in cards:
            name = card.find_element_by_tag_name("h2").text
            tests_cards_filtered.append(name)
        actual_cards_filtered = filter(
            lambda x: x['place'] == 'CELEX', pets_array)
        actual_cards_filtered = list(
            map(lambda x: x['name'], actual_cards_filtered))
        self.assertEqual(actual_cards_filtered, tests_cards_filtered)
        time.sleep(1)

    def test_05_should_filter_pets_from_LABS_FCSH(self):
        driver = self.driver
        chips = driver.find_elements_by_tag_name("ion-chip")
        for chip in chips:
            if chip.text == "Laboratorios FCSH":
                driver.execute_script("arguments[0].click();", chip)
                break
        cards = driver.find_elements_by_class_name("card-pet")
        tests_cards_filtered = []
        for card in cards:
            name = card.find_element_by_tag_name("h2").text
            tests_cards_filtered.append(name)
        actual_cards_filtered = filter(
            lambda x: x['place'] == 'Laboratorios FCSH', pets_array)
        actual_cards_filtered = list(
            map(lambda x: x['name'], actual_cards_filtered))
        self.assertEqual(actual_cards_filtered, tests_cards_filtered)
        time.sleep(1)
        chips[0].click()

    def test_06_add_pett(self):
        driver = self.driver
        driver_height = driver.get_window_size()["height"]
        driver.find_element_by_id("add-pet").click()
        nombre = "prueba"
        content = driver.find_element_by_css_selector(
            'app-add-pet>ion-content')
        # nombre
        driver.find_element_by_css_selector(
            "ion-input[formControlName=nombre]>input").send_keys(nombre)
        # año
        driver.find_element_by_css_selector(
            "ion-input[formControlName=years]>input").send_keys("1")
        # sexo
        TouchActions(driver).scroll_from_element(
            content, 0, 100).perform()
        driver.find_element_by_css_selector(
            "ion-select[formControlName=sexo]").click()

        driver.find_element_by_id("alert-input-4-0").click()
        driver.find_elements_by_class_name(
            "alert-button-group>button")[1].click()

        # color
        TouchActions(driver).scroll_from_element(
            content, 0, 100).perform()
        driver.find_element_by_css_selector(
            "ion-select[formControlName=color]").click()
        driver.find_element_by_id("alert-input-5-1").click()
        driver.find_elements_by_css_selector(
            ".alert-button-group>button")[1].click()
        # ubicacion
        TouchActions(driver).scroll_from_element(
            content, 0, 100).perform()
        driver.find_element_by_css_selector(
            "ion-select[formControlName=ubicacion]").click()
        driver.find_element_by_id("alert-input-6-0").click()
        driver.find_elements_by_css_selector(
            ".alert-button-group>button")[1].click()
        # caracteristicas
        TouchActions(driver).scroll_from_element(
            content, 0, 100).perform()
        driver.find_element_by_css_selector(
            "ion-checkbox[formControlName=esterilizado]").click()
        TouchActions(driver).scroll_from_element(
            content, 0, 100).perform()
        driver.find_element_by_css_selector(
            "ion-checkbox[formControlName=caso_externo]").click()
        TouchActions(driver).scroll_from_element(
            content, 0, 400).perform()

        # Tipo animal
        TouchActions(driver).scroll_from_element(
            content, 0, 100).perform()
        driver.find_element_by_css_selector(
            "ion-select[formControlName=tipo]").click()
        driver.find_element_by_id("alert-input-7-1").click()
        driver.find_elements_by_css_selector(
            ".alert-button-group>button")[1].click()

        driver.find_element_by_css_selector(
            "ion-textarea[formControlName=descripcion]>div>textarea").send_keys("Esta es una prueba con selenium")
        driver.find_element_by_name(
            "submit-pet").click()
        time.sleep(1)
        pets = driver.find_element_by_id("pets")
        div_height = pets.size['height'] - driver_height + 400
        TouchActions(driver).scroll_from_element(
            pets, 0, div_height).perform()
        card_new_pet = pets.find_elements_by_class_name("card-pet")[-1]
        name = card_new_pet.find_element_by_tag_name("h2").text
        time.sleep(0.5)
        self.assertEqual(name, nombre)

    def test_07_see_specific_pet(self):
        driver = self.driver
        card = driver.find_elements_by_class_name("card-pet")[-1]
        actual_pet_name = card.find_element_by_tag_name("h2").text
        card.click()
        page = driver.find_element_by_tag_name("app-specific-pet")
        time.sleep(0.5)
        pet_name = page.find_element_by_tag_name("h2").text
        self.assertEqual(actual_pet_name, pet_name)

    def test_08_edit_pet(self):
        driver = self.driver
        page = driver.find_element_by_tag_name("app-specific-pet")
        former_pet_name = page.find_element_by_tag_name("h2").text
        div_info = page.find_element_by_tag_name("ion-content")
        div_info = page.find_element_by_class_name("content")
        TouchActions(driver).scroll_from_element(
            div_info, 0, 250).perform()
        time.sleep(0.5)
        page.find_element_by_tag_name("ion-button").click()
        time.sleep(0.5)
        page2 = driver.find_element_by_tag_name("app-add-pet")
        ion_content_2 = page2.find_element_by_tag_name("ion-content")
        ion_content_2.find_element_by_css_selector(
            "ion-input[formControlName=nombre]>input").send_keys(" edit")
        time.sleep(1)
        TouchActions(driver).scroll_from_element(
            ion_content_2, 0, 1000).perform()
        ion_content_2.find_elements_by_tag_name("ion-button")[1].click()
        time.sleep(2)
        div_info = page.find_element_by_class_name("content")
        TouchActions(driver).scroll_from_element(
            div_info, 0, -250).perform()
        new_pet_name = page.find_element_by_tag_name("h2").text
        self.assertEqual(new_pet_name, former_pet_name + " edit")

    def test_09_delete_pet(self):
        driver = self.driver
        driver_height = driver.get_window_size()["height"]
        page = driver.find_element_by_tag_name("app-specific-pet")
        name_deleted_page = page.find_element_by_tag_name("h2").text
        time.sleep(1)
        page.find_element_by_css_selector(
            "ion-fab-button").click()
        time.sleep(0.5)
        driver.find_elements_by_css_selector(
            ".alert-button-group>button")[1].click()
        pets = driver.find_element_by_id("pets")
        time.sleep(0.5)
        div_height = pets.size['height'] - driver_height + 400
        TouchActions(driver).scroll_from_element(
            pets, 0, -div_height).perform()
        card_last_pet = pets.find_elements_by_class_name("card-pet")[-1]
        name = card_last_pet.find_element_by_tag_name("h2").text
        self.assertNotEqual(name, name_deleted_page)

    def test_10_logout(self):
        driver = self.driver
        menu_button = driver.find_element_by_tag_name("ion-menu-button")
        driver.execute_script("arguments[0].click();", menu_button)
        time.sleep(0.5)
        driver.find_element_by_id("logout-button").click()
        login_page = driver.find_elements_by_tag_name("app-login")
        self.assertEqual(len(login_page), 1)
        time.sleep(2)

    @classmethod
    def tearDownClass(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.TestLoader.sortTestMethodsUsing = None
    unittest.main()
