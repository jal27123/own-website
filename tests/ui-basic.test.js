import { Builder, By, until } from "selenium-webdriver";
import { expect } from "chai";

const BASE_URL = "http://127.0.0.1:5500/index.html";

describe("UI-Test: Datum-Button", function () {
  let driver;

  // Browser vor dem Test starten
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  // Browser nach allen Tests schließen
  after(async function () {
    if (driver) await driver.quit();
  });

  it("zeigt Datum in #datum an, wenn man klickt", async function () {
    // Seite öffnen
    await driver.get(BASE_URL);

    // Warten, bis Body da ist
    await driver.wait(until.elementLocated(By.css("body")), 5000);

    // Button finden und klicken
    const btn = await driver.findElement(By.xpath("//button[contains(., 'Datum anzeigen')]"));
    await btn.click();

    // Text in #datum abfragen
    const datum = await driver.findElement(By.css("#datum"));
    const text = await datum.getText();

    expect(text).to.match(/^Heute ist:/, "Der Text sollte mit 'Heute ist:' beginnen");
  });
});
