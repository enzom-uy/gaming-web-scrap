import puppeteer from "puppeteer";
import { initBrowser } from "./components/browser";
import { scrapPolygon } from "./components/polygon";

(async () => {
  const { browser, page } = await initBrowser();

  await scrapPolygon({ page, browser });

  console.log("Hola yo voy después de Polygon :).");
  setTimeout(() => {}, 5000);
})();
