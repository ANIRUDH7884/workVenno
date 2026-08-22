import puppeteer from "puppeteer";
import logger from "../utils/logger.js";
import userData from "../config/userData.js";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// 🔹 Click button by text
const clickButtonByText = async (page, text) => {
  const buttons = await page.$$("button");

  for (let btn of buttons) {
    const btnText = await btn.evaluate((el) => el.innerText.toLowerCase());

    if (btnText.includes(text.toLowerCase())) {
      await btn.click();
      logger.info(`Clicked button: ${text}`);
      return true;
    }
  }

  logger.warn(`Button not found: ${text}`);
  return false;
};

// 🔹 Fill input
const fillInput = async (page, keyword, value) => {
  const inputs = await page.$$("input");

  for (let input of inputs) {
    const attributes = await input.evaluate((el) => ({
      name: el.name?.toLowerCase(),
      id: el.id?.toLowerCase(),
      placeholder: el.placeholder?.toLowerCase(),
      aria: el.getAttribute("aria-label")?.toLowerCase(),
    }));

    if (
      attributes.name?.includes(keyword) ||
      attributes.id?.includes(keyword) ||
      attributes.placeholder?.includes(keyword) ||
      attributes.aria?.includes(keyword)
    ) {
      await input.type(value, { delay: 50 });
      logger.info(`Filled ${keyword}`);
      return true;
    }
  }

  logger.warn(`Input not found: ${keyword}`);
  return false;
};

export const openJobPage = async (url) => {
  logger.info(`Launching browser for: ${url}`);

  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "domcontentloaded" });
    logger.info("Page loaded");

    await delay(3000);

    await clickButtonByText(page, "apply");

    await delay(3000);

    await fillInput(page, "name", userData.name);
    await fillInput(page, "email", userData.email);

    try {
      const fileInput = await page.$('input[type="file"]');

      if (fileInput) {
        await fileInput.uploadFile(userData.resumePath);
        logger.info("Resume uploaded successfully");
      } else {
        logger.warn("Resume input not found");
      }
    } catch (err) {
      logger.error("Resume upload failed: " + err.message);
    }

    logger.info("Apply flow completed (manual submit needed)");
  } catch (err) {
    logger.error("Puppeteer error: " + err.message);
    throw err;
  }
};
