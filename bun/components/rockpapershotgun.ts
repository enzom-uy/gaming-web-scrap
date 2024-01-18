/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { SCRAPPING_TIMEOUT } from '../config/variables'
import type { Article, ScrapperProps, SiteUrl } from '../types'

const rpsUrl: SiteUrl = 'https://rockpapershotgun.com/news'

export const scrapRockPaperShotgun = async ({
    page,
}: ScrapperProps): Promise<Article[] | undefined> => {
    console.log(`Navigating to ${rpsUrl}. Starting scrap process...`)

    try {
        await page.goto(rpsUrl, {
            waitUntil: 'networkidle0',
            timeout: SCRAPPING_TIMEOUT,
        })

        const articles: Article[] = await page.evaluate(() => {
            const articles = document.querySelectorAll('.summary_list li')

            return Array.from(articles).map((article) => {
                const title = article
                    .querySelector('p.title')!
                    .textContent!.trim()
                const url = article
                    .querySelector('p.title a')!
                    .getAttribute('href')!
                const imgUrl = article
                    .querySelector('.thumbnail img')!
                    .getAttribute('src')!
                const authors = article
                    .querySelector('.metadata .author')!
                    .textContent!.trim()!
                const datetime = article
                    .querySelector('p.published_at time')!
                    .getAttribute('datetime')!

                const rpsArticle: Article = {
                    title,
                    url,
                    imgUrl,
                    authors,
                    datetime,
                }

                return rpsArticle
            })
        })
        return articles
    } catch (error) {
        console.log(error)
        return
    }
}
