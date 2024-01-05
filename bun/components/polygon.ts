import puppeteer, { Browser, Page } from "puppeteer";

const polygonUrl = "https://polygon.com/gaming";

interface PolygonArticle {
  title: string;
  img_url: string;
  authors: string;
}

export const scrapPolygon = async ({
  page,
  browser,
}: {
  page: Page;
  browser: Browser;
}) => {
  try {
    await page.setViewport({ height: 4000, width: 320 });

    console.log(`Navigating to ${polygonUrl}. Starting scrap process...`);
    await page
      .goto(polygonUrl, { waitUntil: "networkidle0", timeout: 300 })
      .catch(async (err) => {
        console.log("Ha ocurrido un error.");
        await browser.close();
        throw new Error(err);
      })
      .then((res) => res);
    const articles = await page.evaluate(() => {
      const articles = document.querySelectorAll("div.c-entry-box--compact");

      return Array.from(articles).map((article) => {
        const title = article.querySelector("h2 > a")!.innerHTML;
        const authors = article!
          .querySelector("span.c-byline__item")!
          .textContent!.trim();
        const img_url = article!.querySelector("img")!.getAttribute("src")!;

        const polygonArticle: PolygonArticle = {
          title,
          authors,
          img_url,
        };

        return polygonArticle;
      });
    });

    console.log("Scrapping process done. Here are the results: \n", articles);

    await browser.close();
  } catch (err) {
    console.log("Ha ocurrido un error. Salteando el paso de Polygon.");
    console.log(err);
  }
};
