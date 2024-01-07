/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Article, ScrapperProps } from '../types'

const eurogamerUrl = 'https://www.eurogamer.net/archive/news'

export const scrapEurogamer = async ({
    page,
    browser,
}: ScrapperProps): Promise<Article[] | undefined> => {
    console.log(`Navigating to ${eurogamerUrl}. Starting scrap process...`)

    try {
        await page.goto(eurogamerUrl, { waitUntil: 'networkidle0' })

        const articles: Article[] = await page.evaluate(() => {
            const articles = document.querySelectorAll(
                'section.archive_list ul.summary_list li div.summary'
            )

            return Array.from(articles).map((article) => {
                const title = article
                    .querySelector('p.title')!
                    .textContent!.trim()

                const imgUrl = article
                    .querySelector('div.thumbnail img.thumbnail_image')!
                    .getAttribute('src')!
                    .replace('width=160', 'width=1920')
                    .replace('height=90', 'height=1080')

                const url = article
                    .querySelector('p.title a')!
                    .getAttribute('href')!

                return { title, imgUrl, url }
            })
        })
        return articles
    } catch (error) {
        console.log(error)
        return
    }
}
