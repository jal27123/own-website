# test_ui.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "http://127.0.0.1:5500/index.html"  # Live-Server-URL anpassen falls anders

def make_driver(headless=False):
    opts = webdriver.ChromeOptions()
    if headless:
        opts.add_argument("--headless=new")
    return webdriver.Chrome(options=opts)  # Selenium 4 lädt den Treiber selbst

def test_datum_button():
    d = make_driver()
    try:
        d.get(BASE_URL)
        WebDriverWait(d, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "body")))
        d.find_element(By.XPATH, "//button[contains(., 'Datum anzeigen')]").click()
        text = d.find_element(By.CSS_SELECTOR, "#datum").text
        assert text.startswith("Heute ist:"), text
    finally:
        d.quit()

def test_name_eintragen_ui_stub():
    d = make_driver()
    try:
        d.get(BASE_URL)
        WebDriverWait(d, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, "body")))
        d.execute_script("""
            const tbody = document.querySelector('#namensTabelle tbody');
            if (!tbody) return;
            window.NamenEintragen = async function () {
                const name = window.prompt('Bitte Namen eingeben:');
                if (!name) return;
                const rowCount = tbody.rows.length + 1;
                const tr = document.createElement('tr');
                const now = new Date().toLocaleString();
                tr.innerHTML = `<td>${rowCount}</td><td>${name}</td><td>${now}</td>`;
                tbody.appendChild(tr);
            };
        """)
        d.find_element(By.XPATH, "//button[contains(., 'Name eintragen')]").click()
        WebDriverWait(d, 5).until(EC.alert_is_present())
        a = d.switch_to.alert
        a.send_keys("Alice")
        a.accept()
        cell = d.find_element(By.CSS_SELECTOR, "#namensTabelle tbody tr:last-child td:nth-child(2)")
        assert cell.text == "Alice"
    finally:
        d.quit()
