import logger from "../utils/logger.js";
import { openJobPage } from "../services/puppeteerService.js";

export const openJob = async (req, res) => {
  const { url } = req.body;

  logger.info(`Request received for: ${url}`);

  try {
    await openJobPage(url);
    res.json({ message: "Job opened successfully" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};