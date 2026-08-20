import puppeteer from "puppeteer";
import logger from "../utils/logger.js";
import userData from "../config/userData.js";

export const openJobPage = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForTimeout(3000);

  const inputs = await page.$$("input");

  for (let input of inputs) {
    const name = await input.evaluate(el => el.name);

    if (name?.toLowerCase().includes("name")) {
      await input.type(userData.name);
    }

    if (name?.toLowerCase().includes("email")) {
      await input.type(userData.email);
    }
  }

  logger.info("Autofill attempted");
};