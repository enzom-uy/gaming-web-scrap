/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Article, ScrapperProps } from '../types'

const rpsUrl = 'https://www.rockpapershotgun.com/news'

export const scrapRockPaperShotgun = async ({
    page,
    browser,
}: ScrapperProps): Promise<Article[] | undefined> => {
    console.log(`Navigating to ${rpsUrl}. Starting scrap process...`)

    try {
        await page.goto(rpsUrl, { waitUntil: 'networkidle0', timeout: 200 })

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

                const rpsArticle: Article = {
                    title,
                    url,
                    imgUrl,
                    authors,
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
